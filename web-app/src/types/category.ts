import { FileResponseData } from "./filesTypes";

export interface CategoryData {
  id: string;
  name: string;
  fileEntities?: FileResponseData[];
  description?: string;
  createDate?:string;
  createdBy?: string;
}

export interface CategoryInput {
  name: string;
}
