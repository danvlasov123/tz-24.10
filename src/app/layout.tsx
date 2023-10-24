import './globals.css';
import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { StoreProvider, AuthProvider } from 'src/Providers';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Title',
    template: '%s | Desctiption',
  },
  robots: {
    follow: true,
    index: true,
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable} h-full`}>
      <body className='h-full bg-white text-gray-900'>
        <StoreProvider>
          <AuthProvider>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
