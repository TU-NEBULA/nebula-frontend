import Link from "next/link";

import SampleGraph from "@/components/landing/sample-graph";

export default function LandingPage() {
  return (
    <main className="px-10 text-white">
      <section className="flex flex-col items-center justify-between py-28 md:flex-row">
        <div className="flex flex-1 flex-col gap-20">
          <h1 className="md:text-landing-title text-landing-sub-title">Nebula</h1>
          <div className="text-xl">
            {/* TODO: 랜딩 페이지 문구 수정 */}
            <p>북마크 기반 웹 서비스 네뷸라 입니다.</p>
            <p>
              네뷸라 서비스는 크롬 익스텐션 기반의 플랫폼으로 크롬 북마크 정보를 연동해 더욱 더
              세분화하고 관리해주는 서비스 입니다.
            </p>
          </div>
        </div>
        <div className="hidden flex-1 space-y-7 md:block">
          <div className="space-y-2 text-end">
            <Link href="/bookmarks" className="text-2xl">
              시작페이지
            </Link>
            <p className="text-sm text-gray7">
              북마크 정보와 관리된 노드들을 볼 수 있는 페이지 입니다
            </p>
          </div>
          <div className="space-y-2 text-end">
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
      </section>
      <SampleGraph />
    </main>
  );
}
