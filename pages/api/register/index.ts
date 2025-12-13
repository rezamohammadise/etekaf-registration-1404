import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Registration from '@/models/Registration';
import { generateTrackingCode } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // بررسی تکراری نبودن کد ملی
    const existingRegistration = await Registration.findOne({
      nationalCode: req.body.nationalCode,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'این کد ملی قبلاً ثبت‌نام کرده است',
      });
    }

    // بررسی تکراری نبودن شماره موبایل
    const existingMobile = await Registration.findOne({
      mobile: req.body.mobile,
    });

    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: 'این شماره موبایل قبلاً ثبت‌نام کرده است',
      });
    }

    // ایجاد ثبت‌نام جدید
    const trackingCode = generateTrackingCode();
    const registrationData = {
      ...req.body,
      birthDate: new Date(req.body.birthDate),
      trackingCode,
      paymentAmount: 100000, // 10,000 تومان
      paymentStatus: 'pending',
    };

    const registration = await Registration.create(registrationData);

    res.status(201).json({
      success: true,
      data: {
        id: registration._id,
        trackingCode: registration.trackingCode,
        message: 'ثبت‌نام اولیه با موفقیت انجام شد',
      },
    });
  } catch (error: any) {
    console.error('Error in registration:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'اطلاعات تکراری وارد شده است',
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطا در ثبت‌نام',
      error: error.message,
    });
  }
}