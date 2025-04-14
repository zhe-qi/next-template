import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  // 如果没有会话，重定向到登录页面
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          欢迎回来，
          {session.user?.name || '用户'}
        </h1>

        <div className="mb-6 overflow-hidden rounded-lg bg-blue-50 p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-medium text-blue-700">用户信息</h2>
          <div className="space-y-2 text-sm text-blue-600">
            <p>
              <span className="font-medium">用户ID:</span>
              {' '}
              {session.user?.userId}
            </p>
            <p>
              <span className="font-medium">用户名:</span>
              {' '}
              {session.user?.name}
            </p>
            <p>
              <span className="font-medium">状态:</span>
              {' '}
              {session.user?.isActive ? '已激活' : '未激活'}
            </p>
            <p>
              <span className="font-medium">角色:</span>
              {' '}
              {session.user?.role}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            返回首页
          </Link>

          <form action={async () => {
            'use server';
            // 登出操作
            const { signOut } = await import('@/auth');
            await signOut({ redirectTo: '/' });
          }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              登出
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
