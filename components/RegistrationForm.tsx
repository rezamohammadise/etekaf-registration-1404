'use client';

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Calendar, User, Phone, Hash, MapPin, Utensils } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { RegistrationFormData } from '@/app/register/page';

interface RegistrationFormProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

// فقط استان اصفهان
const provinces = [
  { id: 1, name: 'اصفهان' }
];

// فقط شهرستان سمیرم
const citiesByProvince: { [key: number]: { id: number; name: string }[] } = {
  1: [ // اصفهان
    { id: 101, name: 'سمیرم' }
  ]
};

// فقط مساجد سمیرم
const mosquesByCity: { [key: number]: string[] } = {
  101: [ // سمیرم
    'مسجد فاطمه زهرا (س) - شهرک آبشار'
  ]
};

// گزینه‌های غذا
const foodOptions = [
  'جوجه کباب',
  'چلو کباب', 
  'چلو خورشت قیمه',
  'چلو خورشت سبزی'
];

export default function RegistrationForm({
  register,
  errors,
  watch,
  setValue,
  onSubmit,
  isSubmitting,
}: RegistrationFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableMosques, setAvailableMosques] = useState<string[]>(mosquesByCity[101]);

  const selectedCity = watch('city');
  const selectedMosque = watch('mosque');

  // مقدار پیش‌فرض برای استان و شهر
  useEffect(() => {
    setValue('province', 'اصفهان');
    setValue('city', 'سمیرم');
    setValue('mosque', 'مسجد فاطمه زهرا (س) - شهرک آبشار');
  }, [setValue]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setValue('birthDate', date.toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* اطلاعات شخصی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نام */}
        <div>
          <label className="label">
            <User className="inline w-4 h-4 ml-1" />
            نام
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="نام خود را وارد کنید"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        {/* نام خانوادگی */}
        <div>
          <label className="label">
            نام خانوادگی
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="نام خانوادگی خود را وارد کنید"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        {/* کد ملی */}
        <div>
          <label className="label">
            <Hash className="inline w-4 h-4 ml-1" />
            کد ملی
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="۰۱۲۳۴۵۶۷۸۹"
            maxLength={10}
            {...register('nationalCode')}
          />
          {errors.nationalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.nationalCode.message}</p>
          )}
        </div>

        {/* شماره موبایل */}
        <div>
          <label className="label">
            <Phone className="inline w-4 h-4 ml-1" />
            شماره موبایل
          </label>
          <input
            type="tel"
            className="input-field"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            maxLength={11}
            {...register('mobile')}
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
          )}
        </div>

        {/* جنسیت */}
        <div>
          <label className="label">جنسیت</label>
          <select
            className="input-field"
            {...register('gender')}
            defaultValue=""
          >
            <option value="" disabled>انتخاب کنید</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {/* تاریخ تولد */}
        <div>
          <label className="label">
            <Calendar className="inline w-4 h-4 ml-1" />
            تاریخ تولد
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="۱۳۷۰/۰۱/۰۱"
            className="input-field w-full"
            showYearDropdown
            yearDropdownItemNumber={50}
            scrollableYearDropdown
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>

        {/* استان (غیرقابل تغییر) */}
        <div>
          <label className="label">
            <MapPin className="inline w-4 h-4 ml-1" />
            استان
          </label>
          <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">اصفهان</span>
              <span className="text-green-600">✔</span>
            </div>
          </div>
          <input type="hidden" {...register('province')} value="اصفهان" />
        </div>

        {/* شهرستان (غیرقابل تغییر) */}
        <div>
          <label className="label">شهرستان</label>
          <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">سمیرم</span>
              <span className="text-green-600">✔</span>
            </div>
          </div>
          <input type="hidden" {...register('city')} value="سمیرم" />
        </div>

        {/* مسجد (غیرقابل تغییر) */}
        <div>
          <label className="label">مسجد</label>
          <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">مسجد فاطمه زهرا (س) - شهرک آبشار</span>
              <span className="text-green-600">✔</span>
            </div>
          </div>
          <input type="hidden" {...register('mosque')} value="مسجد فاطمه زهرا (س) - شهرک آبشار" />
        </div>

        {/* اطلاعات غذا (اطلاعیه) */}
        <div className="col-span-1 md:col-span-2">
          <label className="label">
            <Utensils className="inline w-4 h-4 ml-1" />
            غذای روز اعتکاف
          </label>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-bold text-amber-800 mb-2">انواع غذای سرو شده در اعتکاف سمیرم:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {foodOptions.map((food, index) => (
                <div key={index} className="bg-white border border-amber-300 rounded p-2 text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-amber-700 font-medium">{food}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-amber-600 mt-2">
              نوع غذا در روز اعتکاف به شرکت‌کنندگان اعلام خواهد شد.
            </p>
          </div>
        </div>

        {/* مبلغ پرداخت */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h4 className="font-bold text-blue-800">مبلغ قابل پرداخت</h4>
                <p className="text-sm text-blue-600">هزینه ثبت‌نام اعتکاف سمیرم</p>
              </div>
              <div className="text-center md:text-right mt-2 md:mt-0">
                <div className="text-3xl font-bold text-blue-700">۶۵۰,۰۰۰</div>
                <div className="text-lg text-blue-600">تومان</div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه ثبت‌نام */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-lg font-bold"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال پردازش...
              </span>
            ) : (
              'ثبت‌نام و پرداخت ۶۵۰,۰۰۰ تومان'
            )}
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            با کلیک بر روی دکمه بالا به درگاه پرداخت بانکی هدایت خواهید شد.
          </p>
        </div>
      </div>
    </form>
  );
}
