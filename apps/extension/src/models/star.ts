export interface SummarizeStarDTO {
  starId: string;
  title: string;
  siteUrl: string;
  thumbnailUrl: string;
  keywords: string[];
}

export interface CompleteSummarizeStarDTO {
  starId: string;
  title: string;
  categoryName: string;
  keywordList: string[];
}
