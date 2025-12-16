import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  // اطلاعات شخصی
  firstName: {
    type: String,
    required: [true, 'نام الزامی است'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'نام خانوادگی الزامی است'],
    trim: true,
  },
  nationalCode: {
    type: String,
    required: [true, 'کد ملی الزامی است'],
    unique: true,
    length: [10, 'کد ملی باید ۱۰ رقم باشد'],
  },
  mobile: {
    type: String,
    required: [true, 'شماره موبایل الزامی است'],
    unique: true,
    length: [11, 'شماره موبایل باید ۱۱ رقم باشد'],
  },
  birthDate: {
    type: String,
    required: [true, 'تاریخ تولد الزامی است'],
  },
  gender: {
    type: String,
    required: [true, 'جنسیت الزامی است'],
    enum: ['male', 'female'],
  },
  
  // اطلاعات موقعیت
  province: {
    type: String,
    required: [true, 'استان الزامی است'],
  },
  city: {
    type: String,
    required: [true, 'شهر الزامی است'],
  },
  mosque: {
    type: String,
    required: [true, 'مسجد الزامی است'],
  },
  
  // اطلاعات پرداخت
  trackingCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  refId: {
    type: String,
    unique: true,
    sparse: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 650000,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'cancelled'],
    default: 'pending',
  },
  
  // اطلاعات سیستمی
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  paymentDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// ایجاد ایندکس برای جستجوی بهتر
RegistrationSchema.index({ nationalCode: 1 });
RegistrationSchema.index({ mobile: 1 });
RegistrationSchema.index({ trackingCode: 1 });
RegistrationSchema.index({ paymentStatus: 1 });
RegistrationSchema.index({ registrationDate: -1 });

// جلوگیری از ثبت تکراری
RegistrationSchema.path('nationalCode').validate(async function(value) {
  if (!this.isModified('nationalCode')) return true;
  
  const count = await mongoose.models.Registration?.countDocuments({ 
    nationalCode: value,
    _id: { $ne: this._id }
  });
  
  return !count;
}, 'این کد ملی قبلاً ثبت شده است');

RegistrationSchema.path('mobile').validate(async function(value) {
  if (!this.isModified('mobile')) return true;
  
  const count = await mongoose.models.Registration?.countDocuments({ 
    mobile: value,
    _id: { $ne: this._id }
  });
  
  return !count;
}, 'این شماره موبایل قبلاً ثبت شده است');

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
