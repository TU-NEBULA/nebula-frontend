import { cn } from "../utils/cn";

const RectangleButton = ({
  children,
  className,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cn(["rounded-sm py-2 font-medium", className])} {...restProps}>
      {children}
    </button>
  );
};

export default RectangleButton;
