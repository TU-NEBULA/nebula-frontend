import { cn } from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function Textarea({ id, label, className, ...restProps }: TextareaProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-text">{label}</h2>
      <textarea
        id={id}
        className={cn(
          "resize-none border border-black2 w-full bg-gray1 bg-opacity-50 p-2 text-text min-h-24 rounded-sm read-only:cursor-default",
          className
        )}
        {...restProps}
      />
    </div>
  );
}

export default Textarea;
