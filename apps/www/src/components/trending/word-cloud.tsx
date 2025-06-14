"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import WordCloud2, { ListEntry } from "wordcloud";

export interface Keyword {
  word: string;
  rank: number;
  usedCnt: number;
}

const colors = ["#6366F1", "#818CF8", "#A5B4FC", "#fff"];

export default function WordCloud({ keywords }: { keywords: Keyword[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(
    Math.min(Math.max(360, window ? window.innerWidth - 620 : 360), 700)
  );

  const height = 420;

  useEffect(() => {
    const cloudKeywords = keywords.map((k) => [k.word, k.usedCnt]) as ListEntry[];
    WordCloud2(canvasRef.current!, {
      list: cloudKeywords,
      shape: "circle",
      minRotation: 0,
      maxRotation: 0,
      shrinkToFit: true,
      minSize: 14,
      backgroundColor: "#00000000",
      weightFactor: (size) => size * 10,
      color: (word) => {
        const idx = cloudKeywords.findIndex((k) => k[0] === word);
        const colorIdx = idx > 3 ? 3 : idx;
        return colors[colorIdx];
      },
      click: (item) => {
        window.open(`https://www.google.com/search?q=${item[0]}`, "_blank");
      },
    });

    const onResize = () => {
      setWidth(Math.min(Math.max(360, window.innerWidth - 620), 700));
    };
    window.addEventListener("resize", onResize);
    return () => {
      WordCloud2.stop();
      window.removeEventListener("resize", onResize);
    };
  }, [keywords, width]);

  return (
    <div className="semi-md:flex-row semi-md:items-start semi-md:px-20 mx-auto flex h-full w-full flex-col items-center justify-between gap-5 rounded-lg bg-gray7/30 px-5 py-16">
      <div style={{ width, height }}>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      <ul className="flex w-full max-w-80 flex-col flex-wrap text-white md:ml-8">
        {keywords.slice(0, 10).map((k) => (
          <li
            key={`trend-keyword-${k.word}`}
            className="flex items-center justify-between gap-5 border-b border-b-gray7 px-4 py-2.5"
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
