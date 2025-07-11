import { cn } from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rightElement?: React.ReactNode;
}

function Textarea({ id, label, className, rightElement, ...restProps }: TextareaProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h2 className="text-sm text-gray6">{label}</h2>
        {rightElement}
      </div>
      <textarea
        id={id}
        className={cn(
          "min-h-24 w-full rounded-sm bg-gray1 bg-opacity-50 p-2 text-xs read-only:cursor-default",
          className
        )}
        {...restProps}
      />
    </div>
  );
}

export default Textarea;
