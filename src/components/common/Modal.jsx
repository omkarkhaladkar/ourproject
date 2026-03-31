import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen = true, onClose, className = '', children }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="app-modal-overlay" onClick={onClose} role="presentation">
      <div className={`app-modal-card ${className}`.trim()} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="app-modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
