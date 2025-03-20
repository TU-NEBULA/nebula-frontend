import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import doubleArrowRight from "@/assets/icons/double-arrow-right.svg";
import grab from "@/assets/icons/grab.svg";
import pencil from "@/assets/icons/pencil.svg";
import trash from "@/assets/icons/trash.svg";
import { useCreateCategory } from "@/lib/tanstack/mutation/category";
import { useDeleteStar, useUpdateStar } from "@/lib/tanstack/mutation/star";
import { useGetGraphDetail } from "@/lib/tanstack/query/graph";
import { Card, cn, Keyword, Modal, RectangleButton, Spinner, Textarea } from "@repo/ui";

interface GraphDetailProps {
  open: boolean;
  id: string;
  onClose: () => void;
}

const GraphDetail = ({ open, id, onClose }: GraphDetailProps) => {
  const [width, setWidth] = useState(360);
  const [saveWidth, setSaveWidth] = useState(-1);
  const [holdX, setHoldX] = useState(-1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [{ data: starData, isLoading: starLoading }, { data: categoryData }] =
    useGetGraphDetail(id);

  const [edit, setEdit] = useState({ activated: false, keyword: "", ...starData?.result });

  const { mutateAsync: createCategory, isPending: createCategoryLoading } = useCreateCategory();
  const { mutateAsync: updateStar, isPending: updateStarLoading } = useUpdateStar();
  const {
    mutateAsync: deleteStar,
    isPending: deleteStarLoading,
    isSuccess: deleteStarSuccess,
  } = useDeleteStar();

  const onSelectCategory = (categoryName: string) => {
    setEdit((prev) => ({ ...prev, categoryName }));
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setEdit((prev) => ({ ...prev, [id]: value }));
  };

  const onDeleteKeyword = (selectedKeyword: string) => {
    if (edit.activated) {
      setEdit((prev) => ({
        ...prev,
        keywordList: prev.keywordList?.filter((keyword) => keyword !== selectedKeyword) || [],
      }));
    }
  };

  const onAddCategory = async (category: string) => {
    const categoryExist = (categoryData?.result?.categoryList || []).find(
      (c) => c.name === category.trim()
    );
    if (categoryExist) {
      return alert("이미 존재하는 카테고리입니다.");
    }
    await createCategory(category);
  };

  const onEnterKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && edit.activated) {
      const { value } = e.target as HTMLInputElement;
      if (
        value &&
        (starData?.result?.keywordList.length as number) < 3 &&
        !e.nativeEvent.isComposing
      ) {
        setEdit((prev) => ({
          ...prev,
          keyword: "",
          keywordList: [...(prev.keywordList || []), value],
        }));
        e.currentTarget.blur();
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSaveWidth(width);
    setHoldX(e.pageX);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (holdX < 0) return;

    const changeWidth = saveWidth + (holdX - e.pageX);
    setWidth(Math.min(Math.max(360, changeWidth), 500));
  };

  const onMouseUp = () => {
    setSaveWidth(-1);
    setHoldX(-1);
  };

  const onOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const onDeleteBookmark = async () => {
    await deleteStar(id);
    onCloseDeleteModal();
  };

  const onCancelEdit = () => {
    setEdit({
      activated: false,
      keyword: "",
      ...starData?.result,
    });
  };

  const onEdit = async () => {
    if (edit.activated) {
      const isContentUnchanged =
        edit.title === starData?.result?.title &&
        edit.categoryName === starData?.result?.categoryName &&
        edit.summaryAI === starData?.result?.summaryAI &&
        edit.userMemo === starData?.result?.userMemo &&
        JSON.stringify(edit.keywordList) === JSON.stringify(starData?.result?.keywordList);

      if (isContentUnchanged) {
        onCancelEdit();
        return;
      }
    }
    if (edit.activated) {
      try {
        await updateStar({
          id,
          content: {
            title: edit.title || "",
            categoryName: edit.categoryName || "",
            summaryAI: edit.summaryAI || "",
            userMemo: edit.userMemo || "",
            keywordList: edit.keywordList || [],
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        onCancelEdit();
      }
    } else {
      setEdit((prev) => ({ ...prev, activated: true }));
    }
  };

  const onCloseDetail = () => {
    onClose();
    onCancelEdit();
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  useEffect(() => {
    if (starData?.isSuccess) {
      setEdit((prev) => ({ ...prev, ...starData.result }));
    }
  }, [starData]);

  useEffect(() => {
    if (deleteStarLoading && deleteStarSuccess) {
      alert("북마크가 삭제되었습니다.");
      onClose();
    }
  }, [deleteStarLoading, deleteStarSuccess]);

  return (
    <div
      className={cn(
        "bg-white flex fixed right-0 z-10 min-w-sidebar max-w-sidebar h-full transition-transform translate-x-full overflow-y-scroll",
        open && "translate-x-0"
      )}
      style={{ width }}
    >
      {starLoading || deleteStarLoading ? (
        <div className="flex justify-center items-center  w-full h-full">
          <Spinner />
        </div>
      ) : starData?.isSuccess ? (
        <>
          <button className="cursor-col-resize" onMouseDown={onMouseDown}>
            <Image
              src={grab}
              alt="상세창 크기 조절 버튼"
              width={24}
              height={24}
              draggable={false}
            />
          </button>
          <div className="flex flex-col p-3 gap-6 w-full">
            <div className="flex justify-between items-center">
              <button onClick={onCloseDetail} className="w-max active:opacity-80">
                <Image
                  src={doubleArrowRight}
                  alt="상세창 닫기 버튼"
                  width={24}
                  height={24}
                  draggable={false}
                />
              </button>
              <div className="flex items-center gap-2">
                {updateStarLoading ? (
                  <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                ) : (
                  <>
                    {edit.activated && (
                      <button onClick={onCancelEdit}>
                        <Image src={close} alt="요약, 메모 수정 취소 버튼" width={24} height={24} />
                      </button>
                    )}
                    <button onClick={onEdit}>
                      <Image
                        src={edit.activated ? check : pencil}
                        alt="요약, 메모 수정 버튼"
                        width={24}
                        height={24}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
            <Card
              Thumbnail={
                starData?.result?.thumbnailUrl ? (
                  <Image
                    src={starData?.result.thumbnailUrl}
                    alt={`${starData?.result.siteUrl} thumbnail`}
                    width={96}
                    height={96}
                    className="aspect-square object-cover max-w-24 max-h-24 rounded-md"
                    draggable={false}
                  />
                ) : null
              }
              Link={
                <Link
                  target="_blank"
                  href={starData?.result.siteUrl || "https://www.nebula-ai.kr"}
                  className="text-text text-gray7 truncate"
                >
                  {starData?.result.siteUrl || "siteUrl"}
                </Link>
              }
              title={edit.activated ? edit.title || "" : starData?.result?.title}
              categoryName={
                edit.activated ? (edit.categoryName as string) : starData?.result?.categoryName
              }
              categories={
                (categoryData?.result?.categoryList || []).map(
                  (category) => category.name
                ) as string[]
              }
              onSelectCategory={onSelectCategory}
              onAddCategory={onAddCategory}
              isLoading={createCategoryLoading || updateStarLoading}
              editEnabled={edit.activated}
            />
            <section className="space-y-1">
              <Textarea
                id="summaryAI"
                label="요약"
                value={edit.activated ? edit.summaryAI : starData?.result?.summaryAI}
                onChange={onChangeText}
                placeholder="북마크에 대한 요약을 작성할 수 있어요."
                readOnly={!edit.activated}
              />
              <Textarea
                id="userMemo"
                label="메모"
                value={edit.activated ? edit.userMemo : starData?.result?.userMemo}
                onChange={onChangeText}
                placeholder="북마크에 대한 메모를 작성할 수 있어요."
                readOnly={!edit.activated}
              />
              <Keyword
                id="keyword"
                keywords={edit.activated ? edit.keywordList || [] : starData?.result?.keywordList}
                value={edit.activated ? edit.keyword : ""}
                readOnly={!edit.activated}
                onChange={onChangeText}
                onDeleteKeyword={onDeleteKeyword}
                onKeyDown={onEnterKeyword}
              />
            </section>
            <button
              className="bg-highlight w-max h-max p-2.5 rounded-full absolute bottom-3 right-3"
              onClick={onOpenDeleteModal}
            >
              <Image src={trash} alt="북마크 삭제하기" width={20} height={20} draggable={false} />
            </button>
          </div>
          {deleteModalOpen && (
            <Modal
              title="북마크 삭제"
              subTitle={`삭제 후에는 복구가 불가능합니다.\n정말 삭제하시겠습니까?`}
              callback={onCloseDeleteModal}
            >
              <div className="flex w-full gap-3">
                <RectangleButton
                  className="flex-1 border border-gray5"
                  onClick={onCloseDeleteModal}
                >
                  취소
                </RectangleButton>
                <RectangleButton
                  className="flex-1 bg-highlight text-white transition-colors"
                  onClick={onDeleteBookmark}
                >
                  삭제
                </RectangleButton>
              </div>
            </Modal>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full gap-4 px-2">
          <p>북마크를 찾을 수 없습니다.</p>
          <RectangleButton
            onClick={onCloseDetail}
            className="w-full text-white transition-colors bg-black2"
          >
            상세 창 닫기
          </RectangleButton>
        </div>
      )}
    </div>
  );
};

export default GraphDetail;
