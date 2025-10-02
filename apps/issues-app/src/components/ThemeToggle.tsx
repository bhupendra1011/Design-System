'use client';

import { Button } from '@pd/ui/button';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleTheme}
        className="rounded-full border-0 focus:ring-0 focus:outline-none !bg-transparent !hover:bg-transparent cursor-pointer "
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
       
      >
        <span className="text-lg filter drop-shadow-sm" role="img" aria-hidden="true">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
      </Button>
    </div>
  );
}