import React from 'react';

// Platform-specific imports
export interface MaterialButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

// This will be implemented differently for each platform
export const MaterialButton: React.FC<MaterialButtonProps> = ({ title }) => {
  return <div>{title}</div>; // Fallback implementation
};