'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Phone,
  Calendar,
  MapPin,
  Building,
  Hash
} from 'lucide-react';
import { toast } from 'react-toastify';
import { exportToCSV } from '@/lib/utils';
import AdminTable from '@/components/AdminTable';

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
  paymentCardPan?: string;
  paymentDate?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'failed'>('all');
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    failed: 0,
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, filterStatus]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/register');
      setRegistrations(response.data.data);
      calculateStats(response.data.data);
    } catch (error) {
      toast.error('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const stats = {
      total: data.length,
      paid: data.filter(item => item.paymentStatus === 'paid').length,
      pending: data.filter(item => item.paymentStatus === 'pending').length,
      failed: data.filter(item => item.paymentStatus === 'failed').length,
    };
    setStats(stats);
  };

  const filterRegistrations = () => {
    let filtered = [...registrations];

    // فیلتر بر اساس وضعیت
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.paymentStatus === filterStatus);
    }

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.firstName.toLowerCase().includes(term) ||
        item.lastName.toLowerCase().includes(term) ||
        item.nationalCode.includes(term) ||
        item.mobile.includes(term) ||
        item.trackingCode.toLowerCase().includes(term)
      );
    }

    setFilteredRegistrations(filtered);
  };

  const handleExport = () => {
    const dataForExport = filteredRegistrations.map(reg => ({
      'کد رهگیری': reg.trackingCode,
      'نام': reg.firstName,
      'نام خانوادگی': reg.lastName,
      'کد ملی': reg.nationalCode,
      'موبایل': reg.mobile,
      'شهر': reg.city,
      'مسجد': reg.mosque,
      'وضعیت پرداخت': reg.paymentStatus === 'paid' ? 'پرداخت شده' : reg.paymentStatus === 'pending' ? 'در انتظار' : 'ناموفق',
      'مبلغ': reg.paymentAmount,
      'تاریخ ثبت': new Date(reg.createdAt).toLocaleDateString('fa-IR'),
    }));

    exportToCSV(dataForExport, `etekaf-registrations-${new Date().toISOString().split('T')[0]}`);
    toast.success('خروجی با موفقیت ایجاد شد');
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/registration/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر داشبورد */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            داشبورد مدیریت
          </h1>
          <p className="text-gray-600">
            مدیریت ثبت‌نام‌های اعتکاف ۱۴۰۴
          </p>
        </div>
      </div>

      {/* آمار */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">کل ثبت‌نام‌ها</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">پرداخت شده</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center ml-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">در انتظار پرداخت</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center ml-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">پرداخت ناموفق</p>
                <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* فیلتر و جستجو */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* جستجو */}
            <div>
              <label className="label">جستجو</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام، کد ملی، موبایل یا کد رهگیری"
                  className="input-field pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* فیلتر وضعیت */}
            <div>
              <label className="label">فیلتر بر اساس وضعیت</label>
              <select
                className="input-field"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">همه</option>
                <option value="paid">پرداخت شده</option>
                <option value="pending">در انتظار پرداخت</option>
                <option value="failed">پرداخت ناموفق</option>
              </select>
            </div>

            {/* دکمه‌های اکشن */}
            <div className="flex items-end gap-4">
              <button
                onClick={fetchRegistrations}
                className="btn-secondary flex-1"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                بروزرسانی
              </button>
              <button
                onClick={handleExport}
                className="btn-primary flex-1"
              >
                <Download className="w-4 h-4 ml-2" />
                خروجی Excel
              </button>
            </div>
          </div>
        </div>

        {/* جدول */}
        <AdminTable
          registrations={filteredRegistrations}
          onViewDetails={handleViewDetails}
        />

        {/* پاگینیشن */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-gray-600">
            نمایش {filteredRegistrations.length} از {registrations.length} مورد
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              قبلی
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              ۱
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              ۲
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}