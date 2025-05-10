import { useLoadingStore } from "@/state/zustand/loading";
import { Spinner } from "@repo/ui";

interface LoadingProps {
  title: string;
  children: React.ReactNode;
}

const Loading = ({ title, children }: LoadingProps) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return isLoading ? (
    <div className="flex h-full flex-col items-center justify-center gap-10 text-notification">
      {title}
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Loading;
