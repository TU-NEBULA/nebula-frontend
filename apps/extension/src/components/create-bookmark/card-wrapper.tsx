import { useEffect } from "react";

import { useGetCategory } from "@/state/query/category";
import { CategoryListProps } from "@/types/category";
import { Card } from "@repo/ui";

import { Link } from "react-router-dom";

interface CardWrapperProps {
  thumbnailUrl: string;
  siteUrl: string;
  title: string;
  categoryName: string;
  isLoading: boolean;
  onSelectCategory: (category: string) => void;
  onAddCategory: (category: string) => Promise<void>;
  onUpdateCategory: (categories: CategoryListProps[]) => void;
}

export default function CardWrapper({
  thumbnailUrl,
  siteUrl,
  title,
  categoryName,
  isLoading,
  onSelectCategory,
  onAddCategory,
  onUpdateCategory,
}: CardWrapperProps) {
  const { data } = useGetCategory();

  useEffect(() => {
    if (data) {
      onUpdateCategory(data?.result?.categoryList || []);
    }
  }, [data]);

  return (
    <Card
      Thumbnail={
        thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${siteUrl} thumbnail`}
            width={64}
            height={64}
            className="aspect-square max-h-16 max-w-16 rounded-md object-cover"
          />
        ) : null
      }
      Link={
        <Link target="_blank" to={siteUrl} className="truncate text-text text-gray6">
          {siteUrl || "siteUrl"}
        </Link>
      }
      title={title}
      categoryName={categoryName}
      categories={data?.result?.categoryList.map((category) => category.name) || []}
      onSelectCategory={onSelectCategory}
      onAddCategory={onAddCategory}
      isLoading={isLoading}
      editEnabled
    />
  );
}
