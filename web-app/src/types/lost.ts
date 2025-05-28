export enum lostStatus {
    Pending = 0,
    InProcess = 1,
    Completed = 2,
  }


export interface LostData {
  id: string;
  name: string;
  phone: string;
  email: string;
  comments:string;
  remarks?:string|null;
  lostDepartment: string;
  status: lostStatus;
  lostDate: string;
  createDate?: string | null;
  updateDate?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}
