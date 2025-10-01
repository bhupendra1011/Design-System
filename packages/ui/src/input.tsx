import { type HTMLAttributes, forwardRef, useState, useId } from 'react';
import React from 'react';

type InputType = 'text' | 'textarea';

export interface InputProps extends Omit<HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange'> {
  // Input behavior
  type?: InputType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  // Labels and text
  label?: string;
  placeholder?: string;
  
  // States
  disabled?: boolean;
  required?: boolean;
  
  // Textarea specific
  rows?: number;
  
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Styling
  className?: string;
}

const baseInputStyles: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--colors-bg-card)',
  border: '1px solid var(--colors-border-card)',
  borderRadius: 'var(--radius-card)',
  padding: 'var(--spacing-gap-medium)',
  fontSize: 'var(--typography-font-size-body)',
  fontWeight: 'var(--typography-font-weight-regular)',
  color: 'var(--colors-text-primary)',
  fontFamily: 'var(--typography-font-family-primary)',
  transition: 'all 0.2s ease',
  outline: 'none',
  resize: 'vertical',
};

const inputContainerStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-gap-small)',
};

const iconStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--colors-text-muted)',
  pointerEvents: 'none',
  zIndex: 1,
};

const leftIconStyles: React.CSSProperties = {
  ...iconStyles,
  left: 'var(--spacing-gap-medium)',
};

const rightIconStyles: React.CSSProperties = {
  ...iconStyles,
  right: 'var(--spacing-gap-medium)',
};

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ 
    type = 'text',
    value,
    onChange,
    label,
    placeholder,
    disabled = false,
    required = false,
    rows = 4,
    leftIcon,
    rightIcon,
    className = '',
    style,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();
    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon);

    // Dynamic styles based on state
    const getInputStyles = (): React.CSSProperties => {
      const styles: React.CSSProperties = {
        ...baseInputStyles,
        ...style,
      };

      // Focus state
      if (isFocused && !disabled) {
        styles.borderColor = 'var(--colors-button-primary)';
        styles.boxShadow = '0 0 0 2px rgba(87, 91, 199, 0.2)';
      }

      // Disabled state
      if (disabled) {
        styles.opacity = 0.5;
        styles.cursor = 'not-allowed';
        styles.backgroundColor = 'var(--colors-bg-card)';
      }

      // Icon padding adjustments
      if (hasLeftIcon) {
        styles.paddingLeft = `calc(var(--spacing-gap-medium) + 16px + var(--spacing-gap-small))`;
      }
      
      if (hasRightIcon) {
        styles.paddingRight = `calc(var(--spacing-gap-medium) + 16px + var(--spacing-gap-small))`;
      }

      return styles;
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    const inputElement = type === 'textarea' ? (
      <textarea
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        aria-describedby={undefined}
        aria-invalid={false}
        aria-required={required}
        className={className}
        disabled={disabled}
        id={inputId}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        required={required}
        rows={rows}
        style={getInputStyles()}
        value={value}
      />
    ) : (
      <input
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        aria-describedby={undefined}
        aria-invalid={false}
        aria-required={required}
        className={className}
        disabled={disabled}
        id={inputId}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLInputElement>}
        required={required}
        style={getInputStyles()}
        type={type}
        value={value}
      />
    );

    return (
      <div style={inputContainerStyles}>
        {/* Label */}
        {Boolean(label) && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 'var(--typography-font-size-body)',
              fontWeight: 'var(--typography-font-weight-medium)',
              fontFamily: 'var(--typography-font-family-primary)',
              color: 'var(--colors-text-muted)',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {label}
            {Boolean(required) && (
              <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
            )}
          </label>
        )}

        {/* Input Container with Icons */}
        <div style={{ position: 'relative' }}>
          {/* Left Icon */}
          {Boolean(hasLeftIcon) && (
            <div style={leftIconStyles}>
              {leftIcon}
            </div>
          )}

          {/* Input Element */}
          {inputElement}

          {/* Right Icon */}
          {Boolean(hasRightIcon) && (
            <div style={rightIconStyles}>
              {rightIcon}
            </div>
          )}
        </div>

      </div>
    );
  }
);

Input.displayName = 'Input';