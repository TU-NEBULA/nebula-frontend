"use client";

import { useState } from "react";
import Image from "next/image";

import doubleArrowLeft from "@/assets/icons/double-arrow-left.svg";
import folder from "@/assets/icons/folder.svg";
import logo from "@/assets/icons/logo.svg";
import logout from "@/assets/icons/logout.svg";
import search from "@/assets/icons/search.svg";
import { LINK_TYPE } from "@/constants/bookmark";
import { useGetKeywordCategory } from "@/lib/tanstack/query/sidebar";
import { useBookmarkStore } from "@/lib/zustand/bookmark";

import Dropdown from "./dropdown";

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

const filters = [LINK_TYPE.CATEGORY, LINK_TYPE.KEYWORD];

const Sidebar = () => {
  const { selectedFilter, setSelectedFilter } = useBookmarkStore();
  const [{ data: category }, { data: keyword }] = useGetKeywordCategory();
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
    setSidebar((prev) => {
      if (!prev.open) {
        return {
          ...prev,
          open: true,
          [`${type}Open`]: true,
        };
      }
      return {
        ...prev,
        [`${type}Open`]: !prev[`${type}Open`],
      };
    });
  };

  const onToggleProfile = () => {
    setSidebar((prev) => ({
      ...prev,
      profileOpen: !prev.profileOpen,
    }));
  };

  const onClickItem = (id: string) => {
    // do something
  };

  const onSelectFilter = (filter: LINK_TYPE) => {
    setSelectedFilter(selectedFilter === filter ? "" : filter);
  };

  const sidebarStyle = {
    width: sidebar.open ? "16rem" : "4.5rem",
  };

  return (
    <aside id="sidebar" className="flex fixed left-0 h-full z-10">
      <section
        className="bg-white p-5 transition-all flex flex-col justify-between"
        style={sidebarStyle}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between overflow-hidden">
            <button onClick={onToggleSidebar} className="flex items-center gap-2 ">
              <div className="bg-black2 rounded-lg w-8 h-8 flex justify-center items-center">
                <Image src={logo} alt="nebula 로고" width={24} height={12} draggable={false} />
              </div>
              <p>Nebula</p>
            </button>
            <button onClick={onToggleSidebar}>
              <Image
                src={doubleArrowLeft}
                alt="왼쪽 사이드 바 닫기"
                width={24}
                height={12}
                draggable={false}
              />
            </button>
          </div>
          <Dropdown
            open={sidebar.categoryOpen}
            title="Category"
            icon={folder}
            items={category?.result?.categoryList || []}
            onClick={() => onToggleDropdown("category")}
            onClickItem={onClickItem}
          />
          <Dropdown
            open={sidebar.keywordOpen}
            title="Keyword"
            icon={search}
            items={keyword?.result || []}
            onClick={() => onToggleDropdown("keyword")}
            onClickItem={onClickItem}
          />
        </div>
        <div className="relative flex items-center gap-2">
          <button onClick={onToggleProfile} className="min-w-8 min-h-8 bg-gray5 rounded-lg" />
          <p className="truncate">frontend.lany@gmail.com</p>
          {sidebar.profileOpen && (
            <button className="bg-white text-text absolute py-2 px-6 rounded-lg -right-6 translate-x-full bottom-0 flex items-center gap-2 min-w-32">
              <Image src={logout} alt="로그아웃 버튼" width={24} height={24} draggable={false} />
              <p>Logout</p>
            </button>
          )}
        </div>
      </section>
      <fieldset className="text-white flex flex-col gap-3 m-3 h-max p-2">
        <legend className="">Filter</legend>
        {filters.map((filter) => (
          <label key={filter} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="filter"
              value={filter}
              checked={selectedFilter === filter}
              onChange={() => onSelectFilter(filter)}
            />
            <span className="text-text">{filter}</span>
          </label>
        ))}
      </fieldset>
    </aside>
  );
};

export default Sidebar;
