export interface CategoryData {
  id: string;
  name: string;
  pictureUrl?: string;
  Description?: string;
  createDate?: string;
  createdBy?: string;
}

export interface CategoryInput {
  name: string;
}
