import './globals.css'
import { Rubik } from 'next/font/google';
import GlobalProvider from '@/context/GlobalContext';

const fonts = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Dindin',
  description: 'Perfect for your money',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <link rel="icon" href="/fav-ico.png" />
      <body className={fonts.className}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
        </body>
    </html>
  )
}
