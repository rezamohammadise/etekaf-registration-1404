'use client';

import { 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  gender: 'male' | 'female';
  birthDate: string;
  city: string;
  mosque: string;
  foodType: 'vegetarian' | 'normal' | 'special';
  trackingCode: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentAmount: number;
  paymentRefId?: number;
  paymentDate?: string;
  createdAt: string;
}

interface AdminTableProps {
  registrations: Registration[];
  onViewDetails: (id: string) => void;
}

export default function AdminTable({ registrations, onViewDetails }: AdminTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="badge badge-success flex items-center">
            <CheckCircle className="w-3 h-3 ml-1" />
            پرداخت شده
          </span>
        );
      case 'pending':
        return (
          <span className="badge badge-warning flex items-center">
            <Clock className="w-3 h-3 ml-1" />
            در انتظار
          </span>
        );
      case 'failed':
        return (
          <span className="badge badge-danger flex items-center">
            <XCircle className="w-3 h-3 ml-1" />
            ناموفق
          </span>
        );
      default:
        return null;
    }
  };

  const getFoodTypeText = (type: string) => {
    switch (type) {
      case 'vegetarian':
        return 'گیاهخواری';
      case 'normal':
        return 'معمولی';
      case 'special':
        return 'ویژه';
      default:
        return type;
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                اطلاعات فردی
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تماس
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                محل
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {registration.firstName} {registration.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        کدملی: {registration.nationalCode}
                      </div>
                      <div className="text-xs text-gray-400">
                        کد رهگیری: {registration.trackingCode}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Phone className="w-4 h-4 ml-1 text-gray-400" />
                    {registration.mobile}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {registration.gender === 'male' ? 'آقا' : 'خانم'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 ml-1 text-gray-400" />
                    {registration.city}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center">
                    <Building className="w-4 h-4 ml-1 text-gray-400" />
                    {registration.mosque}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(registration.paymentStatus)}
                  <div className="text-sm text-gray-500 mt-1">
                    {getFoodTypeText(registration.foodType)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 ml-1 text-gray-400" />
                    {formatDate(new Date(registration.createdAt))}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(registration.createdAt).toLocaleTimeString('fa-IR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(registration._id)}
                    className="text-primary-600 hover:text-primary-900 flex items-center"
                  >
                    <Eye className="w-4 h-4 ml-1" />
                    مشاهده جزئیات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}