export interface CategoryData {
  id: string;
  name: string;
  pictureUrl?: string;
  createDate?: Date | string;
  createdBy?: string;
}

export interface CategoryInput {
  name: string;
}
