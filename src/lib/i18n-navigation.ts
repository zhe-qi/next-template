import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'] as Array<string>,
  localePrefix: 'as-needed',
  defaultLocale: 'zh' as string,
});

export const { usePathname, useRouter } = createNavigation(routing);
