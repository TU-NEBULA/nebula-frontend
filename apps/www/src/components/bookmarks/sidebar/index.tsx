"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import doubleArrowLeft from "@/assets/icons/double-arrow-left.svg";
import logo from "@/assets/icons/logo.svg";
import logout from "@/assets/icons/logout.svg";
import Icon from "@/components/common/icon";
import { GRAPH_THEME, GRAPH_TYPE, LINK_TYPE } from "@/constants/bookmark";
import { useGetKeywordCategory } from "@/lib/tanstack/query/sidebar";
import { useGetUserInfo } from "@/lib/tanstack/query/user";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { removeAuth } from "@/utils/cookies";

import Dropdown from "./dropdown";

const filters = [LINK_TYPE.SIMILARITY, LINK_TYPE.KEYWORD];
const themes = [GRAPH_THEME.PLANET, GRAPH_THEME.GRAPH];
const types = [GRAPH_TYPE.COLOR, GRAPH_TYPE.LOGO];

const Sidebar = () => {
  const [sidebar, setSidebar] = useState({
    open: false,
    categoryOpen: false,
    keywordOpen: false,
    profileOpen: false,
  });

  const { data } = useGetUserInfo();

  const router = useRouter();

  const bookmarkStore = useBookmarkStore();

  const [{ data: category }, { data: keyword }] = useGetKeywordCategory();

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
    bookmarkStore.setSelectedFilter(bookmarkStore.selectedFilter === filter ? "" : filter);
  };

  const onSelectTheme = (theme: GRAPH_THEME) => {
    bookmarkStore.setSelectedTheme(theme);
  };

  const onSelectType = (type: GRAPH_TYPE) => {
    bookmarkStore.setSelectedType(type);
  };

  const sidebarStyle = {
    width: sidebar.open ? "16rem" : "4.5rem",
  };

  const onLogout = async () => {
    await removeAuth();
    alert("로그아웃 되었습니다.");
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      <section
        className="fixed left-0 z-10 flex h-screen flex-col justify-between bg-white p-5 transition-all"
        style={sidebarStyle}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between overflow-hidden">
            <button onClick={onToggleSidebar} className="flex items-center gap-2">
              <div className="bg-black3 flex h-8 w-8 items-center justify-center rounded-lg">
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
          <Suspense fallback={<div>Loading...</div>}>
            <Dropdown
              open={sidebar.categoryOpen}
              title="Category"
              icon={<Icon.folder />}
              items={category?.result?.categoryList || []}
              onClick={() => onToggleDropdown("category")}
              onClickItem={onClickItem}
            />
            <Dropdown
              open={sidebar.keywordOpen}
              title="Keyword"
              icon={<Icon.search />}
              items={keyword?.result || []}
              onClick={() => onToggleDropdown("keyword")}
              onClickItem={onClickItem}
            />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="relative flex items-center gap-2">
            <button onClick={onToggleProfile} className="min-h-8 min-w-8 rounded-lg bg-gray5" />
            <p className="truncate">{data?.result?.email || "example@example.com"}</p>
            {sidebar.profileOpen && (
              <button
                onClick={onLogout}
                className="absolute -right-6 bottom-0 flex min-w-32 translate-x-full items-center gap-2 rounded-lg bg-white px-6 py-2 text-text"
              >
                <Image src={logout} alt="로그아웃 버튼" width={24} height={24} draggable={false} />
                <p>Logout</p>
              </button>
            )}
          </div>
        </Suspense>
      </section>
      <section
        className="fixed z-10 flex h-max transition-all"
        style={{ left: sidebar.open ? "16rem" : "4.5rem" }}
      >
        <fieldset className="m-3 flex h-max flex-col gap-3 p-2 text-white">
          <legend className="">Filter</legend>
          {filters.map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="filter"
                value={filter}
                checked={bookmarkStore.selectedFilter === filter}
                onChange={() => onSelectFilter(filter)}
              />
              <span className="text-text">{filter}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="m-3 flex h-max flex-col gap-3 p-2 text-white">
          <legend className="">Theme</legend>
          {themes.map((theme) => (
            <label key={theme} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="theme"
                value={theme}
                checked={bookmarkStore.selectedTheme === theme}
                onChange={() => onSelectTheme(theme)}
              />
              <span className="text-text">{theme}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="m-3 flex h-max flex-col gap-3 p-2 text-white">
          <legend className="">Type</legend>
          {types.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="type"
                value={type}
                checked={bookmarkStore.selectedType === type}
                onChange={() => onSelectType(type)}
              />
              <span className="text-text">{type}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="m-3 flex h-max flex-col gap-3 p-2 text-white">
          <legend className="">Color</legend>
          <input
            type="color"
            value={bookmarkStore.selectedColor}
            onChange={(e) => bookmarkStore.setSelectedColor(e.target.value)}
            className="h-8 w-full cursor-pointer rounded"
          />
        </fieldset>
      </section>
    </>
  );
};

export default Sidebar;
