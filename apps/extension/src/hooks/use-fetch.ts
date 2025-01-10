import { BaseResponseDTO } from "@/models";
import { api } from "@/services/api";
import { useLoadingStore } from "@/state/zustand/loading";

export const useFetch = <T, K>() => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const fetchData = async (
    url: string,
    data: T,
    method: "get" | "post" | "patch" | "put" = "get"
  ): Promise<BaseResponseDTO<K>> => {
    const isGetMethod = method === "get";

    setIsLoading(true);
    const res = isGetMethod ? await api[method](url) : await api[method](url, data);
    setIsLoading(false);

    return res;
  };

  return { fetchData };
};
