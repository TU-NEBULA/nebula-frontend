"use client";

import { memo } from "react";
import Image from "next/image";

import arrowRight from "@/assets/icons/arrow-right.svg";
import { cn } from "@repo/ui";

interface DropdownProps {
  open: boolean;
  title: string;
  icon: string;
  items: { id: number; name: string }[];
  onClick: () => void;
  onClickItem: (id: number) => void;
}

const Dropdown = memo(({ open, title, icon, items, onClick, onClickItem }: DropdownProps) => {
  return (
    <section className="flex flex-col overflow-hidden">
      <button
        className="flex items-center justify-between w-full overflow-hidden px-1"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <Image src={icon} alt="카테고리 아이콘" width={24} height={24} className="w-6 h-6" />
          <p className="text-label">{title}</p>
        </div>
        <Image
          src={arrowRight}
          alt="카테고리 메뉴 열기 버튼"
          width={24}
          height={24}
          className={cn("transition-transform", open && "rotate-90")}
        />
      </button>
      {open && (
        <ul className="ml-8 my-2 border-l border-grey2 text-body">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onClickItem(item.id)}
                className="py-2 px-3 w-full text-start transition-colors hover:bg-grey1 active:bg-opacity-80"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});

export default memo(Dropdown, (prev, next) => {
  return (
    prev.open === next.open &&
    prev.title === next.title &&
    prev.icon === next.icon &&
    prev.items === next.items
  );
});
