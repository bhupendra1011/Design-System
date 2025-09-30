import { type HTMLAttributes, forwardRef, createElement } from 'react';
import type React from 'react';

type TextVariant = 'title' | 'body' | 'small' | 'label' | 'placeholder';
type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, React.CSSProperties> = {
  title: {
    fontSize: 'var(--typography-font-size-title)',
    fontWeight: 'var(--typography-font-weight-medium)',
    fontFamily: 'var(--typography-font-family-primary)'
  },
  body: {
    fontSize: 'var(--typography-font-size-body)',
    fontWeight: 'var(--typography-font-weight-regular)', 
    fontFamily: 'var(--typography-font-family-primary)'
  },
  small: {
    fontSize: 'var(--typography-font-size-small)',
    fontWeight: 'var(--typography-font-weight-regular)',
    fontFamily: 'var(--typography-font-family-primary)'
  },
  label: {
    fontSize: 'var(--typography-font-size-body)',
    fontWeight: 'var(--typography-font-weight-medium)',
    fontFamily: 'var(--typography-font-family-primary)'
  },
  placeholder: {
    fontSize: 'var(--typography-font-size-body)',
    fontWeight: 'var(--typography-font-weight-regular)',
    fontFamily: 'var(--typography-font-family-primary)'
  }
};

const variantColors: Record<TextVariant, string> = {
  title: 'var(--colors-text-primary)',
  body: 'var(--colors-text-secondary)',
  small: 'var(--colors-text-muted)', 
  label: 'var(--colors-text-muted)',
  placeholder: 'var(--colors-text-placeholder)'
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', variant = 'body', children, className = '', style, ...props }, ref) => {
    const variantStyleProps = variantStyles[variant];
    const defaultColor = variantColors[variant];
    
    // Check if className contains text color classes
    const hasCustomColor = className && /text-[\w-]+/.test(className);
    
    // Combine variant styles with user styles and default color
    const combinedStyle = {
      ...variantStyleProps,
      color: hasCustomColor ? undefined : defaultColor,
      ...style
    };

    return createElement(
      Component,
      {
        ref,
        className,
        style: combinedStyle,
        ...props
      },
      children
    );
  }
);

Text.displayName = 'Text';