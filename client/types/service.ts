export interface ServiceInput {
    name: string;
    price: number;
    serviceOptions?: ServiceOptionInput[];
}

export interface ServiceData {
    id: string;
    name: string;
    price: number;
    totalPrice?: number;
    createDate?: Date;
    updateDate?: Date;
    createdByName?: string;
    updatedByName?: string;
    serviceOptions?: ServiceOptionData[];
}

export interface ServiceOptionInput {
    name: string;
    additionalFee: number;
}

export interface ServiceOptionData {
    id: string;
    name: string;
    additionalFee: number;
}
