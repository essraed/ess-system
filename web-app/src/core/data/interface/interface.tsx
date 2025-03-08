export interface breadcrumbs {
  title: string;
  subtitle: string;
}

export interface ContactUs {
  contactdata: any;
  type: string;
  icon: string;
  title: string;
  link: string;
  text: string;
}


export interface FileEntity {
  id: string;
  fileName?: string;
  filePath: string;
}

export interface FileResponseData {
  id: string;
  fileName?: string | undefined;
  filePath: string;
}
