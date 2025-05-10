import { cn } from "../../utils/cn";

interface SpinnerProps {
  theme?: "light" | "dark";
}

const Spinner = ({ theme = "light" }: SpinnerProps) => {
  const style =
    theme === "light"
      ? {
          background: "conic-gradient(from 180deg at 50% 50%, #111 0deg, #11111100 360deg)",
          circle: "bg-white",
        }
      : {
          background: "conic-gradient(from 180deg at 50% 50%, #fff 0deg, #ffffff00 360deg)",
          circle: "bg-black3",
        };

  return (
    <div
      className="flex h-56 w-56 animate-spin items-center justify-center rounded-full"
      style={{ background: style.background }}
    >
      <div className={cn("h-52 w-52 rounded-full", style.circle)} />
    </div>
  );
};

export default Spinner;
