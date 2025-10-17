"use client";

import React, { type ButtonHTMLAttributes } from "react";

type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  leftIcon?: React.ReactElement;
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: 'text-button-text hover:opacity-90 border',
  outline: 'bg-transparent border hover:bg-card',
};

export function Button({ children, className, leftIcon, variant = 'primary', disabled, ...other }: ButtonProps): React.JSX.Element {
  const baseStyles = 'inline-flex items-center gap-2 px-2 py-2 rounded focus:outline-none transition-all duration-200';
  const variantClass = variantStyles[variant];
  
  // Disabled styles - don't use pointer-events-none as it breaks focus trap accessibility
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  // Dynamic styles based on variant
  const dynamicStyles = {
    backgroundColor: variant === 'primary' ? 'var(--colors-button-primary)' : 'transparent',
    borderColor: variant === 'primary' ? 'var(--colors-button-primary)' : 'var(--colors-border-card)',
    color: variant === 'primary' ? 'var(--colors-button-text)' : 'var(--colors-text-primary)',
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantClass} ${disabledStyles} ${className || ''}`} 
      disabled={disabled}
      style={dynamicStyles}
      type="button"
      {...other}
    >
      {leftIcon}
      {children}
    </button>
  );
}

Button.displayName = "Button";
