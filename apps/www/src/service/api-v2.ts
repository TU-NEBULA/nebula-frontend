type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const baseUrl = process.env.NEXT_PUBLIC_API_URL_V2 || "http://localhost:3000";

const customFetch = async (url: string, method: Method, _body?: unknown, options?: RequestInit) => {
  let body: BodyInit | undefined;
  if (_body) {
    body = _body instanceof FormData ? _body : JSON.stringify(_body);
  }

  const headers: HeadersInit = {
    ...options?.headers,
    ...(_body && !(_body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
  };

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      method,
      body,
      credentials: "include",
      headers,
    });

    if (res.status === 401 && typeof window !== "undefined") {
      window.location.replace("/login");
      return new Promise(() => {});
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return res.json();
    } else {
      return res.text();
    }
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

const apiV2 = {
  get: getFetch,
  post: postFetch,
  patch: patchFetch,
  put: putFetch,
  delete: deleteFetch,
};

export default apiV2;
