
export interface CarInput {
    name: string;
    plateNumber: string;
    model?: string;
}

export interface CarData {
    id: string;
    name: string;
    plateNumber: string;
    model?: string;
    createDate?: Date;
    createdBy?: string;
}
