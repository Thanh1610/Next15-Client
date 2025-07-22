import RegisterForm from '@/app/(auth)/register/register-form';

export const metadata = {
  title: 'Đăng ký tài khoản',
  description: 'Tạo tài khoản mới để bắt đầu sử dụng dịch vụ.',
};

export default function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
