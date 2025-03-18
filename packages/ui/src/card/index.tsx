import { useState } from "react";

import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from "../../utils/cn";

interface CategoryProps {
  id: string;
  name: string;
}

interface CardProps {
  Thumbnail: React.ReactNode;
  Link: React.ReactNode;
  title: string;
  categoryId: string;
  categories: CategoryProps[];
  onSelectCategory: (categoryId: string) => void;
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
  const [edit, setEdit] = useState({
    start: false,
    content: "",
  });

  const categoryName = categories.find((category) => category.id === categoryId)?.name;

  const [dropdownRef] = useOutsideClick<HTMLDivElement>(() => isDropdownOpen && onCloseModal());

  const onToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onStartEdit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setEdit({ start: true, content: "" });
  };

  const onCloseModal = () => {
    setEdit({ start: false, content: "" });
    onToggle();
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, content: e.target.value });
  };

  const onCreateCategory = async () => {
    try {
      // API 호출
      console.log(edit.content);
      await onAddCategory(edit.content);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit({ start: false, content: "" });
    }
  };

  const onEnterKeyword = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      await onCreateCategory();
    }
  };

  return (
    <>
      <section className="flex items-center gap-3">
        {Thumbnail ? Thumbnail : <div className="min-w-16 aspect-square bg-gray5 rounded-md" />}
        <div className="text-title truncate flex flex-col h-full justify-center">
          <p className="">{title || "제목"}</p>
          {Link}
          <div ref={dropdownRef}>
            <button onClick={onToggle} className="flex gap-2 items-center py-0.5 mt-2">
              <p className="text-text text-black2 flex-1 truncate text-start">
                {categoryName || "카테고리"}
              </p>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
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
              <div className="flex flex-col bg-white z-10 absolute w-32 mt-2 overflow-scroll text-text max-h-dropdown hide-scrollbar shadow-lg">
                <input
                  value={edit.content}
                  onChange={onChangeText}
                  placeholder="Add Here"
                  onClick={onStartEdit}
                  onKeyDown={onEnterKeyword}
                  readOnly={!edit.start}
                  className={cn(
                    "p-3 w-full placeholder:text-black1 text-black1",
                    !edit.start && "cursor-pointer"
                  )}
                />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={cn(
                      "text-start p-3 w-full text-gray7 hover:bg-gray1",
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
    </>
  );
};

export default Card;
