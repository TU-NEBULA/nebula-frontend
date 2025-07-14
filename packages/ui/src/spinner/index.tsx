import { cn } from "../../utils/cn";

interface SpinnerProps {
  theme?: "light" | "dark";
  small?: boolean;
}

const Spinner = ({ theme = "light", small = false }: SpinnerProps) => {
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
      className={cn(
        "flex animate-spin items-center justify-center rounded-full",
        small ? "h-28 w-28" : "h-56 w-56"
      )}
      style={{ background: style.background }}
    >
      <div className={cn("rounded-full", small ? "h-24 w-24" : "h-52 w-52", style.circle)} />
    </div>
  );
};

export default Spinner;
