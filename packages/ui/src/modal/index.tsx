import { useOutsideClick } from "../../hooks/use-outside-click";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  callback: () => void;
}

const Modal = ({ children, title, subTitle, callback }: ModalProps) => {
  const [modalRef] = useOutsideClick<HTMLDivElement>(callback);

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black3 bg-opacity-50">
      <div
        ref={modalRef}
        className="mx-3 flex w-full min-w-80 max-w-sidebar flex-col items-center gap-5 rounded-lg bg-white px-12 py-4"
      >
        <div className="space-y-2 whitespace-pre-line text-center">
          <h2 className="text-notification">{title}</h2>
          <h3 className="text-gray6">{subTitle}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
