import { CATEGORY } from "@/constants/category";
import { createCategory } from "@/service/category";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "..";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORY.GET_ALL] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
