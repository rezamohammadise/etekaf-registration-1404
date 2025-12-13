import mongoose from 'mongoose';

export interface IMosque extends mongoose.Document {
  name: string;
  city: string;
  address: string;
  capacity: number;
  currentRegistrations: number;
  isActive: boolean;
}

const MosqueSchema = new mongoose.Schema<IMosque>(
  {
    name: {
      type: String,
      required: [true, 'نام مسجد الزامی است'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'شهر الزامی است'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'آدرس الزامی است'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'ظرفیت الزامی است'],
      min: [1, 'ظرفیت باید بیشتر از صفر باشد'],
    },
    currentRegistrations: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ایجاد ایندکس
MosqueSchema.index({ city: 1, name: 1 });

// ایجاد مدل
const Mosque = mongoose.models.Mosque || mongoose.model<IMosque>('Mosque', MosqueSchema);

export default Mosque;