import React from 'react';
import clsx from 'clsx';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white p-6',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card };
