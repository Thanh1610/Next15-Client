import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import { getUser } from '@/services/userServices';
import { getAuthCookie } from '@/lib/getAuthCookie';

export const metadata = {
  title: 'Trang cá nhân',
  description: 'Trang cá nhân của bạn.',
};

export default async function ProfilePage() {
  const token = await getAuthCookie();
  if (!token) return null;

  const user = await getUser(token);
  if (!user)
    return (
      <div>
        <LoadingOverlay />
      </div>
    );

  return (
    <div>
      <h1>👤 Thông tin người dùng</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
