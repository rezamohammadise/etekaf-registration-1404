export function generateTrackingCode(): string {
  const prefix = 'ETK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function validateNationalCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;
  
  const check = parseInt(code[9]);
  const sum = code.split('').slice(0, 9).reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0);
  const remainder = sum % 11;
  
  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
}

export function validatePhoneNumber(phone: string): boolean {
  return /^09[0-9]{9}$/.test(phone);
}

export function exportToCSV(data: any[], filename: string): void {
  const csvContent = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');
  
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}