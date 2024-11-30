export interface ContactData {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  subject: string;
  message: string;
  isBussinesSetup: boolean;
  isDeleted: boolean;
  createDate?: string ;
}
