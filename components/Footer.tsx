export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* درباره ما */}
          <div>
            <h3 className="text-lg font-bold mb-4">درباره اعتکاف</h3>
            <p className="text-gray-400 leading-relaxed">
              اعتکاف فرصتی است برای خلوت با خداوند و بازگشت به خویشتن. این سیستم برای تسهیل ثبت‌نام اعتکاف سال ۱۴۰۴ طراحی شده است.
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-bold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <a href="/register" className="text-gray-400 hover:text-white transition-colors">
                  فرم ثبت‌نام
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  داشبورد ادمین
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  شرایط و ضوابط
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  سوالات متداول
                </a>
              </li>
            </ul>
          </div>

          {/* تماس با ما */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-2 text-gray-400">
              <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li>ایمیل: info@etekaf1404.ir</li>
              <li>ساعات کاری: ۸:۰۰ تا ۱۶:۰۰</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} - کلیه حقوق این وب‌سایت محفوظ است.</p>
          <p className="mt-2">ساخته شده با ❤️ برای اعتکاف ۱۴۰۴</p>
        </div>
      </div>
    </footer>
  );
}