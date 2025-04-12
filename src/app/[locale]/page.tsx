import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Index() {
  const t = await getTranslations('RootLayout');

  return (
    <div>
      <Link href="/about">{t('title')}</Link>
    </div>
  );
}
