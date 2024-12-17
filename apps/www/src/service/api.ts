import { cookies } from "next/headers";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const customFetch = async (url: string, method: Method, _body?: unknown, options?: RequestInit) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token");
  const Authorization = `Bearer ${token.value}`;
  const body = _body ? JSON.stringify(_body) : undefined;
  const headers: HeadersInit = {
    ...options?.headers,
    ...(token && { Authorization }),
  };

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      method,
      body,
      headers,
    });

    if (!res.ok) {
      return { status: res.status, statusText: res.statusText, text: await res.text() };
    }
    return res.json();
  } catch (error) {
    return error as Error;
  }
};

async function getFetch<T>(url: string, options?: RequestInit): Promise<T> {
  return await customFetch(url, "GET", undefined, { cache: "force-cache", ...options });
}

async function postFetch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
  return await customFetch(url, "POST", body, options);
}

async function patchFetch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
  return await customFetch(url, "PATCH", body, options);
}

async function putFetch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
  return await customFetch(url, "PUT", body, options);
}

async function deleteFetch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
  return await customFetch(url, "DELETE", body, options);
}

const api = {
  get: getFetch,
  post: postFetch,
  patch: patchFetch,
  put: putFetch,
  delete: deleteFetch,
};

export default api;
