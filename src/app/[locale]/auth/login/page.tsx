'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodError } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// 登录用户的mutation函数
const loginUser = async (credentials: { username: string; password: string }) => {
  const result = await signIn('credentials', {
    username: credentials.username,
    password: credentials.password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error('用户名或密码错误');
  }

  return result;
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const registered = searchParams.get('registered');

  useEffect(() => {
    // FIXME: https://github.com/react-hook-form/resolvers/issues/768 等修复，暂时的解决方案
    Object.defineProperty(ZodError.prototype, 'errors', {
      get() {
        return this.issues;
      },
      enumerable: true,
      configurable: true,
    });
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 检查是否有注册成功的参数，仅在useEffect中处理
  useEffect(() => {
    if (registered === 'true') {
      toast.success('注册成功，请登录');
    }
  }, [registered]);

  // 使用useMutation钩子
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('登录成功');
      router.push(callbackUrl);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '用户名或密码错误');
    },
  });

  function onSubmit(data: LoginFormValues) {
    mutate({
      username: data.username,
      password: data.password,
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">登录您的账户</CardTitle>
          <CardDescription className="text-center">
            输入您的凭据继续使用应用
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="输入用户名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="输入密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? '登录中...' : '登录'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            没有账户？
            {' '}
            <Button variant="link" className="p-0" onClick={() => router.push('/auth/register')}>
              注册新账户
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
