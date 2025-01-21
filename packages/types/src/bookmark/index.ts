export interface BookmarkProps {
  categoryId: number;
  categories: { id: number; name: string }[];
  summary: string;
  memo: string;
  keyword?: string;
  title: string;
  thubmnail: string;
  keywords: string[];
  url: string;
}
