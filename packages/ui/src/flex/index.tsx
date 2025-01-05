type Direction = "row" | "row-reverse" | "col" | "col-reverse";
type Justify = "start" | "end" | "center" | "between" | "around" | "evenly";
type Align = "start" | "end" | "center" | "stretch" | "baseline";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";

interface FlexOwnProps {
  direction?: Direction;
  justify?: Justify;
  align?: Align;
  wrap?: Wrap;
  className?: string;
}

type FlexProps<T extends React.ElementType> = FlexOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof FlexOwnProps> & {
    as?: T;
  };

export default function Flex<T extends React.ElementType = "div">({
  as,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "nowrap",
  className = "",
  children,
  ...restProps
}: FlexProps<T>) {
  const Component = as || "div";
  const flexClass = `flex flex-${direction} flex-${wrap} justify-${justify} items-${align}`;

  return (
    <Component className={`${flexClass} ${className}`} {...restProps}>
      {children}
    </Component>
  );
}
