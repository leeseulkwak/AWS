import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  onUndo?: () => void;
  duration?: number;
}

export const Toast = ({ message, onClose, onUndo, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast">
      <span className="toast__icon">✅</span>
      <span className="toast__message">{message}</span>
      {onUndo && (
        <button className="toast__undo" onClick={onUndo}>
          취소
        </button>
      )}
    </div>
  );
};
