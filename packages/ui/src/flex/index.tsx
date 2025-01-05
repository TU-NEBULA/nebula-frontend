interface FlexProps {
  children: React.ReactNode;
  direction: "row" | "row-reverse" | "col" | "col-reverse";
  justify: "start" | "end" | "center" | "between" | "around" | "evenly";
  align: "start" | "end" | "center" | "stretch" | "baseline";
  wrap: "nowrap" | "wrap" | "wrap-reverse";
  className: string;
}

export default function Flex({
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "nowrap",
  className = "",
  children,
}: Partial<FlexProps>) {
  const flexClass = `flex flex-${direction} flex-${wrap} justify-${justify} items-${align}`;

  return <div className={`${flexClass} ${className}`}>{children}</div>;
}
