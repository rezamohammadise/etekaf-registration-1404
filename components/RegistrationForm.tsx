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

const cities = [
  'تهران',
  'مشهد',
  'اصفهان',
  'شیراز',
  'تبریز',
  'قم',
  'اهواز',
  'کرج',
  'کرمانشاه',
  'ارومیه',
];

const mosquesByCity = {
  'تهران': ['مسجد امام حسین (ع)', 'مسجد جامع تهران', 'مسجد الغدیر', 'مسجد النبی'],
  'مشهد': ['مسجد امام رضا (ع)', 'مسجد گوهرشاد', 'مسجد جامع مشهد'],
  'اصفهان': ['مسجد امام اصفهان', 'مسجد شیخ لطف‌الله', 'مسجد جامع اصفهان'],
  'شیراز': ['مسجد وکیل', 'مسجد جامع عتیق', 'مسجد نصیرالملک'],
  'تبریز': ['مسجد کبود', 'مسجد جامع تبریز'],
  'قم': ['مسجد جمکران', 'مسجد امام حسن عسکری (ع)'],
  'اهواز': ['مسجد سید الشهدا', 'مسجد جامع اهواز'],
  'کرج': ['مسجد جامع کرج', 'مسجد امام رضا (ع)'],
  'کرمانشاه': ['مسجد جامع کرمانشاه', 'مسجد امیرالمؤمنین'],
  'ارومیه': ['مسجد جامع ارومیه', 'مسجد سید الشهدا'],
};

export default function RegistrationForm({
  register,
  errors,
  watch,
  setValue,
  onSubmit,
  isSubmitting,
}: RegistrationFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableMosques, setAvailableMosques] = useState<string[]>([]);
  
  const selectedCity = watch('city');
  const selectedMosque = watch('mosque');

  useEffect(() => {
    if (selectedCity && mosquesByCity[selectedCity as keyof typeof mosquesByCity]) {
      setAvailableMosques(mosquesByCity[selectedCity as keyof typeof mosquesByCity]);
      if (!selectedMosque) {
        setValue('mosque', mosquesByCity[selectedCity as keyof typeof mosquesByCity][0]);
      }
    }
  }, [selectedCity, selectedMosque, setValue]);

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
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                className="ml-2"
                {...register('gender')}
              />
              <span>مرد</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                className="ml-2"
                {...register('gender')}
              />
              <span>زن</span>
            </label>
          </div>
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
            maxDate={new Date()}
            placeholderText="انتخاب تاریخ تولد"
            className="input-field"
            showYearDropdown
            yearDropdownItemNumber={50}
            scrollableYearDropdown
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>
      </div>

      {/* اطلاعات محل */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* شهر */}
        <div>
          <label className="label">
            <MapPin className="inline w-4 h-4 ml-1" />
            شهر
          </label>
          <select
            className="input-field"
            {...register('city')}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* مسجد */}
        <div>
          <label className="label">مسجد</label>
          <select
            className="input-field"
            {...register('mosque')}
          >
            {availableMosques.map((mosque) => (
              <option key={mosque} value={mosque}>
                {mosque}
              </option>
            ))}
          </select>
          {errors.mosque && (
            <p className="mt-1 text-sm text-red-600">{errors.mosque.message}</p>
          )}
        </div>
      </div>

      {/* نوع غذا */}
      <div>
        <label className="label">
          <Utensils className="inline w-4 h-4 ml-1" />
          نوع غذا
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="card cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="radio"
              value="normal"
              className="ml-2"
              {...register('foodType')}
            />
            <div className="mt-2">
              <div className="font-bold">غذای معمولی</div>
              <div className="text-sm text-gray-600">غذای متداول اعتکاف</div>
            </div>
          </label>
          <label className="card cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="radio"
              value="vegetarian"
              className="ml-2"
              {...register('foodType')}
            />
            <div className="mt-2">
              <div className="font-bold">گیاهخواری</div>
              <div className="text-sm text-gray-600">بدون گوشت قرمز و مرغ</div>
            </div>
          </label>
          <label className="card cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="radio"
              value="special"
              className="ml-2"
              {...register('foodType')}
            />
            <div className="mt-2">
              <div className="font-bold">غذای ویژه</div>
              <div className="text-sm text-gray-600">برای افراد با شرایط خاص</div>
            </div>
          </label>
        </div>
        {errors.foodType && (
          <p className="mt-1 text-sm text-red-600">{errors.foodType.message}</p>
        )}
      </div>

      {/* دکمه ثبت‌نام */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary text-lg py-4"
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
            'ادامه و پرداخت'
          )}
        </button>
      </div>
    </form>
  );
}