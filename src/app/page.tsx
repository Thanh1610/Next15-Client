import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/login">
      <Button variant="outline">Login</Button>
    </Link>
  );
}
