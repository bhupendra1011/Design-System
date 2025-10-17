"use client";

import { type HTMLAttributes, forwardRef } from 'react';
import React from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  // Content
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  
  // Styling
  className?: string;
}

// Base CSS classes for Badge component
const badgeStructuralClasses = 'inline-flex items-center gap-2 px-2 py-1 text-sm font-normal whitespace-nowrap rounded-md border';
const badgeDefaultStyling = 'bg-[var(--colors-bg-badge)]/25 text-[var(--colors-text-badge-active)] border-[var(--colors-border-badge)]';

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    children,
    leftIcon,
    className = '',
    style,
    ...props 
  }, ref) => {

    return (
      <div
        {...props}
        className={`${badgeStructuralClasses} ${className || badgeDefaultStyling}`}
        ref={ref}
        style={style}
      >
        {Boolean(leftIcon) && (
          <span className="flex items-center text-secondary">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
      </div>
    );
  }
);

Badge.displayName = 'Badge';