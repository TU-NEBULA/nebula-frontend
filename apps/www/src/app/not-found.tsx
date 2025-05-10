import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link href="/" replace className="font-semibold text-gray7">
        홈으로 돌아가기
      </Link>
    </main>
  );
};

export default NotFoundPage;
