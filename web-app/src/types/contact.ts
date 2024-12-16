export interface ContactData {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  licenseType?: string|null;
  enquiryType: boolean;
  ejari?: boolean | null;
  localAgent?: boolean| null;
  isDeleted: boolean;
  createDate?: string ;
}
