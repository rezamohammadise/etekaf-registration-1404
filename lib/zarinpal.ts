import axios from 'axios';

export interface ZarinpalPaymentRequest {
  amount: number;
  merchant_id: string;
  callback_url: string;
  description: string;
  metadata?: {
    mobile?: string;
    email?: string;
  };
}

export interface ZarinpalPaymentResponse {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type: string;
    fee: number;
  };
  errors: any[];
}

export interface ZarinpalPaymentVerification {
  amount: number;
  merchant_id: string;
  authority: string;
}

export interface ZarinpalVerificationResponse {
  data: {
    code: number;
    message: string;
    card_hash: string;
    card_pan: string;
    ref_id: number;
    fee_type: string;
    fee: number;
  };
  errors: any[];
}

class ZarinpalService {
  private merchantId: string;
  private sandbox: boolean;
  private baseURL: string;

  constructor() {
    this.merchantId = process.env.ZARINPAL_MERCHANT_ID || '';
    this.sandbox = process.env.ZARINPAL_SANDBOX === 'true';
    this.baseURL = this.sandbox 
      ? 'https://sandbox.zarinpal.com/pg/v4/payment/'
      : 'https://api.zarinpal.com/pg/v4/payment/';
  }

  async createPaymentRequest(
    amount: number,
    description: string,
    metadata?: { mobile?: string; email?: string }
  ): Promise<{ authority: string; payment_url: string }> {
    try {
      const paymentRequest: ZarinpalPaymentRequest = {
        merchant_id: this.merchantId,
        amount: amount * 10, // Convert to Rials
        callback_url: process.env.ZARINPAL_CALLBACK_URL || '',
        description,
        metadata,
      };

      const response = await axios.post<ZarinpalPaymentResponse>(
        `${this.baseURL}request.json`,
        paymentRequest
      );

      if (response.data.data.code === 100) {
        const paymentURL = this.sandbox
          ? `https://sandbox.zarinpal.com/pg/StartPay/${response.data.data.authority}`
          : `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`;

        return {
          authority: response.data.data.authority,
          payment_url: paymentURL,
        };
      } else {
        throw new Error(response.data.data.message || 'خطا در ایجاد درخواست پرداخت');
      }
    } catch (error: any) {
      console.error('خطا در ایجاد درخواست پرداخت:', error);
      throw new Error(error.message || 'خطا در ارتباط با درگاه پرداخت');
    }
  }

  async verifyPayment(
    authority: string,
    amount: number
  ): Promise<{ ref_id: number; card_pan: string }> {
    try {
      const verificationRequest: ZarinpalPaymentVerification = {
        merchant_id: this.merchantId,
        authority,
        amount: amount * 10, // Convert to Rials
      };

      const response = await axios.post<ZarinpalVerificationResponse>(
        `${this.baseURL}verify.json`,
        verificationRequest
      );

      if (response.data.data.code === 100 || response.data.data.code === 101) {
        return {
          ref_id: response.data.data.ref_id,
          card_pan: response.data.data.card_pan,
        };
      } else {
        throw new Error(response.data.data.message || 'خطا در تأیید پرداخت');
      }
    } catch (error: any) {
      console.error('خطا در تأیید پرداخت:', error);
      throw new Error(error.message || 'خطا در ارتباط با درگاه پرداخت');
    }
  }
}

export default new ZarinpalService();