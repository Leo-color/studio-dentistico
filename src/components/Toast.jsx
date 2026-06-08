import React from 'react';
import { useStudio } from '../context/StudioContext';

export const ToastContainer = () => {
  const { toasts } = useStudio();

  return (
    <div className="fixed bottom-4 right-4 z-9999 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white font-semibold shadow-lg animate-pulse ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}
        >
          {toast.type === 'success' && '[OK] '}
          {toast.type === 'error' && '[ERRORE] '}
          {toast.type === 'info' && '[INFO] '}
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
