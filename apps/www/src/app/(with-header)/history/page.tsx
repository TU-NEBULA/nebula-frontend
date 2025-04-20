import Link from "next/link";

import SearchBar from "@/components/history/search-bar";
import { formatDate, formatTime } from "@/utils/date";

interface HistoryPageProps {
  searchParams: Promise<{ q: string | null }>;
}

const dummies = [
  {
    id: "342",
    lastVisitTime: 1745136598684.041,
    title: "YouTube Music",
    typedCount: 0,
    url: "https://music.youtube.com/",
    visitCount: 135,
  },
  {
    id: "7358",
    lastVisitTime: 1744629785287.49,
    title: "지친 하루 - YouTube Music",
    typedCount: 0,
    url: "https://music.youtube.com/watch?v=BDUI2rV5bv8&list=RDAMVMIims1T8SgXI",
    visitCount: 1,
  },
  {
    id: "7354",
    lastVisitTime: 1744629292239.357,
    title: "빈차 (Home Is Far Away) ft. OH HYUK (feat. OH HYUK) - YouTube Music",
    typedCount: 0,
    url: "https://music.youtube.com/watch?v=6U2h_iccLXE&list=RDAMVMIims1T8SgXI",
    visitCount: 1,
  },
];

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  const filteredDummies = dummies.filter((dummy) => {
    const title = dummy.title.toLowerCase().trim();
    const searchQuery = query.toLowerCase().trim();
    return searchQuery.split(" ").every((word) => title.includes(word));
  });

  return (
    <main className="min-h-body px-10 max-w-with-header space-y-5">
      <SearchBar />
      <section className="space-y-2.5">
        <h1 className="text-white text-3xl font-semibold">방문 기록</h1>
        <div className="bg-white p-5 rounded-lg">
          <div className="space-y-8">
            <p className="font-semibold">오늘 - {formatDate(1745136598684.041)}</p>
            <div className="space-y-5">
              {filteredDummies.map((dummy) => (
                <div key={dummy.id} className="flex gap-2 font-medium text-xs">
                  <div className="flex-1 text-gray8">{formatTime(dummy.lastVisitTime)}</div>
                  <div className="flex-[2] truncate">{dummy.title}</div>
                  <Link
                    target="_blank"
                    href={dummy.url}
                    className="flex-[2] truncate text-gray-800"
                  >
                    {dummy.url}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
