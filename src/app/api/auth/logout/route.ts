import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'access_token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
