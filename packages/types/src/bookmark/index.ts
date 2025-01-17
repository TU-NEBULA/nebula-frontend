export interface BookmarkProps {
  category: string;
  categories: { id: number; name: string }[];
  summary: string;
  memo: string;
  keyword: string;
  title: string;
  thubmnail: string;
  keywords: string[];
  url: string;
}
