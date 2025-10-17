"use client";

import { type HTMLAttributes, forwardRef } from 'react';
import React from 'react';
import { Text } from './text';

type CardVariant = 'default' | 'selected' | 'dragging';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  // Content
  title: string;
  children?: React.ReactNode;
  
  // Layout slots
  bottomIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Styling
  variant?: CardVariant;
  className?: string;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--colors-bg-card)',
    border: '1px solid var(--colors-border-card)',
    boxShadow: 'var(--shadow-card, 0 1px 3px rgba(0, 0, 0, 0.1))'
  },
  selected: {
    backgroundColor: 'var(--colors-bg-card)',
    border: '1px solid var(--colors-button-primary)',
    boxShadow: '0 0 0 2px rgba(87, 91, 199, 0.2)'
  },
  dragging: {
    backgroundColor: 'var(--colors-bg-card)',
    border: '1px solid var(--colors-border-card)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    opacity: 0.8,
    transform: 'rotate(2deg)'
  }
};

const baseCardStyles: React.CSSProperties = {
  borderRadius: 'var(--radius-card)',
  padding: 'var(--spacing-gap-large, 12px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-gap-small, 4px)',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: 'var(--typography-font-family-primary)'
};


const contentStyles: React.CSSProperties = {
  flex: 1,
  fontSize: 'var(--typography-font-size-small)',
  fontWeight: 'var(--typography-font-weight-regular)',
  color: 'var(--colors-text-primary)',
  lineHeight: 1.4
};

const footerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'var(--spacing-gap-small, 4px)'
};

const rightIconStyles: React.CSSProperties = {
  position: 'absolute',
  top: 'var(--spacing-gap-large, 12px)',
  right: 'var(--spacing-gap-large, 12px)'
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    title, 
    children, 
    bottomIcon, 
    rightIcon, 
    variant = 'default', 
    className = '', 
    style, 
    onClick,
    ...props 
  }, ref) => {
    const variantStyleProps = variantStyles[variant];
    
    const combinedStyle = {
      ...baseCardStyles,
      ...variantStyleProps,
      ...style
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        {...props}
        className={className}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        role={onClick ? 'button' : 'article'}
        style={combinedStyle}
        tabIndex={onClick ? 0 : undefined}
      >
        {/* Title */}
        <Text 
          style={{ marginBottom: 'var(--spacing-gap-small, 4px)' }}
          variant="body"
        >
          {title}
        </Text>


        {/* Main Content */}
        {children ? (
          <div style={contentStyles}>
            {children}
          </div>
        ) : null}

        {/* Bottom Icon */}
        {bottomIcon ? (
          <div style={footerStyles}>
            <div>
              {bottomIcon}
            </div>
            <div /> {/* Spacer for alignment */}
          </div>
        ) : null}

        {/* Right Icon */}
        {rightIcon ? (
          <div style={rightIconStyles}>
            {rightIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

Card.displayName = 'Card';