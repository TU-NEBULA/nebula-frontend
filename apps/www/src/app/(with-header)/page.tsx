import GetStart from "@/components/landing/get-start";
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
        <GetStart />
      </section>
      <SampleGraph />
    </main>
  );
}
