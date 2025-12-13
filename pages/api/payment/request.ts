import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Registration from '@/models/Registration';
import zarinpal from '@/lib/zarinpal';
import { validateNationalCode, validatePhoneNumber } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const {
      nationalCode,
      mobile,
      firstName,
      lastName,
      amount = 100000,
    } = req.body;

    // اعتبارسنجی داده‌ها
    if (!validateNationalCode(nationalCode)) {
      return res.status(400).json({
        success: false,
        message: 'کد ملی معتبر نیست',
      });
    }

    if (!validatePhoneNumber(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل معتبر نیست',
      });
    }

    // یافتن ثبت‌نام
    const registration = await Registration.findOne({
      nationalCode,
      mobile,
      paymentStatus: 'pending',
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'ثبت‌نامی یافت نشد یا قبلاً پرداخت شده است',
      });
    }

    // ایجاد درخواست پرداخت
    const description = `پرداخت هزینه ثبت‌نام اعتکاف ۱۴۰۴ - ${firstName} ${lastName}`;
    
    const paymentRequest = await zarinpal.createPaymentRequest(
      amount / 1000, // تبدیل به تومان
      description,
      {
        mobile,
      }
    );

    // ذخیره authority در دیتابیس
    registration.paymentAuthority = paymentRequest.authority;
    await registration.save();

    res.status(200).json({
      success: true,
      data: {
        payment_url: paymentRequest.payment_url,
        authority: paymentRequest.authority,
      },
    });
  } catch (error: any) {
    console.error('Error in payment request:', error);
    
    res.status(500).json({
      success: false,
      message: 'خطا در ایجاد درخواست پرداخت',
      error: error.message,
    });
  }
}