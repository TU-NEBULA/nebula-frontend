import GetStart from "@/components/home/get-start";

export default function Home() {
  return (
    <main className="text-white px-10">
      <section className="flex md:flex-row flex-col items-center justify-between py-28 ">
        <div className="flex flex-col gap-20 flex-1">
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
      <section className="py-28">
        {/* TODO: 해당 부분 어떤 내용 보여줄지 재정의하기 */}
        <div className="p-12 border border-gray7 flex w-full rounded-lg gap-12">
          <div className="space-y-5">
            <h2 className="text-landing-sub-title text-4xl whitespace-pre-line">
              북마크를{"\n"}노드로 관리
            </h2>
            <p className="text-gray7">
              북마크별로 정보의 양에 따라 노드의 크기 및 선의 굵기가 바뀌며, 색상 또한 역할에 맞게
              지정하여 보여줍니다.
            </p>
          </div>
          <div className="bg-gray7 w-full aspect-video md:block hidden" />
        </div>
      </section>
    </main>
  );
}
