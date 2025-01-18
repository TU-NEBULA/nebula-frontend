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
    <div className="flex justify-center items-center fixed left-0 top-0 bg-black bg-opacity-50 w-full h-full z-10">
      <div
        ref={modalRef}
        className="bg-white px-12 py-4 rounded-lg flex flex-col gap-5 items-center w-full min-w-80 max-w-sidebar mx-3"
      >
        <div className="text-center space-y-2 whitespace-pre-line">
          <h2 className="text-title">{title}</h2>
          <h3 className="text-label text-grey2">{subTitle}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
