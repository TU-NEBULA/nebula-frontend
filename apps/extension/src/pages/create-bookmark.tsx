import { useState } from "react";

import AISummary from "@/assets/ai-summary.svg?react";
import Logo from "@/assets/logo.svg?react";
import { BookmarkState } from "@/types/bookmark";
import { Card, Keyword, RectangleButton, Textarea } from "@repo/ui";

import { Link, Navigate, useLocation } from "react-router-dom";

const CreateBookmark = () => {
  const { state }: BookmarkState = useLocation();

  const [bookmark, setBookmark] = useState({
    ...state,
    category: "",
    categories: [
      { id: 1, name: "개발" },
      { id: 2, name: "농구" },
      { id: 3, name: "클라이밍" },
      { id: 4, name: "커피" },
    ],
    summary: "",
    memo: "",
    keyword: "",
  });

  if (!state) {
    return <Navigate to="/bad-request" replace />;
  }

  const onSelectCategory = (category: string) => {
    setBookmark((prev) => ({ ...prev, category }));
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setBookmark((prev) => ({ ...prev, [id]: value }));
  };

  const onDeleteKeyword = (selectedKeyword: string) => {
    setBookmark((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((keyword) => keyword !== selectedKeyword),
    }));
  };

  const onAddCategory = async (category: string) => {
    // API 호출
    setBookmark((prev) => ({
      ...prev,
      category,
      categories: [...prev.categories, { id: new Date().getTime(), name: category }],
    }));
  };

  const onEnterKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { value } = e.target as HTMLInputElement;
      if (value && bookmark.keywords.length < 3) {
        setBookmark((prev) => ({
          ...prev,
          keyword: "",
          keywords: [...prev.keywords, value],
        }));
        e.currentTarget.blur();
      }
    }
  };

  return (
    <main className="h-full flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <Logo />
          <p className="body font-bold">Nebula</p>
        </div>
        <button className="flex gap-1 items-center">
          <AISummary />
          <p className="text-body font-semibold">Nebula AI</p>
        </button>
      </header>
      <Card
        Thumbnail={
          <img
            src={bookmark.thubmnail}
            alt={`${bookmark.url} thumbnail`}
            width={96}
            height={96}
            className="aspect-square object-cover max-w-24 max-h-24 rounded-md"
          />
        }
        Link={
          <Link target="_blank" to={bookmark.url} className="text-body text-grey3 truncate">
            {bookmark.url || "url"}
          </Link>
        }
        title={bookmark.title}
        category={bookmark.category}
        categories={bookmark.categories}
        onSelectCategory={onSelectCategory}
        onAddCategory={onAddCategory}
      />
      <section>
        <Textarea
          id="summary"
          label="요약"
          value={bookmark.summary}
          onChange={onChangeText}
          placeholder="북마크에 대한 요약을 작성할 수 있어요."
        />
        <Textarea
          id="memo"
          label="메모"
          value={bookmark.memo}
          onChange={onChangeText}
          placeholder="북마크에 대한 메모를 작성할 수 있어요."
        />
        <Keyword
          id="keyword"
          keywords={bookmark.keywords}
          value={bookmark.keyword}
          onChange={onChangeText}
          onDeleteKeyword={onDeleteKeyword}
          onKeyDown={onEnterKeyword}
        />
      </section>
      <section className="flex gap-3">
        <RectangleButton className="border border-grey5 text-grey5 flex-1">취소</RectangleButton>
        <RectangleButton className="border bg-black text-white flex-1">저장</RectangleButton>
      </section>
    </main>
  );
};

export default CreateBookmark;
