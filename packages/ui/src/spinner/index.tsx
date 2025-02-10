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
          circle: "bg-black2",
        };

  return (
    <div
      className="w-12 h-12 rounded-full animate-spin flex items-center justify-center"
      style={{ background: style.background }}
    >
      <div className={cn("w-8 h-8 rounded-full", style.circle)} />
    </div>
  );
};

export default Spinner;
