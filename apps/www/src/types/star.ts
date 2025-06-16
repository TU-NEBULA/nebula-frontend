import { StarProps } from "@repo/types";

export interface Star2DLeafProps extends Omit<StarProps, "keywordList" | "categoryName"> {}

export interface Star2DNodeProps {
  keyword: string;
  starList: Star2DLeafProps[];
}
