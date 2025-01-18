import { cn } from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function Textarea({ id, label, className, children, ...restProps }: TextareaProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <h2 className="text-body">{label}</h2>
        {children}
      </div>
      <textarea
        id={id}
        className={cn(
          "resize-none border border-black w-full bg-grey1 bg-opacity-50 p-2 text-body min-h-24 rounded-sm",
          className
        )}
        {...restProps}
      />
    </div>
  );
}

export default Textarea;
