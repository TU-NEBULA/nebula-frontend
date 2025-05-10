import HistoryList from "@/components/history/history-list";
import SearchBar from "@/components/history/search-bar";

interface HistoryPageProps {
  searchParams: Promise<{ q: string | null; page: string }>;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const { q, page } = await searchParams;
  const query = q ?? "";
  const pageNumber = page ?? "0";

  return (
    <main className="max-w-with-header flex min-h-body flex-col gap-5 px-10">
      <SearchBar initialQuery={query} />
      <section className="flex flex-1 flex-col gap-2.5">
        <h1 className="text-3xl font-semibold text-white">방문 기록</h1>
        <HistoryList page={pageNumber} q={query} />
      </section>
    </main>
  );
}
