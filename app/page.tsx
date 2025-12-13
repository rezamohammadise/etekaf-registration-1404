import Link from 'next/link';
import { Calendar, Users, Shield, CreditCard } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-primary-600" />,
      title: 'ثبت‌نام آنلاین',
      description: 'ثبت‌نام سریع و آسان به صورت کاملاً آنلاین',
    },
    {
      icon: <Shield className="w-12 h-12 text-primary-600" />,
      title: 'اطمینان و امنیت',
      description: 'اطلاعات شما با بالاترین سطح امنیت ذخیره می‌شود',
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary-600" />,
      title: 'پرداخت امن',
      description: 'پرداخت آنلاین از طریق درگاه معتبر زرین‌پال',
    },
    {
      icon: <Users className="w-12 h-12 text-primary-600" />,
      title: 'پشتیبانی',
      description: 'پشتیبانی ۲۴ ساعته برای پاسخگویی به سوالات شما',
    },
  ];

  const steps = [
    {
      number: '۱',
      title: 'تکمیل فرم',
      description: 'فرم ثبت‌نام را با دقت تکمیل کنید',
    },
    {
      number: '۲',
      title: 'انتخاب مسجد',
      description: 'مسجد مورد نظر خود را انتخاب نمایید',
    },
    {
      number: '۳',
      title: 'پرداخت هزینه',
      description: 'هزینه ثبت‌نام را به صورت آنلاین پرداخت کنید',
    },
    {
      number: '۴',
      title: 'دریافت کد رهگیری',
      description: 'کد رهگیری منحصر به فرد خود را دریافت کنید',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            اعتکاف ۱۴۰۴
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            فرصتی برای خلوت با معبود و بازگشت به خویشتن
          </p>
          <p className="text-lg mb-12 text-primary-200 max-w-2xl mx-auto">
            ثبت‌نام آنلاین اعتکاف سال ۱۴۰۴ به صورت کاملاً الکترونیکی و امن
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              شروع ثبت‌نام
            </Link>
            <Link
              href="#features"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200"
            >
              بیشتر بدانید
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            چرا ثبت‌نام آنلاین؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            مراحل ثبت‌نام
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="card text-center relative z-10">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            آماده ثبت‌نام هستید؟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            همین حالا ثبت‌نام کنید و در اعتکاف ۱۴۰۴ شرکت نمایید
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-12 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            شروع ثبت‌نام
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              شرایط شرکت در اعتکاف
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4 text-right">
              <p>• داشتن حداقل ۱۵ سال سن</p>
              <p>• ارائه کارت ملی معتبر</p>
              <p>• تعهد به رعایت مقررات اعتکاف</p>
              <p>• پرداخت هزینه ثبت‌نام در زمان مقرر</p>
              <p>• حضور به موقع در محل برگزاری</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}