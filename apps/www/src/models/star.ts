export interface AllStarDTO {
  type: string;
  totalStarCnt: number;
  totalLinkCnt: number;
  starListDto: [
    {
      starId: string;
      categoryName: string;
      title: string;
      siteUrl: string;
      thumbnailUrl: string;
      summaryAI: string;
      userMemo: string;
      views: number;
      keywordList: string[];
    },
  ];
  linkListDto: [
    {
      linkId: string;
      sharedKeywordNum: number;
      similarity: number;
      linkedNodeIdList: string[];
    },
  ];
}
