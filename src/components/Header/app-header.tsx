'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { logoutApi } from '@/repositories/authRepository';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const handleLogoutClick = async () => {
    try {
      await logoutApi();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="shadow-md dark:shadow dark:shadow-white/10">
      <div className="container my-0 mx-auto flex items-center justify-between h-16">
        <ModeToggle />
        <div className="flex gap-2">
          <Link href={routes.login.path}>
            <Button variant="outline">Login</Button>
          </Link>
          <Link href={routes.register.path}>
            <Button variant="outline">Register</Button>
          </Link>
          <Link href={routes.profile.path}>
            <Button variant="outline">Profile</Button>
          </Link>
          <Button onClick={handleLogoutClick} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
