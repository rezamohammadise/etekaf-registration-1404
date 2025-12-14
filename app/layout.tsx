import type { Metadata } from 'next'
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial']
});
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'ثبت‌نام اعتکاف ۱۴۰۴',
  description: 'سیستم ثبت‌نام و پرداخت اینترنتی اعتکاف',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer rtl position="top-center" />
      </body>
    </html>
  )
}

