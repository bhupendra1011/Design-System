import { type HTMLAttributes, forwardRef, useEffect, useRef } from "react";
import React from "react";
import { CloseIcon, ExpandIcon } from "@pd/icons";
import { Button } from "./button";
import { Text } from "./text";

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
const backdropStructuralClasses =
  "fixed inset-0 flex items-center justify-center z-[1000] p-4";
const backdropDefaultBg =
  "bg-black/10 backdrop-blur-[1.5px] backdrop-saturate-150 backdrop-brightness-75";
const modalStructuralClasses =
  "w-[750px] max-h-[80vh] overflow-auto relative";
const modalDefaultBg = "bg-modal";
const headerClasses =
  "flex items-center justify-between px-3 py-4 ";

const contentClasses = "p-2";

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      title,
      isOpen,
      onClose,
      closeOnBackdropClick = true,
      className = "",
      overlayClassName = "",
      style,
      ...props
    },
    _ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
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
        document.body.style.overflow = "hidden";
      } else {
        // Restore focus and body scroll
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
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
        className={`${backdropStructuralClasses} ${overlayClassName || backdropDefaultBg} `}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div
          {...props}
          aria-labelledby={title ? "modal-title" : undefined}
          aria-modal="true"
          className={`${modalStructuralClasses} ${className || modalDefaultBg}`}
          ref={modalRef}
          role="dialog"
          style={{
            boxShadow: 'var(--shadows-modal)',
            borderRadius: 'var(--radius-modal)',
            ...style
          }}
          tabIndex={-1}
        >
          {Boolean(title) && (
            <header className={headerClasses}>
            
              <Text as="h2" variant="body">{title}</Text>

               <div>
                <Button
                aria-label="More options"
                className="!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group"
                onClick={()=>{}}
              >
                <ExpandIcon
                  className="text-secondary group-hover:text-primary transition-colors"
                  size={16}
                />
              </Button>
              <Button
                aria-label="More options"
                className="!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group"
                onClick={onClose}
              >
                <CloseIcon
                  className="text-secondary group-hover:text-primary transition-colors"
                  size={16}
                />
              </Button>
              </div>
            </header>
          )}
          <div className={contentClasses}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
