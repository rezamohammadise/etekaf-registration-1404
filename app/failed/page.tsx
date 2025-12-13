'use client';

import { useSearchParams } from 'next/navigation';
import { XCircle, AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function FailedPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    'پرداخت توسط کاربر لغو شد': 'شما پرداخت را لغو کرده‌اید.',
    'مبلغ پرداخت نادرست است': 'مبلغ پرداخت صحیح نمی‌باشد.',
    'تراکنش قبلا تایید شده است': 'این تراکنش قبلاً تأیید شده است.',
    default: 'در فرآیند پرداخت خطایی رخ داده است.',
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* کارت خطا */}
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                پرداخت ناموفق
              </h1>
              <p className="text-gray-600">
                {errorMessage}
              </p>
            </div>

            {/* هشدار */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 ml-3 mt-0.5" />
                <div className="text-right">
                  <h3 className="font-bold text-yellow-800 mb-1">
                    توجه مهم
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    اگر مبلغی از حساب شما کسر شده است، طی ۷۲ ساعت به حساب شما بازمی‌گردد.
                    در غیر این صورت با پشتیبانی تماس بگیرید.
                  </p>
                </div>
              </div>
            </div>

            {/* دلایل احتمالی */}
            <div className="mb-8 text-right">
              <h3 className="font-bold text-gray-900 mb-3">دلایل احتمالی:</h3>
              <ul className="space-y-2 text-gray-600 text-sm list-disc pr-4">
                <li>عدم وجود موجودی کافی در حساب</li>
                <li>مشکل در اتصال به درگاه پرداخت</li>
                <li>لغو پرداخت توسط کاربر</li>
                <li>مشکل در شبکه بانکی</li>
                <li>انقضای زمان پرداخت</li>
              </ul>
            </div>

            {/* راه‌حل‌ها */}
            <div className="mb-8 text-right">
              <h3 className="font-bold text-gray-900 mb-3">راه‌حل‌ها:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <RefreshCw className="w-5 h-5 text-primary-600 ml-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">تلاش مجدد</h4>
                    <p className="text-gray-600 text-sm">
                      می‌توانید دوباره برای پرداخت اقدام کنید
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-primary-600 ml-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">بررسی حساب</h4>
                    <p className="text-gray-600 text-sm">
                      موجودی حساب بانکی خود را بررسی کنید
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 ml-2" />
                تلاش مجدد
              </button>
              <Link
                href="/register"
                className="btn-primary flex-1 flex items-center justify-center"
              >
                بازگشت به فرم ثبت‌نام
              </Link>
            </div>

            {/* دکمه بازگشت به خانه */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <Home className="w-5 h-5 ml-2" />
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}