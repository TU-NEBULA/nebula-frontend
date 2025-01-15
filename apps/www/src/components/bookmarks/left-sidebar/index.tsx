"use client";

import { useState } from "react";
import Image from "next/image";

import doubleArrowLeft from "@/assets/icons/double-arrow-left.svg";
import folder from "@/assets/icons/folder.svg";
import logo from "@/assets/icons/logo.svg";
import search from "@/assets/icons/search.svg";

import Dropdown from "../dropdown";

const categories = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
  {
    id: 3,
    name: "Category 3",
  },
];

const keywords = [
  {
    id: 1,
    name: "Keyword 1",
  },
  {
    id: 2,
    name: "Keyword 2",
  },
  {
    id: 3,
    name: "Keyword 3",
  },
];

const LeftSidebar = () => {
  const [sidebar, setSidebar] = useState({
    open: false,
    categoryOpen: false,
    keywordOpen: false,
  });

  const onToggleSidebar = () => {
    setSidebar((prev) => ({
      open: !prev.open,
      categoryOpen: false,
      keywordOpen: false,
    }));
  };

  const onToggleDropdown = (type: string) => {
    if (sidebar.open) {
      return setSidebar((prev) => ({
        ...prev,
        [`${type}Open`]: !prev[`${type}Open`],
      }));
    }
    return onToggleSidebar();
  };

  const onClickItem = (id: number) => {
    // do something
  };

  const sidebarStyle = {
    width: sidebar.open ? "16rem" : "4.5rem",
  };

  return (
    <div
      className="bg-white p-5 flex flex-col gap-5 transition-all overflow-hidden"
      style={sidebarStyle}
    >
      <div className="flex justify-between overflow-hidden">
        <button onClick={onToggleSidebar} className="flex items-center gap-2 text-label">
          <div className="bg-black rounded-lg w-8 h-8 flex justify-center items-center">
            <Image src={logo} alt="nebula 로고" width={24} height={12} />
          </div>
          <p>Nebula</p>
        </button>
        <button onClick={onToggleSidebar}>
          <Image src={doubleArrowLeft} alt="왼쪽 사이드 바 닫기" width={24} height={12} />
        </button>
      </div>
      <Dropdown
        open={sidebar.categoryOpen}
        title="Category"
        icon={folder}
        items={categories}
        onClick={() => onToggleDropdown("category")}
        onClickItem={onClickItem}
      />
      <Dropdown
        open={sidebar.keywordOpen}
        title="Keyword"
        icon={search}
        items={keywords}
        onClick={() => onToggleDropdown("keyword")}
        onClickItem={onClickItem}
      />
    </div>
  );
};

export default LeftSidebar;
