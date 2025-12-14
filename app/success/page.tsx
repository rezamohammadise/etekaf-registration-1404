'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';

// محتوای اصلی صفحه
function SuccessContent() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams?.get('trackingCode') || null;
  const refId = searchParams?.get('refId') || null;
  const [printContent, setPrintContent] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (trackingCode) {
      setPrintContent(`
        <div dir="rtl">
          <h1>رسید پرداخت موفق</h1>
          <p>کد رهگیری: ${trackingCode}</p>
          <p>شماره پیگیری: ${refId || '---'}</p>
          <p>تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
        </div>
      `);
    }
  }, [trackingCode, refId]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'رسید پرداخت اعتکاف',
          text: `کد رهگیری من: ${trackingCode}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('خطا در اشتراک‌گذاری:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* کارت موفقیت */}
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                پرداخت موفق
              </h1>
              <p className="text-gray-600">
                ثبت‌نام شما با موفقیت انجام شد
              </p>
            </div>

            {/* اطلاعات پرداخت */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">کد رهگیری:</span>
                  <span className="font-bold text-lg text-gray-900">
                    {trackingCode || '---'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">شماره پیگیری:</span>
                  <span className="font-bold text-lg text-green-600">
                    {refId || '---'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاریخ پرداخت:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className="badge badge-success">پرداخت موفق</span>
                </div>
              </div>
            </div>

            {/* راهنما */}
            <div className="mb-8 text-right">
              <h3 className="font-bold text-gray-900 mb-3">نکات مهم:</h3>
              <ul className="space-y-2 text-gray-600 text-sm list-disc pr-4">
                <li>کد رهگیری را در محل برگزاری اعتکاف ارائه دهید</li>
                <li>این رسید را نزد خود نگه دارید</li>
                <li>برای هرگونه سوال با پشتیبانی تماس بگیرید</li>
                <li>حضور در محل اعتکاف ۳۰ دقیقه قبل از شروع الزامی است</li>
              </ul>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePrint}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <Printer className="w-5 h-5 ml-2" />
                چاپ رسید
              </button>
              <button
                onClick={handleShare}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <Share2 className="w-5 h-5 ml-2" />
                اشتراک‌گذاری
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <Download className="w-5 h-5 ml-2" />
                ذخیره PDF
              </button>
            </div>

            {/* دکمه بازگشت */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="btn-primary inline-block w-full sm:w-auto"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// صفحه اصلی با Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
