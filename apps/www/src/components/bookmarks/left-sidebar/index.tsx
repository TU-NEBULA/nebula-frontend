"use client";

import { useState } from "react";
import Image from "next/image";

import doubleArrowLeft from "@/assets/icons/double-arrow-left.svg";
import folder from "@/assets/icons/folder.svg";
import logo from "@/assets/icons/logo.svg";
import logout from "@/assets/icons/logout.svg";
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
    profileOpen: false,
  });

  const onToggleSidebar = () => {
    setSidebar((prev) => ({
      open: !prev.open,
      categoryOpen: false,
      keywordOpen: false,
      profileOpen: !prev.open && prev.profileOpen,
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

  const onToggleProfile = () => {
    setSidebar((prev) => ({
      ...prev,
      profileOpen: !prev.profileOpen,
    }));
  };

  const onClickItem = (id: number) => {
    // do something
  };

  const sidebarStyle = {
    width: sidebar.open ? "16rem" : "4.5rem",
  };

  return (
    <aside
      id="sidebar"
      className="bg-white p-5 transition-all flex flex-col justify-between"
      style={sidebarStyle}
    >
      <div className="flex flex-col gap-5">
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
      <div className="relative flex items-center gap-2">
        <button onClick={onToggleProfile} className="min-w-8 min-h-8 bg-grey5 rounded-lg" />
        <button className="truncate text-description text-start">
          <p className="truncate font-medium">gwangsoo</p>
          <p className="truncate">frontend.lany@gmail.com</p>
        </button>
        {sidebar.profileOpen && (
          <button className="bg-white text-body absolute py-2 px-6 rounded-lg -right-6 translate-x-full bottom-0 flex items-center gap-2 min-w-32">
            <Image src={logout} alt="로그아웃 버튼" width={24} height={24} />
            <p>Logout</p>
          </button>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
