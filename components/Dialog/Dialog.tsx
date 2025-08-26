import React from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-lg w-full relative">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
