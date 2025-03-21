const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/oauth";

export const onClickOauth = (provider: "kakao" | "google") => {
  window.location.href = baseUrl + "/" + provider + "?redirectType=web";
};
