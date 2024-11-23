export interface CategoryData {
  id: string;
  name: string;
  pictureUrl?: string;
  Description?: string;
  createDate?: Date | string;
  createdBy?: string;
}

export interface CategoryInput {
  name: string;
}
