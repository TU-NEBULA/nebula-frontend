import { Spinner } from "@repo/ui";

interface LoadingProps {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ title, isLoading, children }: LoadingProps) => {
  return isLoading ? (
    <div className="h-full flex flex-col justify-center items-center gap-10 text-title">
      {title}
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Loading;
