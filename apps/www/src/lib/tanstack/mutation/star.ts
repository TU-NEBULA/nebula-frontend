import { STAR } from "@/constants/star";
import { deleteStar, updateStar } from "@/service/star";
import { revalidateTags } from "@/utils/api";
import { successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "..";

export const useUpdateStar = () => {
  return useMutation({
    mutationFn: updateStar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STAR.GET_BY_ID, data.result.starId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteStar = (callback: () => void) => {
  return useMutation({
    mutationFn: deleteStar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STAR.GET_BY_ID, data.result.starId] });
      revalidateTags([STAR.GET_ALL]);
      successToast("북마크가 삭제되었습니다.");
      callback();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
