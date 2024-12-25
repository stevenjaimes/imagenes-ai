import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * A modal component that displays content in a portal overlay.
 * 
 * @component
 * @param {Object} props - The props for the Modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open and visible.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {React.ReactNode} props.children - The content to be displayed within the modal.
 * 
 * @returns {JSX.Element | null} A JSX element for the modal or null if `isOpen` is false.
 * 
 * When the modal is open, it prevents body scrolling by setting `document.body.style.overflow` 
 * to 'hidden'. It reverts back to 'unset' when closed. The modal content appears centered 
 * on the screen with a backdrop overlay, and clicking outside the modal content or on the 
 * close button will trigger the `onClose` function.
 */

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      {/* Overlay/Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;