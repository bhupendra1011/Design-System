// Type definitions for design tokens
export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  radius: Record<string, string>;
  shadows: Record<string, string>;
}

// Token categories for type safety
export type ColorToken = 
  | 'bg-app' | 'bg-modal' | 'bg-card' | 'bg-badge'
  | 'text-primary' | 'text-secondary' | 'text-tertiary'
  | 'button-primary' | 'button-text';

export type SpacingToken = 'gap-tiny' | 'gap-small' | 'gap-medium' | 'gap-large' | 'gap-section';

export type TypographyToken = 
  | 'font-family-primary' | 'font-family-secondary'
  | 'font-size-title' | 'font-size-body' | 'font-size-small'
  | 'font-weight-regular' | 'font-weight-medium';