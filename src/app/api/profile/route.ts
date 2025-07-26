import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const GET = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;

  const JWT_SECRET = process.env.JWT_SECRET || '';

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
};
