import { LinkProps, StarProps } from "@/types/graph";

export interface AllStarDTO {
  type: string;
  totalStarCnt: number;
  totalLinkCnt: number;
  starListDto: StarProps[];
  linkListDto: LinkProps[];
}

export interface DeleteStarDTO {
  starId: string;
  deleteStatus: string;
}
