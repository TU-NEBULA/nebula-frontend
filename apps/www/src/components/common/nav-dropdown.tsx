"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { GRAPH_THEME } from "@/constants/bookmark";
import { cn } from "@repo/ui";

import Icon from "./icon";

const NAVS = [
  {
    label: "View History",
    href: "/history",
  },
  {
    label: "View Bookmark",
    href: "/bookmarks",
  },
  {
    label: "Keyword Trend",
    href: "/trending",
  },
];

const BOOKMARK_THEMES = [
  {
    label: "Planet",
    href: `/bookmarks?theme=${GRAPH_THEME.PLANET}`,
  },
  {
    label: "Graph",
    href: `/bookmarks?theme=${GRAPH_THEME.GRAPH}`,
  },
  {
    label: "Tree",
    href: `/bookmarks?theme=${GRAPH_THEME.TREE}`,
  },
];

const getCurrentPath = (pathname: string) => {
  return NAVS.find((nav) => nav.href === pathname)?.label || "Introduce";
};

export default function NavDropdown() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBookmarkThemeOpen, setIsBookmarkThemeOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const currentPath = getCurrentPath(pathname);

  const onClickNav = (href: string) => {
    router.push(href);
    setIsNavOpen(false);
  };

  return (
    <section className="relative text-white">
      <button onClick={() => setIsNavOpen(!isNavOpen)} className="mx-auto flex items-center gap-2">
        <p>{currentPath}</p>
        <div className={cn("transition-transform", isNavOpen && "rotate-180")}>
          <Icon.arrowDown fill="#fff" size={16} />
        </div>
      </button>
      {isNavOpen && (
        <nav className="absolute left-1/2 top-full mt-2 flex w-max -translate-x-1/2 flex-col items-center gap-2">
          {NAVS.map(
            (nav) =>
              nav.href !== pathname && (
                <button key={nav.label} onClick={() => onClickNav(nav.href)} className="w-full">
                  {nav.label}
                </button>
              )
          )}
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsBookmarkThemeOpen(!isBookmarkThemeOpen)}
            >
              <p>Bookmark View</p>
              <div className={cn("transition-transform", isBookmarkThemeOpen && "rotate-180")}>
                <Icon.arrowDown fill="#fff" size={16} />
              </div>
            </button>
            {isBookmarkThemeOpen && (
              <div className="absolute left-1/2 top-full mt-2 flex -translate-x-1/2 flex-col gap-2">
                {BOOKMARK_THEMES.map((theme) => (
                  <button key={theme.label} onClick={() => onClickNav(theme.href)}>
                    {theme.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
    </section>
  );
}
