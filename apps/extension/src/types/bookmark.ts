export interface SummarizeBookmarkProps {
  url: string;
  html_content: string;
}

export interface BookmarkState {
  state: {
    title: string;
    thubmnail: string;
    keywords: string[];
    url: string;
  };
}
