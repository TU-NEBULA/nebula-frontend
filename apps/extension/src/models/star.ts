export interface SummarizeStarDTO {
  title: string;
  siteUrl: string;
  thumbnailUrl: string;
  faviconUrl: string;
  keywords: string[];
  s3key: string;
}

export interface CompleteSummarizeStarDTO {
  starId: string;
  title: string;
  categoryName: string;
  keywordList: string[];
}
