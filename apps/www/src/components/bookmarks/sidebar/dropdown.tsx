"use client";

import { memo, useState } from "react";

import Icon from "@/components/common/icon";
import { useCreateCategory } from "@/lib/tanstack/mutation/category";
import { CategoryProps } from "@/types/category";
import { cn, Modal, RectangleButton } from "@repo/ui";

interface DropdownProps {
  open: boolean;
  type: "Category" | "Keyword";
  icon: React.ReactNode;
  items: CategoryProps[] | string[];
  onClick: () => void;
  onClickItem: (id: string) => void;
}

const Dropdown = ({ open, type, icon, items, onClick, onClickItem }: DropdownProps) => {
  const isCategory = type === "Category";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const categoryName = formData.get("categoryName") as string;

    if (!categoryName) {
      return alert("카테고리 이름을 입력해주세요.");
    }
    if (items.some((item) => item.name === categoryName)) {
      return alert("이미 존재하는 카테고리입니다.");
    }

    await createCategory(categoryName, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <section className="flex flex-col overflow-hidden">
        <button
          className="flex w-full items-center justify-between overflow-hidden px-1"
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            {icon}
            <p className="">{type}</p>
          </div>
          <div className={cn("transition-transform", open && "rotate-90")}>
            <Icon.arrowRight />
          </div>
        </button>
        {open && (
          <ul className="my-2 ml-8 border-l border-gray2 text-xs">
            {items.length ? (
              items.map((item) => (
                <li key={typeof item === "string" ? item : item.id}>
                  <button
                    onClick={() => onClickItem(typeof item === "string" ? item : item.categoryId)}
                    className="w-full px-3 py-2 text-start transition-colors hover:bg-gray1 active:bg-opacity-80"
                  >
                    {typeof item === "string" ? item : item.name}
                  </button>
                </li>
              ))
            ) : (
              <>
                {isCategory && (
                  <button
                    className="flex items-center gap-2 p-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="rounded-full bg-black p-1">
                      <Icon.plus size={12} fill="#fff" />
                    </div>
                    <span>카테고리 추가</span>
                  </button>
                )}
                <li className="p-2">아직 데이터가 없어요.</li>
              </>
            )}
          </ul>
        )}
      </section>
      {isModalOpen && (
        <Modal
          title="카테고리 추가"
          subTitle="추가할 카테고리를 입력해주세요."
          callback={() => !isPending && setIsModalOpen(false)}
        >
          <form className="w-full space-y-4" onSubmit={onSubmit}>
            <input
              placeholder="새로운 카테고리 이름"
              className="w-full rounded-sm border border-black px-2 py-1"
              name="categoryName"
            />
            <div className="flex w-full gap-2">
              <RectangleButton
                onClick={() => setIsModalOpen(false)}
                variation="outline"
                type="button"
                disabled={isPending}
              >
                취소
              </RectangleButton>
              <RectangleButton type="submit" disabled={isPending}>
                추가
              </RectangleButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default memo(Dropdown, (prev, next) => {
  return (
    prev.open === next.open &&
    prev.type === next.type &&
    prev.icon === next.icon &&
    prev.items === next.items
  );
});
