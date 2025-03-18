import { useState } from "react";

import AISummary from "@/assets/ai-summary.svg?react";
import Logo from "@/assets/logo.svg?react";
import Loading from "@/components/loading";
import { useCompleteCreateStar } from "@/state/mutation/star";
import { BookmarkProps } from "@repo/types";
import { Card, cn, Keyword, RectangleButton, Textarea } from "@repo/ui";

import { Link, Navigate, useLocation } from "react-router-dom";
const DEFAULT_BOOKMARK = {
  categoryId: "",
  categories: [],
  summary: "",
  memo: "",
  keyword: "",
};

const CreateBookmark = () => {
  const { state } = useLocation();

  const [bookmark, setBookmark] = useState<BookmarkProps>(Object.assign(DEFAULT_BOOKMARK, state));

  const { mutateAsync } = useCompleteCreateStar();

  if (!state) {
    return <Navigate to="/bad-request" replace />;
  }

  const saveDisabled = bookmark.categoryId.trim() === "";

  const onSelectCategory = (categoryId: string) => {
    setBookmark((prev) => ({ ...prev, categoryId }));
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
      categories: [...prev.categories, { id: new Date().getTime().toString(), name: category }],
    }));
  };

  const onEnterKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { value } = e.target as HTMLInputElement;
      if (value && bookmark.keywords.length < 3 && !e.nativeEvent.isComposing) {
        setBookmark((prev) => ({
          ...prev,
          keyword: "",
          keywords: [...prev.keywords, value],
        }));
        e.currentTarget.blur();
      }
    }
  };

  const onClickSave = async () => {
    const categoryName = bookmark.categories.find(
      (category) => category.id === bookmark.categoryId
    )?.name;

    if (!categoryName) {
      return;
    }

    await mutateAsync({
      starId: state.starId,
      body: {
        thumbnailUrl: state.thumbnailUrl,
        summaryAI: bookmark.summary,
        userMemo: bookmark.memo,
        categoryName,
        keywordList: bookmark.keywords,
      },
    });
  };

  return (
    <Loading title="북마크를 저장하고 있어요!">
      <main className="h-full flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Logo />
            <p className="text-description font-bold">Nebula</p>
          </div>
          <button className="flex gap-1 items-center">
            <AISummary />
            <p className="text-text font-semibold">Nebula AI</p>
          </button>
        </header>
        <Card
          Thumbnail={
            bookmark.thumbnailUrl ? (
              <img
                src={bookmark.thumbnailUrl}
                alt={`${bookmark.siteUrl} thumbnail`}
                width={64}
                height={64}
                className="aspect-square object-cover max-w-16 max-h-16 rounded-md"
              />
            ) : null
          }
          Link={
            <Link target="_blank" to={bookmark.siteUrl} className="text-text text-gray6 truncate">
              {bookmark.siteUrl || "siteUrl"}
            </Link>
          }
          title={bookmark.title}
          categoryId={bookmark.categoryId}
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
          <RectangleButton className="border border-gray5 text-gray5 flex-1">취소</RectangleButton>
          <RectangleButton
            disabled={saveDisabled}
            className={cn("border text-white flex-1", !saveDisabled && "bg-black2")}
            onClick={onClickSave}
          >
            저장
          </RectangleButton>
        </section>
      </main>
    </Loading>
  );
};

export default CreateBookmark;
