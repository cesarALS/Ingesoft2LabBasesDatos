import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode
}

const Modal = ( { children }: ModalProps) => {
    return (
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-md shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Modal;


