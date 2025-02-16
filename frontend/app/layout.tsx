import CustomProvider from './CustomProvider';
import type { Metadata } from 'next';
import './globals.css';

import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Kitalfa Token',
  description: 'Mint your own Kitalfa Token',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen dark bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
