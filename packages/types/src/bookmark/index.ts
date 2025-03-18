export interface BookmarkProps {
  categoryId: string;
  categories: { id: string; name: string }[];
  summary: string;
  memo: string;
  keyword?: string;
  title: string;
  thumbnailUrl: string;
  keywords: string[];
  siteUrl: string;
}
