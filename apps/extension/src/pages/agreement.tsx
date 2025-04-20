import { useState } from "react";

import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { postTerm } from "@/services/term";
import { useGetTerm } from "@/state/query/term";
import { getBookMarks } from "@/utils/chrome";
import { cn, RectangleButton } from "@repo/ui";

import { useLocation } from "react-router-dom";

const Agreement = () => {
  const [checked, setChecked] = useState(false);
  const { state } = useLocation();

  const navigate = useReplaceNavigate();

  const { data, isLoading } = useGetTerm(state.accessToken);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onClickGetBookmarks = async () => {
    try {
      const bookmarks = await getBookMarks();
      const res = await postTerm(state.accessToken, {
        "1": checked,
      });
      if (res.status === 200) {
        chrome.storage.local.set(state);
        navigate("/bookmark");
      }
    } catch (error) {
      console.error("Error getting bookmarks:", error);
    }
  };

  return (
    <main className="h-full gap-44 flex flex-col justify-center">
      <section className="space-y-7">
        <div className="space-y-4">
          <h1 className="text-notification">
            크롬 내에 있는 북마크를 가져오는
            <br />
            것에 동의하시겠습니까?
          </h1>
          <h2 className="text-description">네뷸라 실행을 위해선 북마크 동의를 해야합니다.</h2>
        </div>
        <div className="space-y-2">
          <p className="text-body">
            북마크정보 수집 및 이용 동의 <span className="text-highlight">*</span>
          </p>
          <p className="font-light rounded-sm border border-gray5 p-2">
            {isLoading ? "로딩중..." : data?.result?.map((term) => term.content).join("\n")}
          </p>
          <div className="text-description flex items-center gap-1 font-normal">
            <input id="agreement" type="checkbox" checked={checked} onChange={onCheck} />
            <label htmlFor="agreement">(필수) 북마크 정보 수집 및 이용에 동의합니다.</label>
          </div>
        </div>
      </section>
      <RectangleButton
        className={cn("text-white transition-colors", checked && "bg-black2")}
        onClick={onClickGetBookmarks}
        disabled={!checked}
      >
        불러오기
      </RectangleButton>
    </main>
  );
};

export default Agreement;
