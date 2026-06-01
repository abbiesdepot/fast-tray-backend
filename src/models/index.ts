export type UserRole = "STUDENT" | "STALL_OWNER" | "ADMIN";
export type OrderStatus = "PENDING" | "ACCEPTED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED" | "REJECTED";

export interface JwtUser {
  userId: number;
  email: string;
  role: UserRole;
}

export interface CartItem {
  menuItemId: number;
  quantity: number;
  notes?: string;
}

export interface TopSellingItem {
  menuItemId: number;
  menuItemName: string;
  quantitySold: number;
  revenue: number;
}

export interface SalesSummary {
  stallId: number;
  date: string;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  rejectedOrders: number;
  totalRevenue: number;
  topSellingItems: TopSellingItem[];
}

export interface IdentifiedRecord {
  id: number;
}