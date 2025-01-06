import { useState } from "react";

import { getBookMarks } from "@/utils/chrome";
import { cn, RectangleButton } from "@repo/ui";

const Agreement = () => {
  const [checked, setChecked] = useState(false);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onClickGetBookmarks = () => {
    getBookMarks();
  };

  return (
    <main className="h-full gap-44 flex flex-col justify-center">
      <section className="space-y-7">
        <div className="space-y-4">
          <h1 className="text-2xl">
            크롬 내에 있는 북마크를 가져오는
            <br />
            것에 <span className="font-semibold">동의하시겠습니까?</span>
          </h1>
          <h2>네뷸라 실행을 위해선 북마크 동의를 해야합니다.</h2>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            북마크정보 수집 및 이용 동의 <span className="text-essential">*</span>
          </p>
          <p className="text-xs font-medium rounded-sm border border-grey3 p-2">
            네뷸라 서비스는 사용자가 저장한 크롬 북마크 정보를 분석하고 시각화하여 더 나은 북마크
            기록과 환경을 제공합니다. 이를 위해 사용자의 북마크 정보를 수집하고 활용할 수 있으며,
            동의하신 경우에만 서비스 이용이 가능합니다. 수집된 정보로 사용자 개개인의 북마크 기록을
            분석하고, 비슷한 관심사를 가진 다른 사용자들의 정보를 분석하여 유용한 정보를 제공합니다.
          </p>
          <div className="text-xs flex items-center gap-1">
            <input id="agreement" type="checkbox" checked={checked} onChange={onCheck} />
            <label htmlFor="agreement">(필수) 북마크 정보 수집 및 이용에 동의합니다.</label>
          </div>
        </div>
      </section>
      <RectangleButton
        className={cn(
          "text-white transition-colors cursor-default",
          checked ? "bg-black hover:bg-opacity-90 active:bg-opacity-80 cursor-pointer" : "bg-grey3"
        )}
        onClick={onClickGetBookmarks}
      >
        불러오기
      </RectangleButton>
    </main>
  );
};

export default Agreement;
