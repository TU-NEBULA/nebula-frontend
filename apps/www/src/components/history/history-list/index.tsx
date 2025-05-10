"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Icon from "@/components/common/icon";
import { useGetHistories } from "@/lib/tanstack/query/history";
import type { HistoryDTO } from "@/models/history";
import { formatDate, formatTime } from "@/utils/date";
import { cn, Spinner } from "@repo/ui";

interface HistoryListProps {
  q: string;
  page: string;
}

export default function HistoryList({ q, page }: HistoryListProps) {
  const router = useRouter();

  const { data, isLoading } = useGetHistories(page);

  const grouped = useMemo(
    () =>
      Object.groupBy((data?.result?.content ?? []) as HistoryDTO[], (item) => {
        const date = new Date(item.lastVisitTime);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }),
    [data?.result?.content]
  );

  const maxPage = data?.result.maxPage ?? 1;
  const currentPage = parseInt(page, 10) || 0;
  const pageGroup = Math.floor(currentPage / 10);
  const startPage = pageGroup * 10;
  const endPage = Math.min(startPage + 9, maxPage);
  const nextDisabled = endPage === maxPage;
  const prevDisabled = startPage === 0;

  const pageNumbers = useMemo(() => {
    const arr: number[] = [];
    for (let i = startPage; i <= endPage; i++) arr.push(i);
    return arr;
  }, [startPage, endPage]);

  const url = useCallback(
    (page: number) => {
      const searchParams = new URLSearchParams();
      searchParams.set("page", page.toString());
      if (q) searchParams.set("q", q);
      return `?${searchParams.toString()}`;
    },
    [q]
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner theme="dark" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {Object.entries(grouped).map(([date, items]) => (
          <div className="space-y-8 rounded-lg bg-white p-5" key={date}>
            <p className="font-semibold">{formatDate(date)}</p>
            <div className="space-y-5">
              {(items as HistoryDTO[]).map((item) => (
                <div key={item.id} className="flex gap-2 text-xs font-medium">
                  <div className="flex-1 text-gray8">{formatTime(item.lastVisitTime)}</div>
                  <div className="flex-[2] truncate">{item.title}</div>
                  <Link target="_blank" href={item.url} className="flex-[2] truncate text-gray-800">
                    {item.url}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-6 flex justify-center gap-2">
        <button
          onClick={() => {
            if (!prevDisabled) {
              router.push(`?page=${startPage - 1}${q ? `&q=${q}` : ""}`);
            }
          }}
          disabled={prevDisabled}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-gray-400",
            prevDisabled
              ? "cursor-not-allowed bg-gray-300 opacity-50"
              : "bg-gray-200 text-gray-700 opacity-100 hover:bg-gray-300"
          )}
        >
          <Icon.arrowLeft />
        </button>
        {pageNumbers.map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <Link
              key={pageNum}
              href={url(pageNum)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300",
                isActive && "bg-blue1 hover:bg-blue3 active:bg-blue2 font-bold text-white"
              )}
            >
              {pageNum + 1}
            </Link>
          );
        })}
        <button
          onClick={() => {
            if (!nextDisabled) {
              router.push(`?page=${endPage + 1}${q ? `&q=${q}` : ""}`);
            }
          }}
          disabled={nextDisabled}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-gray-400",
            nextDisabled
              ? "cursor-not-allowed bg-gray-300 opacity-50"
              : "bg-gray-200 text-gray-700 opacity-100 hover:bg-gray-300"
          )}
        >
          <Icon.arrowRight />
        </button>
      </div>
    </>
  );
}
