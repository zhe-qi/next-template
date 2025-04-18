import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';
import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'next启动模板',
  description: 'next启动模板',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background antialiased',
        geistSans.className,
        geistMono.className,
      )}
      >
        <CounterStoreProvider>
          <Providers locale={locale} messages={messages}>
            {children}
            <Toaster closeButton />
          </Providers>
        </CounterStoreProvider>
      </body>
    </html>
  );
}
