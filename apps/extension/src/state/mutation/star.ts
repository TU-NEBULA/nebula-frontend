import { queryClient } from "@/components/layout";
import { STAR } from "@/constants/star";
import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { completeCreateStar, createStar, updateStar } from "@/services/star";
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
    onSuccess: (data) => {
      navigate("/create-bookmark", { state: data.result });
    },
    onError: (error) => {
      console.error(error);
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
    onSuccess: () => {
      navigate("/bookmark");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};

export const useUpdateStar = () => {
  const navigate = useReplaceNavigate();
  const { setIsLoading } = useLoadingStore();

  return useMutation({
    mutationFn: updateStar,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STAR.GET_BY_ID, data?.result?.starId] });
      navigate("/bookmark");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};
