"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@repo/ui";

import Icon from "./icon";

const NAVS = [
  {
    label: "Introduce",
    href: "/",
  },
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

const getCurrentPath = (pathname: string) => {
  return NAVS.find((nav) => nav.href === pathname)?.label;
};

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const currentPath = getCurrentPath(pathname);

  const onClickNav = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <section className="relative text-white">
      <button onClick={() => setIsOpen(!isOpen)} className="mx-auto flex items-center gap-2">
        <p>{currentPath}</p>
        <div className={cn("transition-transform", isOpen && "rotate-180")}>
          <Icon.arrowDown fill="#fff" size={16} />
        </div>
      </button>
      {isOpen && (
        <nav className="absolute left-1/2 top-full mt-2 flex w-max -translate-x-1/2 flex-col items-center gap-2">
          {NAVS.map(
            (nav) =>
              nav.href !== pathname && (
                <button key={nav.label} onClick={() => onClickNav(nav.href)} className="w-full">
                  {nav.label}
                </button>
              )
          )}
        </nav>
      )}
    </section>
  );
}
