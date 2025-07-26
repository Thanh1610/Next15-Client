import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import { getUser } from '@/lib/getUser';

export const metadata = {
  title: 'Trang cá nhân',
  description: 'Trang cá nhân của bạn.',
};

export default async function ProfilePage() {
  const user = await getUser();

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
