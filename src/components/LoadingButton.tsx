import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

export default function LoadingButton({
  isLoading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || props.disabled} className={clsx(className)} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
