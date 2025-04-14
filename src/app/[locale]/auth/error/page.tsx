import Logo from '@/components/logo';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';

import Image from 'next/image';

import Link from 'next/link';

const errorTypes: { [key: string]: { message: string; img?: string } } = {
  AccessDenied: {
    message: '抱歉! 该用户账号已被禁用',
    img: 'calling-help',
  },
  AccessUnauthorized: {
    message: '抱歉! 访问未授权',
    img: 'calling-help',
  },
  TokenExpired: { message: '抱歉! 令牌已过期', img: 'crashed-error' },
  Default: { message: '出错了!', img: 'crashed-error' },
};

type SearchParams = Promise<{ error: string }>;

export default async function Error(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const errorParam: string | null = searchParams.error;
  const errorMessage
    = errorParam && errorTypes[errorParam] ? errorTypes[errorParam] : errorTypes.Default;

  return (
    <MaxWidthWrapper>
      <div className="mt-20 flex flex-col items-center">
        <Logo disableScale />
        <Image
          alt="错误图片"
          src={`/error/${errorMessage?.img}-gray.svg`}
          width={400}
          height={400}
          className="dark:hidden"
          priority
        />
        <Image
          alt="错误图片"
          src={`/error/${errorMessage?.img}-white.svg`}
          width={400}
          height={400}
          className="hidden dark:block"
          priority
        />
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          {errorMessage?.message}
        </h2>
        <Button asChild variant="default" size="sm" className="mt-6">
          <Link href="/">
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
