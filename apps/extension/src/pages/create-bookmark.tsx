import { useEffect, useMemo, useState } from "react";

import AISummary from "@/assets/ai-summary.svg?react";
import Logo from "@/assets/logo.svg?react";
import CardWrapper from "@/components/create-bookmark/card-wrapper";
import Loading from "@/components/loading";
import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { useCreateCategory } from "@/state/mutation/category";
import { useCompleteCreateStar, useUpdateStar } from "@/state/mutation/star";
import { useGetKeywords } from "@/state/query/keyword";
import { useGetStarById } from "@/state/query/star";
import { useStarStore } from "@/state/zustand/star";
import { CategoryListProps } from "@/types/category";
import { CompleteSummarizeStarProps } from "@/types/star";
import { cn, Graph2D } from "@repo/ui";
import { Keyword, RectangleButton, Spinner, Textarea } from "@repo/ui";

import { Navigate, useLocation, useSearchParams } from "react-router-dom";

const DEFAULT_BOOKMARK = {
  categoryName: "",
  categories: [],
  summaryAI: "",
  userMemo: "",
  keyword: "",
  keywords: [],
  title: "",
  siteUrl: "",
  thumbnailUrl: "",
  faviconUrl: "",
};

interface StateProps extends CompleteSummarizeStarProps {
  categories: CategoryListProps[];
  keyword: string;
  keywords: string[];
}

const CreateBookmark = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // 추후 AI 요약 기능 추가 시 tanstack query의 isPending 사용
  const [isAISummaryPending, setIsAISummaryPending] = useState(false);
  const [bookmark, setBookmark] = useState<StateProps>(Object.assign(DEFAULT_BOOKMARK, state));
  const stars = useStarStore((state) => state.stars);

  const { mutateAsync: mutateAsyncCompleteCreateStar } = useCompleteCreateStar();
  const { mutateAsync: mutateAsyncUpdateStar } = useUpdateStar();
  const { mutateAsync: mutateAsyncCategory, isPending: isPendingCategory } = useCreateCategory();

  const { data: keywords } = useGetKeywords();
  const { data: star, isLoading: isLoadingGetStar } = useGetStarById(id);

  const navigate = useReplaceNavigate();

  useEffect(() => {
    if (!isLoadingGetStar && star?.result) {
      setBookmark((prev) => ({
        ...prev,
        ...star.result,
        keywords: star.result?.keywordList || [],
      }));
    }
  }, [isLoadingGetStar, star]);

  const graphData = useMemo(() => {
    if (!stars?.starListDto || !stars?.linkListDto || !id) return { nodes: [], links: [] };

    // 현재 북마크와 연결된 링크만 필터링
    const relatedLinks = stars.linkListDto.filter((link) => link.linkedNodeIdList.includes(id));

    // 관련된 노드 ID 수집
    const relatedNodeIds = new Set<string>();
    relatedLinks.forEach((link) => {
      link.linkedNodeIdList.forEach((nodeId) => relatedNodeIds.add(nodeId));
    });

    // 관련된 노드만 필터링
    const relatedNodes = stars.starListDto.filter((star) => relatedNodeIds.has(star.starId));

    // 현재 북마크 정보 가져오기
    const currentStar = stars.starListDto.find((star) => star.starId === id);

    // 연관된 노드가 없으면 현재 북마크만 포함
    const nodes =
      relatedNodes.length > 0
        ? relatedNodes.map((star) => ({
            id: star.starId,
            name: star.title,
            val: Math.min(star.views, 10),
            url: star.siteUrl,
          }))
        : currentStar
          ? [
              {
                id: currentStar.starId,
                name: currentStar.title,
                val: 10,
                url: currentStar.siteUrl,
              },
            ]
          : [];

    return {
      nodes,
      links: relatedLinks.map((link) => ({
        source: link.linkedNodeIdList[0],
        target: link.linkedNodeIdList[1],
      })),
    };
  }, [stars, id]);

  /**
   * state가 있으면 북마크 생성한 경우
   * state가 없고 id가 있으면 북마크 수정하는 경우
   * 둘 다 없으면 잘못된 접근
   */
  if (!state && !id) {
    return <Navigate to="/bad-request" replace />;
  }

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
    const body = {
      ...bookmark,
      keywordList: bookmark.keywords,
    };

    if (id) {
      await mutateAsyncUpdateStar({ id, body });
    } else {
      await mutateAsyncCompleteCreateStar(body);
    }
  };

  const onClickCancel = () => {
    navigate("/bookmark");
  };

  if (isLoadingGetStar) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-10 text-notification">
        북마크를 가져오고 있어요!
        <Spinner />
      </div>
    );
  }

  return (
    <Loading title="북마크를 저장하고 있어요!">
      <main className="flex h-full flex-col gap-6">
        <header className="flex items-center gap-1">
          <Logo />
          <p className="text-description font-bold">Nebula</p>
        </header>
        {id && (
          <section>
            <Graph2D graphData={graphData} />
          </section>
        )}
        <CardWrapper
          thumbnailUrl={bookmark.thumbnailUrl}
          siteUrl={bookmark.siteUrl}
          title={bookmark.title}
          categoryName={bookmark.categoryName}
          onUpdateCategory={onUpdateCategory}
          onSelectCategory={onSelectCategory}
          onAddCategory={onAddCategory}
          isLoading={isPendingCategory}
        />
        <section>
          <Textarea
            id="summaryAI"
            label="요약"
            value={bookmark.summaryAI}
            onChange={onChangeText}
            placeholder="북마크에 대한 요약을 작성할 수 있어요."
            rightElement={
              <button
                className={cn("flex items-center gap-1", isAISummaryPending && "animate-pulse")}
                onClick={() => setIsAISummaryPending(true)}
              >
                <AISummary />
                <p className="text-xs font-semibold">
                  {isAISummaryPending ? "요약 중..." : "인공지능 요약"}
                </p>
              </button>
            }
          />
          <Textarea
            id="userMemo"
            label="메모"
            value={bookmark.userMemo}
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
        <section className="flex gap-3 pb-5">
          <RectangleButton variation="outline" onClick={onClickCancel}>
            취소
          </RectangleButton>
          <RectangleButton onClick={onClickSave}>저장</RectangleButton>
        </section>
      </main>
    </Loading>
  );
};

export default CreateBookmark;
