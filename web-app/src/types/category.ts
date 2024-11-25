export interface CategoryData {
  id: string;
  name: string;
  filePath?: string;
  description?: string;
  createDate?: string;
  createdBy?: string;
}

export interface CategoryInput {
  name: string;
}
