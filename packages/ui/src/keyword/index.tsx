import { useState } from "react";

import { useOutsideClick } from "../../hooks/use-outside-click";
import RectangleButton from "../button/rectangle-button";

interface KeywordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  keywords: string[];
  keywordList: string[];
  onDeleteKeyword: (name: string) => void;
  onUpdateKeyword: (keyword: string) => void;
}

const Keyword = ({
  keywords,
  keywordList,
  onDeleteKeyword,
  onUpdateKeyword,
  ...restProps
}: KeywordProps) => {
  const [focus, setFocus] = useState(false);

  const [keywordContainerRef] = useOutsideClick<HTMLDivElement>(() => setFocus(false));

  const onSelectKeyword = (keyword: string) => {
    onUpdateKeyword(keyword);
    setFocus(false);
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="space-y-1">
        <h2 className="text-sm text-gray6">키워드</h2>
        <div className="flex min-h-keyword w-full flex-wrap items-center gap-3 border p-2">
          {keywords.map((keyword) => (
            <RectangleButton
              key={keyword}
              onClick={() => onDeleteKeyword(keyword)}
              variation="outline"
              className="w-max flex-none text-nowrap border-gray5 px-3"
            >
              {keyword}
            </RectangleButton>
          ))}
          {keywords.length !== 3 && (
            <div className="relative" ref={keywordContainerRef}>
              <input
                placeholder="키워드를 입력하세요."
                className="outline-none read-only:cursor-default"
                onFocus={() => setFocus(true)}
                {...restProps}
              />
              {focus && keywordList.length > 0 && (
                <ul className="absolute z-10 mt-2 max-h-32 w-full overflow-y-auto border bg-white">
                  {keywordList.map((keyword) => (
                    <RectangleButton
                      key={keyword}
                      variation="outline"
                      className="w-full text-nowrap border-none"
                      onClick={() => onSelectKeyword(keyword)}
                    >
                      {keyword}
                    </RectangleButton>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <ul className="list-disc px-3.5 font-medium text-gray7">
        <li>키워드는 최대 3개까지 작성 가능해요.</li>
        <li>빈 공간을 눌러 키워드를 입력 후 엔터로 추가할 수 있어요.</li>
        <li>클릭해서 삭제할 수 있어요.</li>
      </ul>
    </div>
  );
};

export default Keyword;
