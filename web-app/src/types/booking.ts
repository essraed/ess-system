export enum BookingStatus {
  Pending = 0,
  InProcess = 1,
  Canceled = 2,
  Completed = 3,
}

export interface BookingData {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address?: string | null;
  totalPrice?: string;
  serviceName: string;
  carName?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createDate?: string,
  updateDate?: string | null,
  bookingStatus?: BookingStatus;
  bookingDate?: string | null;
  isVIP?: boolean;
  bookingCode: string;
}

export interface BookingDetailsData {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  totalPrice?: number | null |undefined;
  note?: string | null;
  serviceName: string;
  carName?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createDate?: string | null,
  updateDate?: string | null,
  serviceOptionName?: string | null;
  serviceOptionFee?: number | null;
  bookingStatus?: BookingStatus;
  bookingDate?: Date | null;
  endBookingDate?: Date | null;
  bookingCode: string;
  paymentStatus:string|null;
  paymentType:string|null;
}
