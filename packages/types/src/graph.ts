export interface StarProps {
  starId: string;
  categoryName: string;
  title: string;
  siteUrl: string;
  thumbnailUrl: string;
  summaryAI: string;
  userMemo: string;
  views: number;
  keywordList: string[];
  faviconUrl: string | null;
}

export interface LinkProps {
  linkId: string;
  sharedKeywordNum: number;
  sharedKeywords: string[];
  similarity: number;
  linkedNodeIdList: string[];
}
