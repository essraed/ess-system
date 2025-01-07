import { makeAutoObservable, runInAction } from "mobx";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ComplaintSchema } from "../../lib/schemas/complaintSchema";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { ComplaintData, complaintStatus } from "../../types/complaints";

export default class ComplaintStore {
  complaintItems: ComplaintData[] | null | undefined = null;
  currentComplaint: ComplaintData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  complaintStatus: string | null = null;
  type: boolean | null = null;
  searchTerm: string = "";
  fromDate: string | null = null;
  toDate: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addComplaintItem = async (data: ComplaintSchema): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Complaints.create(data);
      runInAction(() => {
        this.complaintItems = this.complaintItems
          ? [
              ...this.complaintItems,
              { createDate: formatDateTime(response.createDate!), ...response },
            ]
          : [response];
      });

      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding complaint item:", error);
      return { status: "error", error: error as string };
    }
  };

  deleteComplaintItem = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Complaints.delete(id);
      runInAction(() => {
        this.complaintItems =
          this.complaintItems?.filter((item) => item.id !== id) || null;
      });
      return { status: "success", data: "Complaint item deleted successfully" };
    } catch (error) {
      console.error("Error deleting complaint item:", error);
      return { status: "error", error: error as string };
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    if (this.complaintStatus) params.append("complaintStatus", this.complaintStatus);
    if (this.type !== null) {
        params.append("type", this.type.toString());
      } else {
        params.append("type", "null"); // or just skip appending for null
      }
    return params;
  }

  clearComplaintItems = () => {
    this.complaintItems = null;
  };

  setStatusFilter = (status: string | null) => {
    this.complaintStatus = status;
  };

  loadComplaintItems = async () => {
    const complaintItems: ComplaintData[] = [];
    try {
      const result = await agent.Complaints.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
        data.map((item) => {
          complaintItems.push({
            ...item,
            createDate: item.createDate
            ? formatDateTime(item.createDate?.toString())
            : "No Set",
          updateDate: item.updateDate
            ? formatDateTime(item.updateDate?.toString())
            : "No Set",
            status: convertEnumToString(Number(item.status), complaintStatus),
            createdBy: item.createdBy ? item.createdBy : "Customer",
          });
        });
        this.complaintItems = complaintItems;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getComplaintItem = async (id: string) => {
    try {
      const result = await agent.Complaints.getById(id);
      runInAction(() => {
        this.currentComplaint = {
          ...result,
          createDate: result.createDate
          ? formatDateTime(result.createDate?.toString())
          : "No Set",
        updateDate: result.updateDate
          ? formatDateTime(result.updateDate?.toString())
          : "No Set",
        updatedBy: result.updatedBy
          ? result.updatedBy
          : "No Set",
          status: convertEnumToString(Number(result.status), complaintStatus),
          createdBy: result.createdBy ? result.createdBy : "Customer",
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  setStatusInProcess = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Complaints.setStatusInProcess(id);
      await this.getComplaintItem(id);
      return { status: "success", data: "Complaint status set to 'In Process'." };
    } catch (error) {
      console.error("Error updating complaint status:", error);
      return { status: "error", error: error as string };
    }
  };

  setStatusCompleted = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Complaints.setStatusCompleted(id);
      await this.getComplaintItem(id);
      return { status: "success", data: "Complaint status set to 'Completed'." };
    } catch (error) {
      console.error("Error updating booking status: ", error);
      return { status: "error", error: error as string };
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  setDateFilter = (from: string | null, to: string | null) => {
    this.fromDate = from;
    this.toDate = to;
  };

  setType = (type: boolean | null) => {
    this.type = type;
  };
}
