import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen text-white gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link href="/" replace className="text-gray7 font-semibold">
        홈으로 돌아가기
      </Link>
    </main>
  );
};

export default NotFoundPage;
