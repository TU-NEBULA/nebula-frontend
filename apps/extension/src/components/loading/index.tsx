import { useLoadingStore } from "@/state/zustand/loading";
import { Spinner } from "@repo/ui";

interface LoadingProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Loading = ({ title, description, children }: LoadingProps) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return isLoading ? (
    <div className="flex h-full flex-col items-center justify-center gap-10 text-notification">
      <div className="text-center">
        <h1>{title}</h1>
        <p className="text-description">{description}</p>
      </div>
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Loading;
