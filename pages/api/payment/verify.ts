import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Registration from '@/models/Registration';
import zarinpal from '@/lib/zarinpal';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Authority, Status } = req.query;

  try {
    await dbConnect();

    if (!Authority) {
      return res.redirect('/failed?error=Authority is missing');
    }

    // یافتن ثبت‌نام با authority
    const registration = await Registration.findOne({
      paymentAuthority: Authority,
      paymentStatus: 'pending',
    });

    if (!registration) {
      return res.redirect('/failed?error=Registration not found');
    }

    if (Status === 'OK') {
      try {
        // تأیید پرداخت
        const verification = await zarinpal.verifyPayment(
          Authority as string,
          registration.paymentAmount / 1000 // تبدیل به تومان
        );

        // آپدیت وضعیت پرداخت
        registration.paymentStatus = 'paid';
        registration.paymentRefId = verification.ref_id;
        registration.paymentCardPan = verification.card_pan;
        registration.paymentDate = new Date();
        await registration.save();

        // ریدایرکت به صفحه موفقیت
        return res.redirect(`/success?trackingCode=${registration.trackingCode}&refId=${verification.ref_id}`);
      } catch (error: any) {
        // خطا در تأیید پرداخت
        registration.paymentStatus = 'failed';
        await registration.save();

        return res.redirect(`/failed?error=${encodeURIComponent(error.message)}`);
      }
    } else {
      // کاربر پرداخت را لغو کرده
      registration.paymentStatus = 'failed';
      await registration.save();

      return res.redirect('/failed?error=پرداخت توسط کاربر لغو شد');
    }
  } catch (error: any) {
    console.error('Error in payment verification:', error);
    return res.redirect(`/failed?error=${encodeURIComponent('خطا در پردازش پرداخت')}`);
  }
}