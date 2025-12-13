'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'ثبت‌نام', href: '/register' },
    { name: 'داشبورد ادمین', href: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* لوگو */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ع</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">اعتکاف ۱۴۰۴</h1>
                <p className="text-xs text-gray-500">ثبت‌نام آنلاین</p>
              </div>
            </Link>
          </div>

          {/* نویگیشن دسکتاپ */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="btn-primary text-sm">
              <User className="w-4 h-4 ml-2" />
              ورود به حساب
            </button>
          </div>

          {/* دکمه منو موبایل */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* منو موبایل */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="btn-primary mt-4">
                <User className="w-4 h-4 ml-2" />
                ورود به حساب
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}