'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import RegistrationForm from '@/components/RegistrationForm';
import { toast } from 'react-toastify';

// تعریف schema با Zod
const registrationSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد').max(50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
  nationalCode: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد').regex(/^[0-9]{10}$/, 'کد ملی باید فقط عدد باشد'),
  mobile: z.string().length(11, 'شماره موبایل باید ۱۱ رقم باشد').regex(/^09[0-9]{9}$/, 'شماره موبایل با ۰۹ شروع شود'),
  birthDate: z.string().min(1, 'تاریخ تولد الزامی است'),
  gender: z.string().min(1, 'جنسیت الزامی است'),
  province: z.string().min(1, 'استان الزامی است'), // <-- فیلد جدید
  city: z.string().min(1, 'شهر الزامی است'),
  mosque: z.string().min(1, 'مسجد الزامی است'),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      province: 'اصفهان', // مقدار پیش‌فرض
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setIsSubmitting(true);
      
      // ثبت اطلاعات در دیتابیس
      const response = await axios.post('/api/register', data);
      
      // ذخیره اطلاعات برای مرحله پرداخت
      setRegistrationData(data);
      
      // هدایت به درگاه پرداخت
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error('خطا در اتصال به درگاه پرداخت');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'خطا در ثبت اطلاعات');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* هدر صفحه */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ثبت‌نام اعتکاف ۱۴۰۴
            </h1>
            <p className="text-gray-600">
              جهت شرکت در مراسم اعتکاف، فرم زیر را با دقت تکمیل نمایید
            </p>
          </div>

          {/* کارت فرم */}
          <div className="card">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                اطلاعات شخصی
              </h2>
              <p className="text-gray-600">
                لطفاً اطلاعات خود را به دقت وارد کنید
              </p>
            </div>

            {/* فرم ثبت‌نام */}
            <RegistrationForm
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />

            {/* توضیحات پایین */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">نکات مهم:</h3>
              <ul className="space-y-2 text-gray-600 text-sm list-disc pr-5">
                <li>اطلاعات وارد شده باید مطابق با مدارک شناسایی باشد</li>
                <li>پس از ثبت‌نام امکان ویرایش اطلاعات وجود ندارد</li>
                <li>در صورت لغو ثبت‌نام، ۸۰٪ مبلغ تا ۷۲ ساعت عودت داده می‌شود</li>
                <li>حضور در محل اعتکاف ۳۰ دقیقه قبل از شروع الزامی است</li>
              </ul>
              
              {/* اطلاعات تماس */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="ml-3">
                    <h4 className="font-bold text-blue-800">پشتیبانی</h4>
                    <p className="text-blue-600 text-sm">
                      در صورت بروز مشکل با شماره <span className="font-bold">۰۹۱۲۳۴۵۶۷۸۹</span> تماس بگیرید
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
