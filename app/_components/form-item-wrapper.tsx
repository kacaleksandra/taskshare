import { cn } from '@/utils/cn-helper';
import type { ReactNode } from 'react';

import { FormControl, FormItem, FormLabel, FormMessage } from './form';

export const FormItemWrapper = ({
  label,
  children,
  className,
}: {
  label?: string | ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <FormItem className={cn('text-left', className)}>
    {label && <FormLabel className='text-start'>{label}</FormLabel>}
    <FormControl>{children}</FormControl>
    <FormMessage />
  </FormItem>
);
