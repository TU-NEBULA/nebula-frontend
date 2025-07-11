import { queryClient } from "@/components/layout";
import { STAR } from "@/constants/star";
import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { completeCreateStar, createStar, updateStar } from "@/services/star";
import { useLoadingStore } from "@/state/zustand/loading";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { useTabStore } from "../zustand/tab";

export const useCreateStar = () => {
  const navigate = useNavigate();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

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
  const setIsFindingExistPath = useTabStore((state) => state.setIsFindingExistPath);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: completeCreateStar,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsFindingExistPath(true);
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
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const setIsFindingExistPath = useTabStore((state) => state.setIsFindingExistPath);

  return useMutation({
    mutationFn: updateStar,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STAR.GET_BY_ID, data?.result?.starId] });
      setIsFindingExistPath(true);
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
