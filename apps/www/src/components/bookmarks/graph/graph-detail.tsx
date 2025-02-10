import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import doubleArrowRight from "@/assets/icons/double-arrow-right.svg";
import grab from "@/assets/icons/grab.svg";
import pencil from "@/assets/icons/pencil.svg";
import trash from "@/assets/icons/trash.svg";
import { BookmarkProps } from "@repo/types";
import { Card, cn, Keyword, Modal, RectangleButton, Textarea } from "@repo/ui";

interface GraphDetailProps {
  open: boolean;
  id: number;
  onClose: () => void;
}

const DEFAULT_BOOKMARK = {
  categoryId: -1,
  categories: [],
  summary: "",
  memo: "",
  title: "",
  url: "",
  thubmnail: "",
  keywords: [],
};

// id를 이용해서 데이터 가져오는 로직 추후 추가
const GraphDetail = ({ open, id, onClose }: GraphDetailProps) => {
  const [bookmark, setBookmark] = useState<BookmarkProps>(DEFAULT_BOOKMARK);
  const [width, setWidth] = useState(360);
  const [saveWidth, setSaveWidth] = useState(-1);
  const [holdX, setHoldX] = useState(-1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [edit, setEdit] = useState({ activated: false, summary: "", memo: "", keyword: "" });

  const onSelectCategory = (categoryId: number) => {
    setBookmark((prev) => ({ ...prev, categoryId }));
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setEdit((prev) => ({ ...prev, [id]: value }));
  };

  const onDeleteKeyword = (selectedKeyword: string) => {
    if (edit.activated) {
      setBookmark((prev) => ({
        ...prev,
        keywords: prev.keywords.filter((keyword) => keyword !== selectedKeyword),
      }));
    }
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
    if (e.key === "Enter" && edit.activated) {
      const { value } = e.target as HTMLInputElement;
      if (value && bookmark.keywords.length < 3 && !e.nativeEvent.isComposing) {
        setBookmark((prev) => ({
          ...prev,
          keywords: [...prev.keywords, value],
        }));
        setEdit((prev) => ({ ...prev, keyword: "" }));
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

  const onDeleteBookmark = () => {
    // API 호출
    onCloseDeleteModal();
  };

  const onCancelEdit = () => {
    setEdit({
      activated: false,
      summary: "",
      memo: "",
      keyword: "",
    });
  };

  const onEdit = () => {
    if (edit.activated) {
      // 저장 API 호출
      return onCancelEdit();
    }
    setEdit({
      activated: true,
      summary: bookmark.summary,
      memo: bookmark.memo,
      keyword: "",
    });
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

  return (
    <div
      className={cn(
        "bg-white flex fixed right-0 z-10 min-w-sidebar max-w-sidebar h-full transition-transform translate-x-full overflow-y-scroll",
        open && "translate-x-0"
      )}
      style={{ width }}
    >
      <button className="cursor-col-resize" onMouseDown={onMouseDown}>
        <Image src={grab} alt="상세창 크기 조절 버튼" width={24} height={24} draggable={false} />
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
          </div>
        </div>
        <Card
          Thumbnail={
            bookmark.thubmnail ? (
              <Image
                src={bookmark.thubmnail}
                alt={`${bookmark.url} thumbnail`}
                width={96}
                height={96}
                className="aspect-square object-cover max-w-24 max-h-24 rounded-md"
                draggable={false}
              />
            ) : null
          }
          Link={
            <Link target="_blank" href={bookmark.url} className="text-text text-gray3 truncate">
              {bookmark.url || "url"}
            </Link>
          }
          title={bookmark.title}
          categoryId={bookmark.categoryId}
          categories={bookmark.categories}
          onSelectCategory={onSelectCategory}
          onAddCategory={onAddCategory}
        />
        <section className="space-y-1">
          <Textarea
            id="summary"
            label="요약"
            value={edit.activated ? edit.summary : bookmark.summary}
            onChange={onChangeText}
            placeholder="북마크에 대한 요약을 작성할 수 있어요."
            readOnly={!edit.activated}
          />
          <Textarea
            id="memo"
            label="메모"
            value={edit.activated ? edit.memo : bookmark.memo}
            onChange={onChangeText}
            placeholder="북마크에 대한 메모를 작성할 수 있어요."
            readOnly={!edit.activated}
          />
          <Keyword
            id="keyword"
            keywords={bookmark.keywords}
            value={edit.keyword}
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
            <RectangleButton className="flex-1 border border-gray5" onClick={onCloseDeleteModal}>
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
    </div>
  );
};

export default GraphDetail;
