import RectangleButton from "../button/rectangle-button";

interface KeywordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  keywords: string[];
  onDeleteKeyword: (name: string) => void;
}

const Keyword = ({ keywords, onDeleteKeyword, ...restProps }: KeywordProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-body">키워드</h2>
        <div className="border border-grey5 p-2 rounded-sm flex justify-between gap-2 items-center text-description min-h-keyword">
          <div className="flex gap-3">
            {keywords.map((keyword) => (
              <RectangleButton
                key={keyword}
                onClick={() => onDeleteKeyword(keyword)}
                className="border border-grey5 py-1 px-3 truncate max-w-20 sm:max-w-24"
              >
                {keyword}
              </RectangleButton>
            ))}
            {keywords.length !== 3 && (
              <input className="outline-none max-w-24 read-only:cursor-default" {...restProps} />
            )}
          </div>
          <span>{keywords.length}/3</span>
        </div>
      </div>
      <ul className="list-disc px-3.5 text-grey3 text-description">
        <li>키워드는 최대 3개까지 작성 가능해요.</li>
        <li>빈 공간을 눌러 키워드를 입력 후 엔터로 추가할 수 있어요.</li>
        <li>클릭해서 삭제할 수 있어요.</li>
      </ul>
    </div>
  );
};

export default Keyword;
