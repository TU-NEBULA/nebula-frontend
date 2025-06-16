export interface Star2DLeafProps {
  faviconUrl: string;
  lastAccessedAt: string;
  siteUrl: string;
  starId: string;
  summaryAI: string;
  thumbnailUrl: string;
  title: string;
  userMemo: string;
  views: number;
}

export interface Star2DNodeProps {
  keyword: string;
  starList: Star2DLeafProps[];
}
