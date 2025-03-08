import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { formatDateTime } from "../../lib/utils";
import { EventPROData } from "../../types/eventPRO";
import { EventPROSchema } from "../../lib/schemas/EventPROSchema";

export default class EventPROStore {
  eventPRO: EventPROData[] | null  = null;
  currentPROEvent: EventPROData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loadingInitial = false;
  loading: boolean = false; // Additional loading state for specific actions

  constructor() {
    makeAutoObservable(this);
  }

  // Add Event
  addEventPRO = async (eventPRO: EventPROSchema): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      const response = await agent.EventPROs.create(eventPRO);
      runInAction(() => {
        this.eventPRO = this.eventPRO ? [...this.eventPRO, response] : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding Event: ", error);
      return { status: "error", error: error as string };
    } finally {
      runInAction(() => {
        this.loading = false; // Reset loading state
      });
    }
  };
  
  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    return params;
  }

  clearEvents = () => {
    this.eventPRO = null;
  };

  // Load Cars
  loadEventPROs = async () => {
    const eventPRO: EventPROData[] = [];
    try {
      const result = await agent.EventPROs.getAll(this.axiosParams);
      runInAction(() => {
        runInAction(() => {
            const { pageNumber, pageSize, data, pageCount, totalCount } = result;
            this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

            data.map((item) => {
              eventPRO.push({
                ...item,
                createDate: item.createDate ? formatDateTime(item.createDate) : "No set",
              });
            });

            this.eventPRO = eventPRO;
          });
      });
    } catch (error) {
      console.error("Error loading events: ", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; // Reset loading state
      });
    }
  };

  // Get Car by ID
  getEvent = async (id: string) => {
    this.loadingInitial = true;
    try {
      const result = await agent.EventPROs.getById(id);
      runInAction(() => {
        this.currentPROEvent = result; // Store the current car details
      });
    } catch (error) {
      console.error("Error fetching car: ", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; // Reset loading state
      });
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
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
}
