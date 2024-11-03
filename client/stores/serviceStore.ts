import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '@/types/pagination';
import { ActionResult } from '@/types';
import { ServiceData, ServiceInput } from '@/types/service';
import agent from '@/actions/agent';

export default class ServiceStore {
  services: ServiceData[] | null = null;  // Avoid undefined
  currentService: ServiceData | null = null;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Helper to manage loading state
  private setLoading = (loading: boolean) => {
    this.loadingInitial = loading;
  }

  // Add Service
  addService = async (categoryId: string, service: ServiceInput): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Services.create(categoryId, service);
      runInAction(() => {
        this.services = this.services ? [...this.services, response] : [response]; // Add new car to the list
      });
      return { status: 'success', data: response.id };
    } catch (error) {
      console.error("Error adding service: ", error);
      return { status: 'error', error: error as string };
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    return params;
  }

  // Update Service
  updateService = async (id: string, service: ServiceInput): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Services.update(id, service);
      return { status: 'success', data: response as string };
    } catch (error) {
      console.error("Error updating service: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Delete Service
  deleteService = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Services.delete(id);
      runInAction(() => {
        this.services = this.services?.filter(s => s.id !== id) || null;
      });
      return { status: 'success', data: 'Service deleted successfully' };
    } catch (error) {
      console.error("Error deleting service: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Load Services
  loadServices = async () => {
    this.setLoading(true);
    try {
      const result = await agent.Services.getAll(this.axiosParams);
      runInAction(() => {
          const { pageNumber, pageSize, data, pageCount, totalCount } = result;
          this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
          this.services = data;
      });
    } catch (error) {
      console.error("Error loading services: ", error);
    } finally {
      this.setLoading(false);
    }
  };

  // Get Service by ID
  getService = async (id: string) => {
    this.setLoading(true);
    try {
      const result = await agent.Services.getById(id);
      runInAction(() => {
        this.currentService = result;
      });
    } catch (error) {
      console.error("Error fetching service: ", error);
    } finally {
      this.setLoading(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };
}
