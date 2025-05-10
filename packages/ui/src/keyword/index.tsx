import RectangleButton from "../button/rectangle-button";

interface KeywordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  keywords: string[];
  onDeleteKeyword: (name: string) => void;
}

const Keyword = ({ keywords, onDeleteKeyword, ...restProps }: KeywordProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-sm text-gray6">키워드</h2>
        <div className="flex min-h-keyword items-center justify-between gap-2 rounded-sm border border-gray5 p-2 text-text">
          <div className="flex gap-3">
            {keywords.map((keyword) => (
              <RectangleButton
                key={keyword}
                onClick={() => onDeleteKeyword(keyword)}
                variation="outline"
                className="border-gray5 px-3 py-1"
              >
                {keyword}
              </RectangleButton>
            ))}
            {keywords.length !== 3 && (
              <input className="max-w-24 outline-none read-only:cursor-default" {...restProps} />
            )}
          </div>
          <span>{keywords.length}/3</span>
        </div>
      </div>
      <ul className="list-disc px-3.5 text-text text-gray7">
        <li>키워드는 최대 3개까지 작성 가능해요.</li>
        <li>빈 공간을 눌러 키워드를 입력 후 엔터로 추가할 수 있어요.</li>
        <li>클릭해서 삭제할 수 있어요.</li>
      </ul>
    </div>
  );
};

export default Keyword;
