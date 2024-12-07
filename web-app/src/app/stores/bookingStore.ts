import { makeAutoObservable, runInAction } from "mobx";
import {
  BookingData,
  BookingDetailsData,
  BookingStatus,
} from "../../types/booking";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { BookingSchema } from "../../lib/schemas/bookingSchema";
import { convertEnumToString, formatDateTime } from "../../lib/utils";

export default class BookingStore {
  bookings: BookingData[] | null | undefined = null;
  currentBooking: BookingDetailsData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  loadingInitial = false;
  availableSlots: string[] | null = null;

  // New filter parameters
  searchTerm: string | null = null;
  bookingStatus: string | null = null;
  fromDate: string | null = null;
  toDate: string | null = null;
  serviceId: string | null = null;

  isSession: string[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Add Booking
  addBooking = async (
    booking: BookingSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Bookings.create(booking);
      runInAction(() => {
        this.bookings = this.bookings
          ? [...this.bookings, response]
          : [response];
      });

      // Generate a unique session ID if it doesn't exist
      const sessionId = this.getSessionId();

      const storedBookings = JSON.parse(
        localStorage.getItem(sessionId) || "[]"
      );
      storedBookings.push(response.id);
      localStorage.setItem(sessionId, JSON.stringify(storedBookings));

      console.log(`Booking stored successfully for session: ${sessionId}`);

      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding booking: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Utility method to get or create a session ID
  getSessionId = (): string => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      // Generate a unique session ID
      sessionId = this.generateUniqueId();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  getCurrentSessionBookings = (): string[] | null => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      const storedBookings = JSON.parse(
        localStorage.getItem(sessionId) || "[]"
      );
      this.isSession = storedBookings;

      const allSessionIds = Object.keys(localStorage).filter(
        (key) => key !== "sessionId"
      );

      if (allSessionIds.length > 1) {
        const lastSessionId = allSessionIds[allSessionIds.length - 1];
        this.isSession = JSON.parse(
          localStorage.getItem(lastSessionId) || "[]"
        );
      }

      return this.isSession;
    }

    return null;
  };

  // Utility method to generate a unique ID (can use a library like UUID)
  generateUniqueId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Delete Booking
  deleteBooking = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.delete(id);
      runInAction(() => {
        this.bookings = this.bookings?.filter((b) => b.id !== id) || null;
      });
      return { status: "success", data: "Booking deleted successfully" };
    } catch (error) {
      console.error("Error deleting booking: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Load Bookings
  loadBookings = async () => {
    const bookingList: BookingData[] = [];
    try {
      const result = await agent.Bookings.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          bookingList.push({
            ...item,
            updateDate: item.updateDate
              ? formatDateTime(item.updateDate)
              : "No set",
            createDate: formatDateTime(item.createDate),
            updatedBy: item.updatedBy ? item.updatedBy : "No set",
            bookingDate: formatDateTime(item.bookingDate?.toString()),
            totalPrice: item.totalPrice + " AED",
            bookingStatus: convertEnumToString(
              Number(item.bookingStatus),
              BookingStatus
            ),
          });
        });

        this.bookings = bookingList;
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error("Error loading bookings: ", error);
      this.loadingInitial = false;
    }
  };

  // Get Booking by ID
  getBooking = async (id: string) => {
    try {
      const result = await agent.Bookings.getById(id);

      runInAction(() => {
        this.currentBooking = {
          ...result,
          bookingStatus: convertEnumToString(
            Number(result.bookingStatus),
            BookingStatus
          ),
        };
        console.log("this.currentBooking: ", this.currentBooking.bookingStatus);
      });
    } catch (error) {
      console.error("Error fetching booking: ", error);
    }
  };

  // Get Available Slots
  getAvailableSlots = async (date: string): Promise<ActionResult<string>> => {
    try {
      const result = await agent.Bookings.getAvailableSlots(date);
      runInAction(() => {
        this.availableSlots = result;
      });
      return {
        status: "success",
        data: "Received available slots successfully",
      };
    } catch (error) {
      runInAction(() => {
        this.availableSlots = null;
      });
      console.error("Error loading available slots: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Update Booking Status
  setStatusInProcess = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setStatusInProcess(id);
      await this.getBooking(id);
      return { status: "success", data: "Booking status set to 'In Process'." };
    } catch (error) {
      console.error("Error updating booking status: ", error);
      return { status: "error", error: error as string };
    }
  };

  setStatusCanceled = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setStatusCanceled(id);
      await this.getBooking(id);
      return { status: "success", data: "Booking status set to 'Canceled'." };
    } catch (error) {
      console.error("Error updating booking status: ", error);
      return { status: "error", error: error as string };
    }
  };

  setStatusPending = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setStatusPending(id);
      await this.getBooking(id);
      return { status: "success", data: "Booking status set to 'Canceled'." };
    } catch (error) {
      console.error("Error updating booking status: ", error);
      return { status: "error", error: error as string };
    }
  };

  setStatusCompleted = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setStatusCompleted(id);
      await this.getBooking(id);
      return { status: "success", data: "Booking status set to 'Completed'." };
    } catch (error) {
      console.error("Error updating booking status: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Set Pagination
  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  // Axios Parameters with filters
  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.bookingStatus) params.append("bookingStatus", this.bookingStatus);
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    if (this.serviceId) params.append("serviceId", this.serviceId);
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    return params;
  }

  // New methods to set filters
  setStatusFilter = (status: string | null) => {
    this.bookingStatus = status;
  };

  setDateFilter = (from: string | null, to: string | null) => {
    this.fromDate = from;
    this.toDate = to;
  };

  setServiceFilter = (serviceId: string | null) => {
    this.serviceId = serviceId;
  };

  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  clearBookings = () => {
    this.bookings = null;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };
}
