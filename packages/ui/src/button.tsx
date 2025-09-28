export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...other }: ButtonProps): JSX.Element {
  return (
    <button 
      type="button" 
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className || ''}`}
      {...other}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";
