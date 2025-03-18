import { createCategory } from "@/services/category";
import { useMutation } from "@tanstack/react-query";

import { useLoadingStore } from "../zustand/loading";

export const useCreateCategory = () => {
  const { setIsLoading } = useLoadingStore();

  return useMutation({
    mutationFn: createCategory,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};
