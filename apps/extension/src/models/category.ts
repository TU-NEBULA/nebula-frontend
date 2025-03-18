import { CategoryListProps } from "@/types/category";

export interface GetCategoryDTO {
  totalCount: number;
  categoryList: CategoryListProps[];
}

export interface CreateCategoryDTO {
  categoryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
