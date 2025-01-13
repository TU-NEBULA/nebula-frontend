import { RectangleButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  title: string;
  subtitle: string;
}

function ErrorPage({ title, subtitle }: ErrorPageProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="h-full flex flex-col justify-center items-center gap-10">
      <div className="space-y-2 text-center">
        <h1 className="text-title">{title}</h1>
        <h2 className="text-subtitle text-grey2">{subtitle}</h2>
      </div>
      <RectangleButton onClick={onClick} className="w-full text-white bg-black">
        홈으로 돌아가기
      </RectangleButton>
    </main>
  );
}

export default ErrorPage;
