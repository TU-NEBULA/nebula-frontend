import { useState } from "react";

import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from "../../utils/cn";
import RectangleButton from "../button/rectangle-button";
import Modal from "../modal";

interface CategoryProps {
  id: number;
  name: string;
}

interface CardProps {
  Thumbnail: React.ReactNode;
  Link: React.ReactNode;
  title: string;
  categoryId: number;
  categories: CategoryProps[];
  onSelectCategory: (categoryId: number) => void;
  onAddCategory: (category: string) => Promise<void>;
}

const Card = ({
  Thumbnail,
  Link,
  title,
  categoryId,
  categories,
  onSelectCategory,
  onAddCategory,
}: CardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    category: "",
  });

  const addDisabled = modal.category.length === 0;
  const categoryName = categories.find((category) => category.id === categoryId)?.name;

  const [dropdownRef] = useOutsideClick<HTMLDivElement>(
    () => !modal.open && setIsDropdownOpen(false)
  );

  const onToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModal({ open: true, category: "" });
  };

  const onCloseModal = () => {
    setModal({ open: false, category: "" });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModal({ ...modal, category: e.target.value });
  };

  const onCreateCategory = async () => {
    try {
      // API 호출
      await onAddCategory(modal.category);
    } catch (error) {
      console.error(error);
    } finally {
      setModal({ open: false, category: "" });
    }
  };

  const onEnterKeyword = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await onCreateCategory();
    }
  };

  return (
    <>
      <section className="flex items-center gap-3">
        {Thumbnail ? Thumbnail : <div className="min-w-24 aspect-square bg-gray5 rounded-md" />}
        <div className="truncate flex flex-col h-full justify-between">
          <p className="">{title || "제목"}</p>
          {Link}
          <div ref={dropdownRef}>
            <button
              onClick={onToggle}
              className="flex justify-between items-center py-0.5 px-1 border border-gray5 rounded-sm w-32"
            >
              <p
                className={cn(
                  "text-text text-gray3 flex-1 truncate text-start",
                  categoryId !== -1 && "text-black2"
                )}
              >
                {categoryName || "카테고리"}
              </p>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("transition-all", isDropdownOpen ? "rotate-180" : "rotate-0")}
              >
                <path
                  d="M3.33301 6.33971L7.03174 10.2439C7.55764 10.799 8.44171 10.799 8.96761 10.2439L12.6663 6.33971"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col bg-white z-10 absolute border border-gray5 w-32 mt-2 overflow-scroll text-center max-h-dropdown hide-scrollbar">
                <button onClick={onOpenModal} className="py-1 w-full">
                  +
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={cn(
                      "py-1 w-full border-t border-gray5",
                      category.id === categoryId && "bg-gray1"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {modal.open && (
        <Modal
          title="카테고리 추가"
          subTitle="새로운 카테고리를 작성해주세요."
          callback={onCloseModal}
        >
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="카테고리 이름을 입력해주세요."
              className="border border-gray5 w-full p-1 text-text"
              value={modal.category}
              onChange={onChangeText}
              onKeyDown={onEnterKeyword}
            />
            <div className="flex w-full gap-3">
              <RectangleButton className="flex-1 border border-gray5" onClick={onCloseModal}>
                취소
              </RectangleButton>
              <RectangleButton
                disabled={addDisabled}
                className="flex-1 bg-black2 text-white transition-colors"
                onClick={onCreateCategory}
              >
                추가
              </RectangleButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Card;
