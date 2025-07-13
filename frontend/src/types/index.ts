import React from 'react';

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

// Component props types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

// Theme types
export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
} 