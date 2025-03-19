import { queryClient } from "@/components/layout";
import { CATEGORY } from "@/constants/category";
import { createCategory } from "@/services/category";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORY.GET] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
