export interface User {
  id: string;
  name: string;
  apartment: string;
  building: string;
  unit: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export interface Item {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  dailyPrice: number;
  ownerId: string;
  ownerName: string;
  ownerBuilding: string;
  status: 'available' | 'rented' | 'unavailable';
  condition: 'excellent' | 'good' | 'fair';
  unavailableDates: string[];
  rating: number;
  reviewCount: number;
}

export interface Rental {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'active' | 'returned' | 'completed' | 'cancelled';
  pickupMethod: 'doorknob' | 'parcel_box' | 'office' | 'direct';
  pickupLocation: string;
  pickupImages?: string[];
  returnImages?: string[];
  damageReported: boolean;
}

export interface KPIData {
  dau: number;
  mau: number;
  totalUsers: number;
  totalTransactions: number;
  successRate: number;
  averageRentalDays: number;
  repeatUserRate: number;
  neighborTransactionRate: number;
  reviewRate: number;
  averageRevenue: number;
  insuranceClaimRate: number;
  damageRate: number;
  dailyActiveUsers: { date: string; count: number }[];
  categoryDistribution: { category: string; count: number }[];
  transactionTrend: { date: string; transactions: number }[];
}

export type Category =
  | 'tools'
  | 'camping'
  | 'kitchen'
  | 'sports'
  | 'baby'
  | 'electronics'
  | 'party'
  | 'others';
