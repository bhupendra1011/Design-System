import { type HTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import React from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  // Content
  children: React.ReactNode;
  title?: string;
  
  // Behavior
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  
  // Styling
  className?: string;
  overlayClassName?: string;
}

// Base CSS classes for Modal components
const backdropStructuralClasses = 'fixed inset-0 flex items-center justify-center z-[1000] p-4';
const backdropDefaultBg = 'bg-black/50';
const modalStructuralClasses = 'rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-auto relative';
const modalDefaultBg = 'bg-white dark:bg-neutral-950';
const headerClasses = 'flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-800';
const titleClasses = 'text-lg font-medium text-gray-600 dark:text-gray-200 m-0';
const closeButtonClasses = 'bg-transparent border-none text-xl cursor-pointer p-1 text-gray-500 dark:text-gray-400 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-800';
const contentClasses = 'p-6';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    children,
    title,
    isOpen,
    onClose,
    closeOnBackdropClick = true,
    className = '',
    overlayClassName = '',
    style,
    ...props 
  }, _ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, onClose]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store current active element
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        // Focus the modal
        if (modalRef.current) {
          modalRef.current.focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore focus and body scroll
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent): void => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        aria-hidden="true"
        className={`${backdropStructuralClasses} ${overlayClassName || backdropDefaultBg}`}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div
          {...props}
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-modal="true"
          className={`${modalStructuralClasses} ${className || modalDefaultBg}`}
          ref={modalRef}
          role="dialog"
          style={style}
          tabIndex={-1}
        >
          {Boolean(title) && (
            <header className={headerClasses}>
              <h2 className={titleClasses} id="modal-title">
                {title}
              </h2>
              <button
                aria-label="Close modal"
                className={closeButtonClasses}
                onClick={onClose}
                type="button"
              >
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </header>
          )}
          <div className={contentClasses}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';