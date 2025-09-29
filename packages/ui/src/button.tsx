import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  leftIcon?: React.ReactElement;
}

export function Button({ children, className, leftIcon, ...other }: ButtonProps): React.JSX.Element {
  return (
    <button 
      type="button" 
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className || ''}`}
      {...other}
    >
      {leftIcon}
      {children}
    </button>
  );
}

Button.displayName = "Button";
