import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  isDark?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type = 'text', isDark = false, style, ...props }, ref) => (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: isDark ? '#cbd5e1' : '#4b5563',
          marginBottom: '0.25rem'
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: `1px solid ${isDark ? '#2d3748' : '#ccc'}`,
          borderRadius: '0.5rem',
          color: isDark ? '#ffffff' : '#1a202c',
          backgroundColor: isDark ? '#0f1419' : '#ffffff',
          transition: 'all 0.3s ease',
          fontSize: '0.875rem',
          ...style
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#667eea';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#ccc';
          e.currentTarget.style.boxShadow = 'none';
        }}
        ref={ref}
        {...props}
      />
      {error && (
        <p style={{
          marginTop: '0.25rem',
          fontSize: '0.875rem',
          color: '#dc2626'
        }}>
          {error}
        </p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
