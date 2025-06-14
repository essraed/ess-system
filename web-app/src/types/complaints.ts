export enum complaintStatus {
  Pending = 0,
  InProcess = 1,
  Completed = 2,
}

export interface ComplaintData {
  id: string;
  name: string;
  phone: string;
  email: string;
  comments: string;
  remarks?: string | null;
  department: string;
  status: complaintStatus;
  isComplaint?: string | null;
  createDate?: string | null;
  updateDate?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}
