import { cn } from "../../utils/cn";

const RectangleButton = ({
  children,
  className,
  disabled,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "rounded-sm py-2 font-medium hover:bg-opacity-90 active:bg-opacity-80",
        disabled && "bg-gray2 cursor-default hover:bg-opacity-100 active:bg-opacity-100",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default RectangleButton;
