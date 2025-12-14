'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

// محتوای اصلی
function FailedContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || null;
  
  const errorMessages: { [key: string]: string } = {
    'پرداخت توسط کاربر لغو شد': 'شما پرداخت را لغو کرده‌اید.',
    'پرداخت ناموفق بود': 'تراکنش با خطا مواجه شد.',
    'زمان پرداخت به پایان رسید': 'زمان مجاز برای پرداخت به پایان رسیده است.',
    'مبلغ پرداخت نادرست است': 'مبلغ وارد شده با مبلغ قابل پرداخت مطابقت ندارد.',
    'خطای سیستمی': 'خطایی در سیستم پرداخت رخ داده است.',
  };

  const errorTitle = error && errorMessages[error] ? error : 'پرداخت ناموفق بود';
  const errorDescription = error && errorMessages[error] 
    ? errorMessages[error] 
    : 'متأسفانه پرداخت شما با مشکل مواجه شد. لطفاً مجدداً تلاش کنید.';

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {errorTitle}
              </h1>
              <p className="text-gray-600">
                {errorDescription}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 ml-2 mt-1" />
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 mb-2">توصیه‌های بعدی:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm list-disc pr-6">
                    <li>اطلاعات کارت بانکی خود را بررسی کنید</li>
                    <li>از داشتن موجودی کافی اطمینان حاصل کنید</li>
                    <li>در صورت کسر مبلغ از حساب، تا ۷۲ ساعت صبر کنید</li>
                    <li>برای پیگیری با پشتیبانی تماس بگیرید</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 ml-2" />
                تلاش مجدد
              </button>
              <Link
                href="/"
                className="btn-primary flex-1 flex items-center justify-center"
              >
                <Home className="w-5 h-5 ml-2" />
                بازگشت به خانه
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p>در صورت بروز مشکل با شماره پشتیبانی: ۰۹۱۲XXXXXXX تماس بگیرید</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// صفحه اصلی با Suspense
export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
      <FailedContent />
    </Suspense>
  );
}
