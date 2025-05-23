import { FileResponseData } from "./filesTypes";

export interface BlogDetailsData {
  id: string;
  blogTitle: string;
  blogContent: string;
  createdBy?: string | null;
  createDate?: string;
  fileEntities?: FileResponseData[];
  posts?:Post[];
}


export interface Post {
  id: string;
  title: string;
  content: string;
  fileEntities?: FileResponseData[];
  postSections?:PostSection[];
}
export interface PostSection {
  id: string;
  subHeader: string;
  content: string;
}