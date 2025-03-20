export interface Coords {
  x?: number;
  y?: number;
  z?: number;
}

interface CommonProps {
  width?: number;
  opacity?: number;
  index?: number;
}

export interface LinkObject extends CommonProps {
  source?: string;
  target?: string;
}
export interface NodeObject extends Coords, CommonProps {
  id?: string;
  vx?: number;
  vy?: number;
  vz?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  lookAt?: Coords;
  name?: string;
  size?: number;
  importance?: boolean;
  icon?: string | null;
  color?: string;
}

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
  similarity: number;
  linkedNodeIdList: string[];
}

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
}

export interface LinkProps {
  linkId: string;
  sharedKeywordNum: number;
  similarity: number;
  linkedNodeIdList: string[];
}

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
}

export interface LinkProps {
  linkId: string;
  sharedKeywordNum: number;
  similarity: number;
  linkedNodeIdList: string[];
}
