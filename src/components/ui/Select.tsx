import React from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
  isDark?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, isDark = false, style, ...props }, ref) => (
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
      <select
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: `1px solid ${isDark ? '#2d3748' : '#ccc'}`,
          borderRadius: '0.5rem',
          color: isDark ? '#ffffff' : '#1a202c',
          backgroundColor: isDark ? '#0f1419' : '#ffffff',
          cursor: 'pointer',
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
      >
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

Select.displayName = 'Select';

export { Select };
