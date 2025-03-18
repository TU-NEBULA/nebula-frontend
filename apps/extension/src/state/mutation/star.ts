import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { completeCreateStar, createStar } from "@/services/star";
import { useLoadingStore } from "@/state/zustand/loading";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

export const useCreateStar = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoadingStore();

  return useMutation({
    mutationFn: createStar,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data, variable) => {
      console.log(data, variable);
      navigate("/create-bookmark", { state: data.result });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};

export const useCompleteCreateStar = () => {
  const navigate = useReplaceNavigate();
  const { setIsLoading } = useLoadingStore();

  return useMutation({
    mutationFn: completeCreateStar,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data, variable) => {
      console.log(data, variable);
      navigate("/bookmark");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};
