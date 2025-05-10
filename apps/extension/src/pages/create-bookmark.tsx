import { useState } from "react";

import AISummary from "@/assets/ai-summary.svg?react";
import Logo from "@/assets/logo.svg?react";
import CardWrapper from "@/components/create-bookmark/card-wrapper";
import Loading from "@/components/loading";
import { useCreateCategory } from "@/state/mutation/category";
import { useCompleteCreateStar } from "@/state/mutation/star";
import { useGetKeywords } from "@/state/query/keyword";
import { CategoryListProps } from "@/types/category";
import { BookmarkProps } from "@repo/types";
import { Keyword, RectangleButton, Textarea } from "@repo/ui";

import { Navigate, useLocation } from "react-router-dom";

const DEFAULT_BOOKMARK = {
  categoryName: "",
  categories: [],
  summary: "",
  memo: "",
  keyword: "",
};

const CreateBookmark = () => {
  const { state } = useLocation();

  const [bookmark, setBookmark] = useState<BookmarkProps>(Object.assign(DEFAULT_BOOKMARK, state));

  const { mutateAsync } = useCompleteCreateStar();
  const { mutateAsync: mutateAsyncCategory, isPending } = useCreateCategory();

  const { data: keywords } = useGetKeywords();

  if (!state) {
    return <Navigate to="/bad-request" replace />;
  }

  const saveDisabled = bookmark.categoryName.trim() === "";

  const onSelectCategory = (category: string) => {
    setBookmark((prev) => ({ ...prev, categoryName: category }));
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
    await mutateAsyncCategory(category);
  };

  const onUpdateKeyword = (keyword: string) => {
    setBookmark((prev) => ({
      ...prev,
      keyword: "",
      keywords: [...prev.keywords, keyword],
    }));
  };

  const onEnterKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      const { value } = e.target as HTMLInputElement;
      if (value && bookmark.keywords.length < 3) {
        onUpdateKeyword(value);
      }
    }
  };

  const onUpdateCategory = (categories: CategoryListProps[]) => {
    setBookmark((prev) => ({ ...prev, categories }));
  };

  const onClickSave = async () => {
    const categoryName = bookmark.categories.find(
      (category) => category.name === bookmark.categoryName
    )?.name;

    if (!categoryName) {
      return;
    }
    const body = {
      thumbnailUrl: state.thumbnailUrl,
      summaryAI: bookmark.summary,
      userMemo: bookmark.memo,
      categoryName,
      keywordList: bookmark.keywords,
    };

    await mutateAsync({
      starId: state.starId,
      body,
    });
  };

  return (
    <Loading title="북마크를 저장하고 있어요!">
      <main className="flex h-full flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Logo />
            <p className="text-description font-bold">Nebula</p>
          </div>
          <button className="flex items-center gap-1">
            <AISummary />
            <p className="text-xs font-semibold">Nebula AI</p>
          </button>
        </header>
        <CardWrapper
          thumbnailUrl={bookmark.thumbnailUrl}
          siteUrl={bookmark.siteUrl}
          title={bookmark.title}
          categoryName={bookmark.categoryName}
          onUpdateCategory={onUpdateCategory}
          onSelectCategory={onSelectCategory}
          onAddCategory={onAddCategory}
          isLoading={isPending}
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
            keywordList={keywords?.result || []}
            onChange={onChangeText}
            onDeleteKeyword={onDeleteKeyword}
            onKeyDown={onEnterKeyword}
            onUpdateKeyword={onUpdateKeyword}
          />
        </section>
        <section className="flex gap-3">
          <RectangleButton variation="outline">취소</RectangleButton>
          <RectangleButton disabled={saveDisabled} onClick={onClickSave}>
            저장
          </RectangleButton>
        </section>
      </main>
    </Loading>
  );
};

export default CreateBookmark;
