'use client';

import { ThemeProvider } from 'next-themes';
import NextError from 'next/error';
import { useEffect } from 'react';
import '@/styles/globals.css';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {

  }, [error]);

  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background antialiased"
      >
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
