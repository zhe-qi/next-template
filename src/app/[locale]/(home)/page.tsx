import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage() {
  const t = await getTranslations('RootLayout');
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-3xl">{t('title')}</CardTitle>
            <CardDescription className="text-center">
              使用Next.js和Next Auth v5构建的认证示例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isAuthenticated
              ? (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-green-50 p-4 text-center text-green-700 dark:bg-green-900/20 dark:text-green-300">
                      您已登录为:
                      {' '}
                      <span className="font-semibold">{session.user.name}</span>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <Button asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          进入仪表盘
                        </Link>
                      </Button>

                      <form
                        action={async () => {
                          'use server';
                          const { signOut } = await import('@/auth');
                          await signOut({ redirectTo: '/' });
                        }}
                      >
                        <Button variant="outline" className="w-full" type="submit">
                          <LogOut className="mr-2 h-4 w-4" />
                          登出
                        </Button>
                      </form>
                    </div>
                  </div>
                )
              : (
                  <div className="flex flex-col space-y-4">
                    <Button asChild>
                      <Link href="/auth/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        登录
                      </Link>
                    </Button>

                    <Button variant="outline" asChild>
                      <Link href="/auth/register">
                        <UserPlus className="mr-2 h-4 w-4" />
                        注册新账户
                      </Link>
                    </Button>
                  </div>
                )}
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">
              这是一个使用Next.js和Next Auth v5构建的示例应用程序，展示了如何实现用户名和密码认证。
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
