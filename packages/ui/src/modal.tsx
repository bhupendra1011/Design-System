"use client";

import { type HTMLAttributes, forwardRef, useEffect, useRef } from "react";
import React from "react";
import { CloseIcon, ExpandIcon } from "@repo/icons";
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

    // Focus management and focus trapping
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

        // Focus trap functionality
        const handleTabKey = (event: KeyboardEvent): void => {
          if (event.key !== 'Tab' || !modalRef.current) return;

          // Enhanced selector to catch all focusable elements (including disabled buttons for a11y)
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), div[onclick], div[role="button"], [role="button"], summary, [contenteditable="true"]'
          );
          
          // Filter for visible and truly focusable elements
          const visibleFocusableElements = Array.from(focusableElements).filter((element) => {
            const htmlElement = element as HTMLElement;
            
            // Basic visibility checks
            const isVisible = htmlElement.offsetParent !== null && 
                             !htmlElement.hidden && 
                             htmlElement.style.display !== 'none' &&
                             htmlElement.style.visibility !== 'hidden';
            
            if (!isVisible) return false;
            
            // Check if element has actual size
            const rect = htmlElement.getBoundingClientRect();
            const hasSize = rect.width > 0 && rect.height > 0;
            
            // Don't exclude disabled buttons from focus trap (they should still be focusable for a11y)
            // Only exclude elements that are truly not focusable
            const isNotFocusable = htmlElement.style.pointerEvents === 'none' ||
                                  htmlElement.classList.contains('pointer-events-none') ||
                                  (htmlElement.hasAttribute('tabindex') && htmlElement.getAttribute('tabindex') === '-1');
            
            return hasSize && !isNotFocusable;
          });
          
          if (visibleFocusableElements.length === 0) return;
          
          const firstElement = visibleFocusableElements[0] as HTMLElement;
          const lastElement = visibleFocusableElements[visibleFocusableElements.length - 1] as HTMLElement;

          if (event.shiftKey) {
            // Shift + Tab - moving backwards
            if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
              event.preventDefault();
              lastElement.focus();
            }
            return;
          }
          
          // Tab - moving forwards
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
            event.preventDefault();
            firstElement.focus();
          }
        };

        document.addEventListener('keydown', handleTabKey);
        
        return () => {
          document.removeEventListener('keydown', handleTabKey);
        };
      }
      
      // Restore focus and body scroll when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      document.body.style.overflow = "";

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
                onClick={() => { /* TODO: implement expand functionality */ }}
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
