"use client";

import { Usable, use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import doubleArrowLeft from "@/assets/icons/double-arrow-left.svg";
import logo from "@/assets/icons/logo.svg";
import logout from "@/assets/icons/logout.svg";
import Icon from "@/components/common/icon";
import { GRAPH_THEME, GRAPH_TYPE, LINK_TYPE } from "@/constants/bookmark";
import { useGetKeywordCategory } from "@/lib/tanstack/query/sidebar";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { BaseResponseDTO } from "@/models";
import { UserInfoDTO } from "@/models/user";

import Dropdown from "./dropdown";

const filters = [LINK_TYPE.SIMILARITY, LINK_TYPE.KEYWORD];
const themes = [GRAPH_THEME.PLANET, GRAPH_THEME.GRAPH];
const types = [GRAPH_TYPE.COLOR, GRAPH_TYPE.LOGO];

interface SidebarProps {
  userInfo: Usable<BaseResponseDTO<UserInfoDTO>>;
}

const Sidebar = ({ userInfo }: SidebarProps) => {
  const [sidebar, setSidebar] = useState({
    open: false,
    categoryOpen: false,
    keywordOpen: false,
    profileOpen: false,
  });
  const data = use(userInfo);

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
    const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    if (res.ok) {
      alert("로그아웃 되었습니다.");
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <>
      <section
        className="bg-white p-5 transition-all flex flex-col justify-between h-screen fixed left-0 z-10"
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
        </div>
        <div className="relative flex items-center gap-2">
          <button onClick={onToggleProfile} className="min-w-8 min-h-8 bg-gray5 rounded-lg" />
          <p className="truncate">{data.result.email}</p>
          {sidebar.profileOpen && (
            <button
              onClick={onLogout}
              className="bg-white text-text absolute py-2 px-6 rounded-lg -right-6 translate-x-full bottom-0 flex items-center gap-2 min-w-32"
            >
              <Image src={logout} alt="로그아웃 버튼" width={24} height={24} draggable={false} />
              <p>Logout</p>
            </button>
          )}
        </div>
      </section>
      <section
        className="flex h-max transition-all fixed z-10"
        style={{ left: sidebar.open ? "16rem" : "4.5rem" }}
      >
        <fieldset className="text-white flex flex-col gap-3 m-3 h-max p-2">
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
        <fieldset className="text-white flex flex-col gap-3 m-3 h-max p-2">
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
        <fieldset className="text-white flex flex-col gap-3 m-3 h-max p-2">
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
        <fieldset className="text-white flex flex-col gap-3 m-3 h-max p-2">
          <legend className="">Color</legend>
          <input
            type="color"
            value={bookmarkStore.selectedColor}
            onChange={(e) => bookmarkStore.setSelectedColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </fieldset>
      </section>
    </>
  );
};

export default Sidebar;
