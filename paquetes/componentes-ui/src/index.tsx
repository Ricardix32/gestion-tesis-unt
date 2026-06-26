import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    // Provee clases por defecto y permite override mediante Tailwind o Vanilla CSS
    const defaultClasses = variant === 'primary'
      ? 'px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition'
      : 'px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition';

    return (
      <button
        ref={ref}
        className={`${defaultClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
