import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900',
        primary: 'bg-blue-100 text-blue-900',
        success: 'bg-green-100 text-green-900',
        warning: 'bg-yellow-100 text-yellow-900',
        error: 'bg-red-100 text-red-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      className={clsx(badgeVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
