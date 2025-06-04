import { LinkProps, StarProps } from "./graph";

export interface AllStarDTO {
  type: string;
  totalStarCnt: number;
  totalLinkCnt: number;
  starListDto: StarProps[];
  linkListDto: LinkProps[];
}
