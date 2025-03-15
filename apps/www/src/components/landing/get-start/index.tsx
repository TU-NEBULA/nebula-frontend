"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/lib/zustand/user";

const GetStart = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.accessToken);

  const onRouteBookmark = async () => {
    if (user) return router.push("/bookmarks");

    router.push("/login");
  };

  return (
    <div className="space-y-7 md:block hidden flex-1">
      <div className="text-end space-y-2">
        <button onClick={onRouteBookmark} className="text-2xl">
          시작페이지
        </button>
        <p className="text-sm text-gray7">북마크 정보와 관리된 노드들을 볼 수 있는 페이지 입니다</p>
      </div>
      <div className="text-end space-y-2">
        {/* TODO: 링크 수정 */}
        <Link
          className="text-2xl"
          href="https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko"
          target="_blank"
        >
          크롬 익스텐션 다운로드
        </Link>
        <p className="text-sm text-gray7">크롬 익스텐션을 다운 받을 수 있는 곳 입니다</p>
      </div>
    </div>
  );
};

export default GetStart;
