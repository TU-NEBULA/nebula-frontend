import { useGetCategory } from "@/state/query/category";
import { CategoryListProps } from "@/types/category";
import { BookmarkProps } from "@repo/types";
import { Card } from "@repo/ui";

import { Link } from "react-router-dom";

interface CardProps extends BookmarkProps {
  onSelectCategory: (categoryId: string) => void;
  onAddCategory: (category: string) => Promise<void>;
}

export default function CardWrapper({
  thumbnailUrl,
  siteUrl,
  title,
  categoryId,
  categories,
  onSelectCategory,
  onAddCategory,
}: CardProps) {
  const { data } = useGetCategory();
  console.log(data);

  return (
    <Card
      Thumbnail={
        thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${siteUrl} thumbnail`}
            width={64}
            height={64}
            className="aspect-square object-cover max-w-16 max-h-16 rounded-md"
          />
        ) : null
      }
      Link={
        <Link target="_blank" to={siteUrl} className="text-text text-gray6 truncate">
          {siteUrl || "siteUrl"}
        </Link>
      }
      title={title}
      categoryId={categoryId}
      categories={
        (data?.result?.categoryList as Omit<CategoryListProps, "includedStarCnt">[]) || []
      }
      onSelectCategory={onSelectCategory}
      onAddCategory={onAddCategory}
    />
  );
}
