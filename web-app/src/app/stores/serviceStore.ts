import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";

import { ActionResult } from "../../types";
import agent from "../api/agent";
import { ServiceData, ServiceInput } from "../../types/service";
import { ServiceSchema } from "../../lib/schemas/serviceSchema";
import { DropdownType } from "../../types/Dropdown";


export default class ServiceStore {
  services: ServiceData[] | null | undefined = null;
  currentService: ServiceData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm?: string = "";
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
  }

  // Add Service
  addService = async (
   formData:ServiceSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Services.create(formData);
      runInAction(() => {
        this.services = this.services ? [...this.services, response] : [response];
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
    data: ServiceInput
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
  loadServices = async () => {
    try {
      const result = await agent.Services.getAll(this.axiosParams);
      
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        this.services = data;
      });
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };
  

  // Load Single Service By ID
  getService = async (id: string) => {
    try {
      const result = await agent.Services.getById(id);
      runInAction(() => {
        this.currentService = result;
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
}
