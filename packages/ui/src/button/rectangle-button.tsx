import { cn } from "../../utils/cn";

const theme = {
  default: "bg-black2 text-white border-black2",
  outline: "bg-white text-black2 border-black2",
  warning: "bg-highlight text-white border-highlight",
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
