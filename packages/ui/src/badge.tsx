import { type HTMLAttributes, forwardRef } from 'react';
import React from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  // Content
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  
  // Styling
  className?: string;
}

// Base CSS classes for Badge component
const badgeStructuralClasses = 'inline-flex items-center gap-2 px-2 py-1 text-sm font-normal whitespace-nowrap rounded-md border';
const badgeDefaultStyling = 'bg-[var(--colors-text-badge-inactive)] text-[var(--colors-bg-app)] border-[var(--colors-border-badge)]';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    children,
    leftIcon,
    className = '',
    style,
    ...props 
  }, ref) => {

    return (
      <span
        {...props}
        className={`${badgeStructuralClasses} ${className || badgeDefaultStyling}`}
        ref={ref}
        style={style}
      >
        {Boolean(leftIcon) && (
          <span className="flex items-center">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';