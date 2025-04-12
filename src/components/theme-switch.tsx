'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggler() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleClick = () => {
    // 使用 resolvedTheme 来判断当前实际的主题状态
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      className="cursor-default"
      variant="outline"
      size="icon"
      aria-label="切换主题"
      role="switch"
      aria-checked="false"
      onClick={handleClick}
    >
      <Sun
        className="rotate-0 scale-100 transition-transform duration-300 ease-in-out dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute rotate-90 scale-0 transition-transform duration-300 ease-in-out dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">切换主题模式</span>
    </Button>
  );
}
