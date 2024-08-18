import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import localfont from 'next/font/local';


const inter = Inter({ subsets: ['latin'] });
const ecoCoding = localfont({
  src:[{
    path : '../public/fonts/eco_coding_wgl_4_bold.ttf',
    weight : '700'
  }],
  variable:'--font-ecoCoding'
})

export const metadata = {
  title: 'byscript',
  description: 'Algorighmic Trading Platform',
};



export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={ecoCoding.variable}>
          <Suspense>
            {/* <Navbar /> */}
            {/* <FloatingNav /> */}
            {children}
          </Suspense>
      </body>
    </html>
  );
}
