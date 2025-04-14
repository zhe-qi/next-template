import type { NextFetchEvent, NextRequest } from 'next/server';
import { authConfig } from '@/auth.config';
import { routing } from '@/lib/i18n-navigation';
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

const protectedPages = ['/dashboard/*'];
const authPages = ['/auth/login', '/auth/register', '/auth/error'];

const intlMiddleware = createMiddleware(routing);

const testPagesRegex = (pages: string[], pathname: string) => {
  const regex = `^(/(${routing.locales.join('|')}))?(${pages
    .map(p => p.replace('/*', '.*'))
    .join('|')})/?$`;
  return new RegExp(regex, 'i').test(pathname);
};

const handleAuth = async (
  req: NextRequest,
  isAuthPage: boolean,
  isProtectedPage: boolean,
) => {
  const session = await auth();
  const isAuth = !!session?.user;

  // 用户已登录但访问登录页面，重定向到仪表盘
  if (isAuth && isAuthPage) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 用户未登录但访问受保护页面，重定向到登录页
  if (!isAuth && isProtectedPage) {
    const redirectUrl = new URL('/auth/login', req.url);
    // 添加回调URL，以便登录后可以重定向回来
    redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 其他情况使用国际化中间件
  return intlMiddleware(req);
};

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  // 提取请求的URL路径
  const path = request.nextUrl.pathname;

  // 允许直接访问sitemap.xml和robots.txt，不通过i18n中间件处理
  // 这确保这些文件能够被正确地提供给SEO目的
  if (path === '/sitemap.xml' || path === '/robots.txt') {
    return NextResponse.next();
  }

  const isAuthPage = testPagesRegex(authPages, path);
  const isProtectedPage = testPagesRegex(protectedPages, path);

  return handleAuth(request, isAuthPage, isProtectedPage);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
