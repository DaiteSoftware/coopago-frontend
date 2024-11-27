import React from "react";
import { Modal } from "./Modal";

export const DoneModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>data from modal</h2>

        <button
          className="w-full  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => onClose()}
        >
          Continuar
        </button>
      </div>
    </Modal>
  );
};
