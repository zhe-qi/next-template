import NotFound404 from '@/components/404';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';

export default async function NotFound() {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background antialiased"
      >
        <div className="relative flex min-h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex-1">
              <MaxWidthWrapper className="mt-20">
                <NotFound404
                  message="抱歉! 页面未找到"
                  link="/"
                  linkText="回到首页"
                  showLogo
                />
              </MaxWidthWrapper>
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
