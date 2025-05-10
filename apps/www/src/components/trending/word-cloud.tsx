"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export interface Keyword {
  word: string;
  rank: number;
  usedCnt: number;
}

const minFont = 16;
const maxFont = 48;
const colors = ["#fff", "#A5B4FC", "#818CF8", "#6366F1", "#64748B"];

function getFontSize(rank: number) {
  return Math.max(maxFont - (rank - 1) * 6, minFont);
}
function getColor(rank: number) {
  return colors[rank - 1] || colors[colors.length - 1];
}

interface PlacedKeyword {
  word: string;
  rank: number;
  usedCnt: number;
  left: number;
  top: number;
  fontSize: number;
  color: string;
  width: number;
  height: number;
}

function measureText(
  text: string,
  fontSize: number,
  fontWeight = 700
): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 100, height: fontSize };
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return { width: 100, height: fontSize };
  ctx.font = `${fontWeight} ${fontSize}px Pretendard, sans-serif`;
  const metrics = ctx.measureText(text);
  return { width: metrics.width, height: fontSize };
}

function isOverlap(a: PlacedKeyword, b: PlacedKeyword) {
  return !(
    a.left + a.width < b.left ||
    a.left > b.left + b.width ||
    a.top + a.height < b.top ||
    a.top > b.top + b.height
  );
}

function placeKeywords(keywords: Keyword[], width: number, height: number): PlacedKeyword[] {
  const placed: PlacedKeyword[] = [];
  const maxTries = 100;
  for (const k of keywords) {
    const fontSize = getFontSize(k.rank);
    const color = getColor(k.rank);
    const { width: textWidth, height: textHeight } = measureText(k.word, fontSize);
    let left = 0,
      top = 0,
      tries = 0;
    let overlap = false;
    do {
      const maxLeft = Math.max(width - textWidth, 0);
      const maxTop = Math.max(height - textHeight, 0);
      left = Math.random() * maxLeft;
      top = Math.random() * maxTop;
      overlap = placed.some((p) =>
        isOverlap(
          {
            ...p,
            left,
            top,
            width: textWidth,
            height: textHeight,
            word: k.word,
            rank: k.rank,
            fontSize,
            color,
            usedCnt: k.usedCnt,
          } as PlacedKeyword,
          p
        )
      );
      tries++;
    } while (overlap && tries < maxTries);
    placed.push({
      word: k.word,
      rank: k.rank,
      usedCnt: k.usedCnt,
      left,
      top,
      fontSize,
      color,
      width: textWidth,
      height: textHeight,
    });
  }
  return placed;
}

export default function WordCloud({ keywords }: { keywords: Keyword[] }) {
  const [isClient, setIsClient] = useState(false);
  const [size, setSize] = useState({ width: 900, height: 420 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      const observer = new window.ResizeObserver(handleResize);
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const placedKeywords = useMemo(() => {
    if (!isClient) return [];
    return placeKeywords(keywords, size.width, size.height);
  }, [isClient, keywords, size]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-full w-full flex-row-reverse rounded-lg bg-gray7/30 px-20 py-16"
    >
      {placedKeywords.map((k) => (
        <Link
          key={k.word}
          target="_blank"
          href={`https://www.google.com/search?q=${k.word}`}
          className="absolute flex cursor-pointer select-none items-center gap-1 whitespace-nowrap font-bold transition-transform duration-150"
          style={{
            left: k.left,
            top: k.top,
            fontSize: k.fontSize,
            color: k.color,
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {k.word}
        </Link>
      ))}
      <ul className="flex flex-col flex-wrap text-white">
        {placedKeywords.slice(0, 10).map((k) => (
          <li
            key={`trend-keyword-${k.word}`}
            className="flex w-80 items-center justify-between gap-5 border-b border-b-gray7 px-4 py-2.5"
          >
            <Link
              target="_blank"
              href={`https://www.google.com/search?q=${k.word}`}
              className="flex gap-4 overflow-hidden text-sm"
            >
              <p className="text-sm">{k.rank}</p>
              <p className="truncate text-sm">{k.word}</p>
            </Link>
            <p className="text-xs">{k.usedCnt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
