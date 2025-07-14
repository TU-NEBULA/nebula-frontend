import BookmarksPage from "@/app/page/bookmarks";
import { GRAPH_THEME } from "@/constants/bookmark";

interface BookmarksProps {
  searchParams: Promise<{
    theme: GRAPH_THEME;
  }>;
}

export default async function Bookmarks({ searchParams }: BookmarksProps) {
  const { theme } = await searchParams;

  return <BookmarksPage theme={theme} />;
}
