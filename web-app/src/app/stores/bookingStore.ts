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
import {
  CanceledReason,
  convertEnumToString,
  formatDateTime,
  paymentType,
} from "../../lib/utils";
import { DocumentBookingSchema } from "../../lib/schemas/documentBookingSchema";

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
    booking: BookingSchema | DocumentBookingSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Bookings.create(booking);
      runInAction(() => {
        this.bookings = this.bookings
          ? [...this.bookings, response]
          : [response];
      });

      const sessionId = this.getSessionId();

      const storedSessionData = JSON.parse(
        localStorage.getItem(sessionId) || '{"value": []}'
      );
      const storedBookings: string[] = storedSessionData.value || [];

      if (!storedBookings.includes(response.id)) {
        storedBookings.push(response.id);
      }

      this.setSessionData(sessionId, storedBookings);

      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding booking: ", error);
      return { status: "error", error: error as string };
    }
  };

  uploadImage = async (formData: FormData): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.uploadImage(formData);
      return { status: "success", data: "Documents Uploaded Successfully" };
    } catch (error) {
      console.error("Error uploading Documents: ", error);
      return { status: "error", error: error as string };
    }
  };

  setSessionData = (sessionId: string, data: string[]) => {
    const expiryTime = new Date().getTime() + 20 * 60 * 1000; // 20 minutes from now
    const sessionData = {
      value: data,
      expiry: expiryTime,
    };
    localStorage.setItem(sessionId, JSON.stringify(sessionData));
  };
  getSessionId = (): string => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = this.generateUniqueId();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };
  getCurrentSessionBookings = (): string[] | null => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      this.removeExpiredSessions(sessionId);

      const storedSessionData = localStorage.getItem(sessionId);
      if (storedSessionData) {
        const parsedSessionData = JSON.parse(storedSessionData);

        const currentSessionBookings = parsedSessionData.value;
        this.isSession = currentSessionBookings;
      }

      Object.keys(localStorage)
        .filter((key) => key !== "sessionId" && key !== "language")
        .forEach((id) => this.removeExpiredSessions(id));

      const validSessionIds = Object.keys(localStorage).filter(
        (id) => id !== "sessionId" && localStorage.getItem(id) !== null
      );

      if (validSessionIds.length > 0) {
        const latestSessionId = validSessionIds[validSessionIds.length - 1];
        const latestSessionData = JSON.parse(
          localStorage.getItem(latestSessionId) || "{}"
        );

        this.isSession = latestSessionData.value;
      }

      return this.isSession;
    }

    return null;
  };

  removeExpiredSessions = (sessionId: string) => {
    const sessionData = localStorage.getItem(sessionId);
    if (sessionData) {
      const { expiry } = JSON.parse(sessionData);
      const currentTime = new Date().getTime();

      if (currentTime > expiry) {
        localStorage.removeItem(sessionId);
      }
    }
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
      });
      return this.currentBooking;
    } catch (error) {
      console.error("Error fetching booking: ", error);
      return null;
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
  setPaymentTypeOfBooking = async (
    id: string,
    type: paymentType
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setPaymentTypeOfBooking(id, type);
      await this.getBooking(id);
      return { status: "success", data: `Booking Payment Type set to ${type}` };
    } catch (error) {
      console.error("Error updating booking Payment Type: ", error);
      return { status: "error", error: error as string };
    }
  };

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

  setStatusCanceled = async (
    id: string,
    reason: CanceledReason
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.setStatusCanceled(id, reason);
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
