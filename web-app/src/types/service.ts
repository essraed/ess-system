export interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: string;
  rate: number;
  priceVIP?: string;
  serviceVipName?: string;
  totalPrice?: string;
  filePath?: string; 
  createDate?: Date | string;
  updateDate?: Date | string;
  createdBy?: string;
  updatedBy?: string;
  categoryId?: string;
  categoryName?: string;
  serviceOptions?: ServiceOptionData[];
}

export interface ServiceOptionData {
  id: string;
  name: string;
  description?: string; 
  additionalFee: number;
}
