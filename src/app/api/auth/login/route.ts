import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const res = await request.json();

  const access_token = res.token;
  if (!access_token) {
    return NextResponse.json({ message: 'access_token is required' }, { status: 400 });
  }
  cookieStore.set({
    name: 'access_token',
    value: access_token,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 3600,
  });
  return NextResponse.json({ message: 'Token set successfully' });
}
