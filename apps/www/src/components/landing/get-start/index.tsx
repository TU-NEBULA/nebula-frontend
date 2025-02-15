"use client";

import Link from "next/link";

const GetStart = () => {
  const onRouteBookmark = () => {
    // TODO: 로그인 여부에 따른 페이지 이동
    // 로그인 상태라면 /bookmarks 페이지로 이동
    // 비로그인 상태라면 /login 페이지로 이동
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
