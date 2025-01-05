const RectangleButton = ({
  children,
  className,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`rounded-sm py-2 font-medium ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default RectangleButton;
