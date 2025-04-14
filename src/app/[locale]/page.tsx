import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage() {
  const t = await getTranslations('RootLayout');
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        </div>

        {isAuthenticated
          ? (
              <div className="space-y-6">
                <div className="rounded-lg bg-green-50 p-4 text-center text-green-700">
                  您已登录为:
                  {' '}
                  {session.user.name}
                </div>

                <div className="flex flex-col space-y-3">
                  <Link
                    href="/dashboard"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    进入仪表盘
                  </Link>

                  <form action={async () => {
                    'use server';
                    const { signOut } = await import('@/auth');
                    await signOut({ redirectTo: '/' });
                  }}
                  >
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      登出
                    </button>
                  </form>
                </div>
              </div>
            )
          : (
              <div className="flex flex-col space-y-4">
                <Link
                  href="/auth/login"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  登录
                </Link>

                <Link
                  href="/auth/register"
                  className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  注册新账户
                </Link>
              </div>
            )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            这是一个使用Next.js和Next Auth v5构建的示例应用程序，展示了如何实现用户名和密码认证。
          </p>
        </div>
      </div>
    </div>
  );
}
