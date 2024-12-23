import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";

import { ActionResult } from "../../types";
import agent from "../api/agent";
import { ServiceData } from "../../types/service";
import { ServiceSchema } from "../../lib/schemas/serviceSchema";
import { DropdownType } from "../../types/Dropdown";
import { formatDateTime } from "../../lib/utils";

export default class ServiceStore {
  services: ServiceData[] | null | undefined = null;
  currentService: ServiceData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm?: string = "";
  categoryAllId?: string = "";
  categoryId?: string = "";
  fromDate: string = "";
  toDate: string = "";
  userId: string = "";
  servicesDropdown: DropdownType[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadServicesDropdown = async () => {
    try {
      const result = await agent.Bookings.dropdownList();
      runInAction(() => {
        this.servicesDropdown = result;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Add Service
  addService = async (
    formData: ServiceSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Services.create(formData);
      runInAction(() => {
        this.services = this.services
          ? [...this.services, response]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding service: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Update Service
  updateService = async (
    id: string,
    data: ServiceSchema
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Services.update(id, data);
      await this.loadServices();
      return { status: "success", data: "Service updated successfully" };
    } catch (error) {
      console.error("Error updating service: ", error);
      return { status: "error", error: error as string };
    }
  };

  uploadImage = async (
    formData: FormData,
    id?: string
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Services.uploadImage(formData);
      await this.loadServices(id);
      return { status: "success", data: "Service image uploaded successfully" };
    } catch (error) {
      console.error("Error uploading service: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Delete Service
  deleteService = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Services.delete(id);
      runInAction(() => {
        this.services = this.services?.filter((s) => s.id !== id) || null;
      });
      return { status: "success", data: "Service deleted successfully" };
    } catch (error) {
      console.error("Error deleting service:", error);
      return { status: "error", error: error as string };
    }
  };

  // Load All Services
  loadServices = async (id?: string) => {
    const serviceList: ServiceData[] = [];
    try {
      if (id) await this.setCategoryAllIdParam(id);
      else this.setCategoryAllIdParam("");

      const result = await agent.Services.getAll(this.axiosParams);
      this.clearFilters();
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          serviceList.push({
            ...item,
            createDate: item.createDate
              ? formatDateTime(item.createDate?.toString())
              : "No Set",
            updateDate: item.updateDate
              ? formatDateTime(item.updateDate?.toString())
              : "No Set",
            price: item.price,
            totalPrice: item.totalPrice,
            priceVIP: item.priceVIP ? item.priceVIP : "",
            updatedBy: item.updatedBy ? item.updatedBy : "No Set",
          });
        });

        this.services = serviceList;
      });
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

  // Load Single Service By ID
  getService = async (id: string) => {
    let service: ServiceData | null = null;
    try {
      const result = await agent.Services.getById(id);
      runInAction(() => {
        service = {
          ...result,
          createDate: result.createDate
            ? formatDateTime(result.createDate?.toString())
            : "No Set",
          updateDate: result.updateDate
            ? formatDateTime(result.updateDate?.toString())
            : "No Set",
          updatedBy: result.updatedBy ? result.updatedBy : "No Set",
        };
        this.currentService = service;
      });
    } catch (error) {
      console.error("Error loading service:", error);
    }
  };

  // Get axiosParams for API requests
  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    if (this.categoryId) params.append("categoryId", this.categoryId);
    if (this.categoryAllId) params.append("categoryAllId", this.categoryAllId);
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    if (this.userId) params.append("userId", this.userId);
    return params;
  }

  // Clear all loaded services
  clearServices = () => {
    this.services = null;
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

  setCategoryIdParam = (categoryId: string) => {
    this.categoryId = categoryId;
  };

  setDateFilter = (from: string, to: string) => {
    this.fromDate = from;
    this.toDate = to;
  };
  setSelectedUser = (userId: string) => {
    this.userId = userId;
  };
  setCategoryAllIdParam = (categoryID: string) => {
    this.categoryAllId = categoryID;
  };

  clearFilters = () => {
    this.searchTerm = "";
    this.categoryId = "";
    this.categoryAllId = "";
    this.fromDate = "";
    this.toDate = "";
    this.userId = "";
    this.pagingParams = new PagingParams(); // Reset pagination
  };
}
