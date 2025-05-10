import { cn } from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function Textarea({ id, label, className, ...restProps }: TextareaProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm text-gray6">{label}</h2>
      <textarea
        id={id}
        className={cn(
          "min-h-24 w-full resize-none rounded-sm bg-gray1 bg-opacity-50 p-2 text-xs read-only:cursor-default",
          className
        )}
        {...restProps}
      />
    </div>
  );
}

export default Textarea;
