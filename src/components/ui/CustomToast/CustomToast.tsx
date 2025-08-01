// CustomToast.tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
  return ReactDOM.createPortal(
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-4 py-2 rounded shadow-md z-[9999]">
      {message}
    </div>,
    document.body
  );
};

export default CustomToast;
