'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import axios from 'axios';
import RegistrationForm from '@/components/RegistrationForm';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد').max(50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
  nationalCode: z.string().regex(/^\d{10}$/, 'کد ملی معتبر نیست'),
  mobile: z.string().regex(/^09[0-9]{9}$/, 'شماره موبایل معتبر نیست'),
  gender: z.enum(['male', 'female']),
  birthDate: z.string().refine((val) => {
    const date = new Date(val);
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 15;
  }, 'حداقل سن ۱۵ سال است'),
  city: z.string().min(2, 'شهر باید حداقل ۲ کاراکتر باشد'),
  mosque: z.string().min(1, 'انتخاب مسجد الزامی است'),
  foodType: z.enum(['vegetarian', 'normal', 'special']),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      gender: 'male',
      foodType: 'normal',
      city: 'تهران',
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // ذخیره اطلاعات اولیه ثبت‌نام
      const response = await axios.post('/api/register', data);
      
      if (response.data.success) {
        setRegistrationData(data);
        setShowPaymentModal(true);
        toast.success('ثبت‌نام اولیه با موفقیت انجام شد');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در ثبت‌نام');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!registrationData) return;

    try {
      const response = await axios.post('/api/payment/request', {
        ...registrationData,
        amount: 100000, // 10,000 تومان
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در انتقال به درگاه پرداخت');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              فرم ثبت‌نام اعتکاف ۱۴۰۴
            </h1>
            <p className="text-gray-600 text-lg">
              لطفا فرم زیر را با دقت تکمیل نمایید
            </p>
          </div>

          <div className="card">
            <RegistrationForm
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* توضیحات */}
          <div className="mt-8 card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              نکات مهم:
            </h3>
            <ul className="space-y-2 text-gray-600 list-disc pr-4">
              <li>پر کردن تمامی فیلدها الزامی است</li>
              <li>پس از ثبت‌نام، امکان ویرایش اطلاعات وجود ندارد</li>
              <li>هزینه ثبت‌نام ۱۰,۰۰۰ تومان می‌باشد</li>
              <li>پرداخت تنها از طریق درگاه زرین‌پال امکان‌پذیر است</li>
              <li>کد رهگیری پس از پرداخت موفق برای شما ارسال می‌شود</li>
            </ul>
          </div>
        </div>
      </div>

      {/* مودال پرداخت */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              انتقال به درگاه پرداخت
            </h3>
            <p className="text-gray-600 mb-6">
              ثبت‌نام اولیه با موفقیت انجام شد. برای تکمیل ثبت‌نام، لطفا هزینه را پرداخت نمایید.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn-secondary flex-1"
              >
                بازگشت
              </button>
              <button
                onClick={handlePayment}
                className="btn-primary flex-1"
              >
                پرداخت ۱۰,۰۰۰ تومان
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
