export interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  rate: number;
  priceVIP?: number;
  serviceVipName?: string;
  totalPrice?: number;
  pictureUrl?: string; // Corresponds to the optional PictureUrl in C# ServiceDto
  createDate?: Date;
  updateDate?: Date;
  createdBy?: string;
  updatedBy?: string;
  categoryId?: string;
  categoryName?: string;
  serviceOptions?: ServiceOptionData[];
}

export interface ServiceOptionData {
  id: string;
  name: string;
  description?: string; // Optional, to match C# ServiceOptionDto
  additionalFee: number;
}