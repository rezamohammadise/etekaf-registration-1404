export const provinces = [
  { id: 1, name: 'اصفهان' },
  { id: 2, name: 'تهران' },
  { id: 3, name: 'فارس' },
  // ... سایر استان‌ها
];

export const cities = [
  // شهرستان‌های اصفهان
  { id: 1, provinceId: 1, name: 'سمیرم' },
  { id: 2, provinceId: 1, name: 'اصفهان' },
  { id: 3, provinceId: 1, name: 'شهرضا' },
  { id: 4, provinceId: 1, name: 'کاشان' },
  // شهرستان‌های تهران
  { id: 5, provinceId: 2, name: 'تهران' },
  { id: 6, provinceId: 2, name: 'شهریار' },
  // ...
];

export const mosques = [
  // مساجد سمیرم
  { id: 1, cityId: 1, name: 'مسجد فاطمه زهرا (س) - شهرک آبشار' },
  { id: 2, cityId: 1, name: 'مسجد امام حسین (ع)' },
  // مساجد سایر شهرها...
];
