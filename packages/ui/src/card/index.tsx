import { useEffect, useState } from "react";

import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from "../../utils/cn";

interface CardProps {
  Thumbnail: React.ReactNode;
  Link: React.ReactNode;
  title: string;
  categories: string[];
  isLoading?: boolean;
  editEnabled?: boolean;
  categoryName: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: (category: string) => Promise<void>;
}

const Card = ({
  Thumbnail,
  Link,
  title,
  categories,
  isLoading,
  editEnabled,
  categoryName,
  onSelectCategory,
  onAddCategory,
}: CardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [edit, setEdit] = useState({
    start: false,
    content: "",
    title,
  });

  const [dropdownRef] = useOutsideClick<HTMLDivElement>(() => isDropdownOpen && onCloseModal());

  const onToggle = () => {
    if (editEnabled) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const onStartEdit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setEdit({ start: true, content: "", title: edit.title });
  };

  const onCloseModal = () => {
    setEdit({ start: false, content: "", title: edit.title });
    onToggle();
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, content: e.target.value });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, title: e.target.value });
  };

  const onCreateCategory = async () => {
    try {
      await onAddCategory(edit.content);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit((prev) => ({ ...prev, content: "" }));
    }
  };

  const onEnterKeyword = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      await onCreateCategory();
    }
  };

  useEffect(() => {
    setEdit((prev) => ({
      ...prev,
      title,
    }));
  }, [title]);

  return (
    <>
      <section className="flex items-center gap-3">
        {Thumbnail ? Thumbnail : <div className="aspect-square min-w-16 rounded-md bg-gray5" />}
        <div className="flex h-full flex-col justify-center truncate">
          <input
            value={editEnabled ? edit.title : title}
            placeholder="제목을 입력해주세요."
            onChange={onChangeTitle}
            className="font-semibold outline-none"
            readOnly={!editEnabled || isLoading}
          />
          {Link}
          <div ref={dropdownRef}>
            <button onClick={onToggle} className="mt-2 flex items-center gap-2 py-0.5">
              <p className="flex-1 truncate text-start text-title text-black3">
                {categoryName || "카테고리"}
              </p>
              {editEnabled && (
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
              )}
            </button>
            {isDropdownOpen && editEnabled && (
              <div className="hide-scrollbar absolute z-10 mt-2 flex max-h-dropdown w-32 flex-col overflow-scroll bg-white text-text shadow-lg">
                <input
                  value={edit.content}
                  onChange={onChangeText}
                  placeholder="Add Here"
                  onClick={onStartEdit}
                  onKeyDown={onEnterKeyword}
                  disabled={isLoading}
                  readOnly={!edit.start || isLoading}
                  className={cn(
                    "w-full p-3 text-black1 placeholder:text-black1",
                    !edit.start && "cursor-pointer"
                  )}
                />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                      "w-full p-3 text-start text-gray7 hover:bg-gray1",
                      category === categoryName && "bg-gray1"
                    )}
                  >
                    {category}
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
