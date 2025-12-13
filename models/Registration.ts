import mongoose from 'mongoose';

export interface IRegistration extends mongoose.Document {
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  gender: 'male' | 'female';
  birthDate: Date;
  city: string;
  mosque: string;
  foodType: 'vegetarian' | 'normal' | 'special';
  trackingCode: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentAmount: number;
  paymentAuthority?: string;
  paymentRefId?: number;
  paymentCardPan?: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new mongoose.Schema<IRegistration>(
  {
    firstName: {
      type: String,
      required: [true, 'نام الزامی است'],
      trim: true,
      maxlength: [50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'],
    },
    lastName: {
      type: String,
      required: [true, 'نام خانوادگی الزامی است'],
      trim: true,
      maxlength: [50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'],
    },
    nationalCode: {
      type: String,
      required: [true, 'کد ملی الزامی است'],
      unique: true,
      match: [/^\d{10}$/, 'کد ملی معتبر نیست'],
    },
    mobile: {
      type: String,
      required: [true, 'شماره موبایل الزامی است'],
      match: [/^09[0-9]{9}$/, 'شماره موبایل معتبر نیست'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'جنسیت الزامی است'],
    },
    birthDate: {
      type: Date,
      required: [true, 'تاریخ تولد الزامی است'],
    },
    city: {
      type: String,
      required: [true, 'شهر الزامی است'],
    },
    mosque: {
      type: String,
      required: [true, 'مسجد الزامی است'],
    },
    foodType: {
      type: String,
      enum: ['vegetarian', 'normal', 'special'],
      default: 'normal',
    },
    trackingCode: {
      type: String,
      unique: true,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentAmount: {
      type: Number,
      required: true,
      default: 100000, // 10,000 تومان
    },
    paymentAuthority: {
      type: String,
    },
    paymentRefId: {
      type: Number,
    },
    paymentCardPan: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ایجاد ایندکس برای جستجوی بهتر
RegistrationSchema.index({ trackingCode: 1 });
RegistrationSchema.index({ nationalCode: 1 });
RegistrationSchema.index({ mobile: 1 });
RegistrationSchema.index({ paymentStatus: 1 });
RegistrationSchema.index({ createdAt: -1 });

// ایجاد مدل
const Registration = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;