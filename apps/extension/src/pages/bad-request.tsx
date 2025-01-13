import { RectangleButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

function BadRequest() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="h-full flex flex-col justify-center items-center gap-10">
      <h1 className="text-title text-center">잘못된 요청입니다.</h1>
      <RectangleButton onClick={onClick} className="w-full text-white bg-black">
        홈으로 돌아가기
      </RectangleButton>
    </main>
  );
}

export default BadRequest;
