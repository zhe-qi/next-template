import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeIcon, LogOutIcon } from 'lucide-react';
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">
            欢迎回来，
            {session.user?.name || '用户'}
          </CardTitle>
          <CardDescription>
            您的个人仪表盘
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">用户信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">用户ID:</span>
                  <span className="font-medium">{session.user?.userId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">用户名:</span>
                  <span className="font-medium">{session.user?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">状态:</span>
                  <Badge
                    variant={session.user?.isActive ? 'default' : 'destructive'}
                    className={session.user?.isActive ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {session.user?.isActive ? '已激活' : '未激活'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">角色:</span>
                  <Badge variant={session.user?.role === 'admin' ? 'default' : 'secondary'}>
                    {session.user?.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">系统概览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">上次登录:</span>
                  <span className="font-medium">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">会话状态:</span>
                  <Badge variant="outline">活跃</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>

          <form action={async () => {
            'use server';
            // 登出操作
            const { signOut } = await import('@/auth');
            await signOut({ redirectTo: '/' });
          }}
          >
            <Button variant="destructive" size="sm" type="submit">
              <LogOutIcon className="mr-2 h-4 w-4" />
              登出
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
