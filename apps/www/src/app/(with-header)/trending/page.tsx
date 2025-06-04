import WordCloud, { Keyword } from "@/components/trending/word-cloud";
import { getTrendKeywords } from "@/service/keyword";

export default async function TrendPage() {
  const { result } = await getTrendKeywords();

  const keywords: Keyword[] = result?.mostUsedKeywordList
    .sort((a, b) => b.usedCnt - a.usedCnt)
    .map((item, idx) => ({
      word: item.keywordName,
      rank: idx + 1,
      usedCnt: item.usedCnt,
    }));

  return (
    <main className="max-w-with-header flex min-h-body flex-1 flex-col gap-2.5 px-10">
      <h1 className="text-3xl font-semibold text-white">트렌드 키워드</h1>
      <h2 className="mb-10 text-gray7">많이 검색되는 키워드를 살펴보세요.</h2>
      <WordCloud keywords={keywords || []} />
    </main>
  );
}
