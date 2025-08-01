// ToastContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import CustomToast from './CustomToast';

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState(3000);
 console.log("context")
  const showToast = (msg: string, duration: number = 3000) => {
    // debugger
    setMessage(msg);
    setTimer(duration);
    setVisible(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (visible) {
      timeout = setTimeout(() => setVisible(false), timer);
    }
    return () => clearTimeout(timeout);
  }, [visible, timer]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && <CustomToast message={message} />}
    </ToastContext.Provider>
  );
};

