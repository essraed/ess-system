export interface DocumentModel {
    id: string; 
    brief: string;
    aiResult?: string;
    createDate?: Date; 
    updateDate?: Date | string;
    createdBy?: string;
    updatedBy?: string;
}

export interface DocumentSaveModel {
    brief: string; 
    aiResult: string;
}

export interface DocumentUpdateModel {
    aiResult: string;
}

