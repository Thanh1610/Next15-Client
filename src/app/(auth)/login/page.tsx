import LoginForm from '@/app/(auth)/login/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập tài khoản',
  description:
    'Sign in to your account to continue shopping, track your orders, and access exclusive offers.',
};

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
