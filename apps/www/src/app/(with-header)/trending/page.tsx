import TrendPage from "@/app/page/trending";
import PageSpinner from "@/components/common/page-spinner";
import { getTrendKeywords } from "@/service/keyword";

export default function Trend() {
  const trendingKeywords = getTrendKeywords();

  return (
    <PageSpinner>
      <TrendPage trendingKeywords={trendingKeywords} />
    </PageSpinner>
  );
}
