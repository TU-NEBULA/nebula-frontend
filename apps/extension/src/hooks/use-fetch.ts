import { METHOD, RESPONSE } from "@/constants/api";
import { BaseResponseDTO } from "@/models";
import { api } from "@/services/api";
import { useLoadingStore } from "@/state/zustand/loading";

import { AxiosRequestConfig } from "axios";

export const useFetch = <T, K>() => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const fetchData = async (
    url: string,
    data: T,
    method: METHOD = METHOD.GET,
    options?: AxiosRequestConfig
  ): Promise<BaseResponseDTO<K>> => {
    const isGetMethod = method === METHOD.GET;
    setIsLoading(true);

    try {
      return isGetMethod ? await api[method](url, options) : await api[method](url, data, options);
    } catch (error) {
      return {
        isSuccess: false,
        code: RESPONSE.FAIL,
        message: (error as Error).message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData };
};
