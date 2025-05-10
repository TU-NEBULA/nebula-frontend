"use client";

import { memo } from "react";
import Image from "next/image";

import arrowRight from "@/assets/icons/arrow-right.svg";
import { CategoryProps } from "@/types/category";
import { cn } from "@repo/ui";

interface DropdownProps {
  open: boolean;
  title: string;
  icon: React.ReactNode;
  items: CategoryProps[] | string[];
  onClick: () => void;
  onClickItem: (id: string) => void;
}

const Dropdown = ({ open, title, icon, items, onClick, onClickItem }: DropdownProps) => {
  return (
    <section className="flex flex-col overflow-hidden">
      <button
        className="flex w-full items-center justify-between overflow-hidden px-1"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          <p className="">{title}</p>
        </div>
        <Image
          src={arrowRight}
          alt="카테고리 메뉴 열기 버튼"
          width={24}
          height={24}
          className={cn("transition-transform", open && "rotate-90")}
          draggable={false}
        />
      </button>
      {open && items.length > 0 && (
        <ul className="my-2 ml-8 border-l border-gray2 text-text">
          {items.map((item) => (
            <li key={typeof item === "string" ? item : item.id}>
              <button
                onClick={() => onClickItem(typeof item === "string" ? item : item.id)}
                className="w-full px-3 py-2 text-start transition-colors hover:bg-gray1 active:bg-opacity-80"
              >
                {typeof item === "string" ? item : item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default memo(Dropdown, (prev, next) => {
  return (
    prev.open === next.open &&
    prev.title === next.title &&
    prev.icon === next.icon &&
    prev.items === next.items
  );
});
