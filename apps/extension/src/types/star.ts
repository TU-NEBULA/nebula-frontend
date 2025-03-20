export interface SummarizeStarProps {
  siteUrl: string;
  title: string;
  htmlFile: FormData;
}

export interface CompleteSummarizeStarProps {
  thumbnailUrl: string;
  summaryAI: string;
  userMemo: string;
  categoryName: string;
  keywordList: string[];
}
