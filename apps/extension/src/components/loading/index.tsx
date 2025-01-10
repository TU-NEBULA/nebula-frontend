import { useLoadingStore } from "@/state/zustand/loading";
import { Spinner } from "@repo/ui";

interface LoadingProps {
  title: string;
  children: React.ReactNode;
}

const Loading = ({ title, children }: LoadingProps) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

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
