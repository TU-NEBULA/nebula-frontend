import { cn } from "../../utils/cn";

const theme = {
  default: "bg-black1 text-white border-black1 hover:bg-black3 active:bg-black3",
  outline: "bg-white text-black3 border-black1 hover:bg-gray3 active:bg-gray1",
  warning: "bg-highlight text-white border-highlight hover:bg-red-600 active:bg-red-500",
};

interface RectangleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: keyof typeof theme;
}

const RectangleButton = (props: RectangleButtonProps) => {
  const { children, className, variation = "default", ...restProps } = props;

  return (
    <button
      className={cn(
        "flex-1 rounded-sm border py-2 font-medium transition-colors disabled:border-gray5 disabled:bg-gray5 disabled:text-white",
        theme[variation],
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default RectangleButton;
