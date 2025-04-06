// src/components/common/Modal.jsx
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6 relative">
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
