
export enum BookingStatus {
    Pending = 'Pending',
    InProcess = 'InProcess',
    Rejected = 'Rejected',
    Finished = 'Finished',
}

export interface BookingData {
    id: string;                       
    customerName: string;
    phone: string;                   
    email: string;                   
    address?: string;                
    latitude?: number;
    longitude?: number;
    bookingStatus?: BookingStatus;
    bookingDate?: Date;
    endBookingDate?: Date; 
    totalPrice: number;
    serviceName: string;          
    isVIP?: boolean;           
}

