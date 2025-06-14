import { makeAutoObservable, runInAction } from "mobx";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { PaginationData, PagingParams } from "../../types/pagination";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { LostData, lostStatus } from "../../types/lost";
import { LostSchema } from "../../lib/schemas/lostSchema";

export default class LostStore {
  lostItems: LostData[] | null | undefined = null;
  currentLostItem: LostData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  lostStatus: string | null = null;
  searchTerm: string = "";
  fromDate: string | null = null;
  toDate: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addLostItem = async (data: LostSchema): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Losts.create(data);
      runInAction(() => {
        this.lostItems = this.lostItems
          ? [
              ...this.lostItems,
              { createDate: formatDateTime(response.createDate!), ...response },
            ]
          : [response];
      });

      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding lost item:", error);
      return { status: "error", error: error as string };
    }
  };

  deleteLostItem = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Losts.delete(id);
      runInAction(() => {
        this.lostItems =
          this.lostItems?.filter((item) => item.id !== id) || null;
      });
      return { status: "success", data: "Lost item deleted successfully" };
    } catch (error) {
      console.error("Error deleting lost item:", error);
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
    if (this.lostStatus) params.append("lostStatus", this.lostStatus);

    return params;
  }

  clearLostItems = () => {
    this.lostItems = null;
  };

  setStatusFilter = (status: string | null) => {
    this.lostStatus = status;
  };

  loadLostItems = async () => {
    const lostItems: LostData[] = [];
    try {
      const result = await agent.Losts.getAll(this.axiosParams);

      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
        data.map((item) => {
          lostItems.push({
            ...item,
            createDate: item.createDate
              ? formatDateTime(item.createDate?.toString())
              : "No Set",
            updateDate: item.updateDate
              ? formatDateTime(item.updateDate?.toString())
              : "No Set",
            lostDate: formatDateTime(item.lostDate),
            status: convertEnumToString(Number(item.status), lostStatus),
            createdBy: item.createdBy ? item.createdBy : "Customer",
          });
        });

        this.lostItems = lostItems;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getLostItem = async (id: string) => {
    try {
      const result = await agent.Losts.getById(id);
      runInAction(() => {
        this.currentLostItem = {
          ...result,
          createDate: result.createDate
            ? formatDateTime(result.createDate?.toString())
            : "No Set",
          updateDate: result.updateDate
            ? formatDateTime(result.updateDate?.toString())
            : "No Set",
          lostDate: formatDateTime(result.lostDate),
          status: convertEnumToString(Number(result.status), lostStatus),
          createdBy: result.createdBy ? result.createdBy : "Customer",
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  uploadImage = async (formData: FormData): Promise<ActionResult<string>> => {    
    try {
      await agent.Losts.uploadImage(formData);
      await this.loadLostItems()
      return { status: "success", data: "Category image uploaded successfully" };
    } catch (error) {
      console.error("Error uploading Category: ", error);
      return { status: "error", error: error as string };
    }
  };

  setStatusInProcess = async (
    id: string,
    remark: string
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Losts.setStatusInProcess(id, { remark });
      await this.getLostItem(id);
      return { status: "success", data: "Lost status set to 'In Process'." };
    } catch (error) {
      return { status: "error", error: error as string };
    }
  };

  setStatusCompleted = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Losts.setStatusCompleted(id);
      await this.getLostItem(id);
      return { status: "success", data: "Lost status set to 'Completed'." };
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
}
