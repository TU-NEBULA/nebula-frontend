import { Star2DNodeProps } from "@/types/star";

export interface DeleteStarDTO {
  starId: string;
  deleteStatus: string;
}

export interface Star2DDTO {
  category: string;
  keywordList: Star2DNodeProps[];
}
