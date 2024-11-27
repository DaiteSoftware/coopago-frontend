import React from "react";
import { useRef } from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (modalRef.current === e.target) {
          closeModal();
        }
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg flex flex-col ">
        {children}
      </div>

    </div>
  );
};
