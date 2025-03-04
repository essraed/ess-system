import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { formatDateTime } from "../../lib/utils";
import { EventSchema } from "../../lib/schemas/EventSchema";
import { EventData } from "../../types/event";

export default class EventStore {
  events: EventData[] | null  = null;
  currentEvent: EventData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loadingInitial = false;
  loading: boolean = false; // Additional loading state for specific actions

  constructor() {
    makeAutoObservable(this);
  }

  // Add Car
  addEvent = async (event: EventSchema): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      const response = await agent.Events.create(event);
      runInAction(() => {
        this.events = this.events ? [...this.events, response] : [response];
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
    this.events = null;
  };

  // Load Cars
  loadEvents = async () => {
    const events: EventData[] = [];
    try {
      const result = await agent.Events.getAll(this.axiosParams);
      runInAction(() => {
        runInAction(() => {
            const { pageNumber, pageSize, data, pageCount, totalCount } = result;
            this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

            data.map((item) => {
              events.push({
                ...item
              });
            });

            this.events = events;
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
      const result = await agent.Events.getById(id);
      runInAction(() => {
        this.currentEvent = result; // Store the current car details
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
