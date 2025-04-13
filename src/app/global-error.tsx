'use client';

import { routing } from '@/lib/i18n-navigation';
import * as Sentry from '@sentry/nextjs';
import { ThemeProvider } from 'next-themes';
import NextError from 'next/error';
import { useEffect } from 'react';
import '@/styles/globals.css';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextError statusCode={0} />
        </ThemeProvider>
      </body>
    </html>
  );
}
