export interface SummarizeStarProps {
  siteUrl: string;
  title: string;
  htmlFile: FormData;
}

export interface CompleteSummarizeStarProps {
  title: string;
  siteUrl: string;
  faviconUrl: string;
  thumbnailUrl: string;
  summaryAI: string;
  userMemo: string;
  categoryName: string;
  keywordList: string[];
  s3key: string;
}
