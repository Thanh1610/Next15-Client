import { routes } from '@/config/routes';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const publicPath = ['/login', '/register'];
const privatePath = ['/profile'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;

  if (privatePath.includes(pathname) && !token) {
    // Nếu chưa login mà vào profile → redirect về login
    return NextResponse.redirect(new URL(routes.login.path, request.url));
  }

  if (publicPath.includes(pathname) && token) {
    // Nếu đã đăng nhập mà cố vào trang login/register → redirect về not-found
    return NextResponse.redirect(new URL(routes.notfound.path, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/profile'],
};
