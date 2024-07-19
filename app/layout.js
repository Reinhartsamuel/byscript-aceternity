import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/ui/Navbar';
import { Suspense } from 'react';
import { FloatingNav } from './components/ui/FloatingNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'byscript',
  description: 'Algorighmic Trading Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense>
          {/* <Navbar /> */}
          <FloatingNav />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
