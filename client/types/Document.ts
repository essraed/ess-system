export interface DocumentModel {
    id: string; 
    brief: string;
    aiResult?: string;
    createDate?: Date; 
    updateDate?: Date;
    createdByName?: string;
    updatedByName?: string;
}

export interface DocumentSaveModel {
    brief: string; 
    aiResult: string;
}

export interface DocumentUpdateModel {
    aiResult: string;
}

