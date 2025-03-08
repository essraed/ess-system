import { makeAutoObservable, runInAction } from "mobx";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { PaginationData, PagingParams } from "../../types/pagination";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { ClientData, clientStatus } from "../../types/client";
import { ClientSchema } from "../../lib/schemas/clientScema";
import { FileResponseData } from "../../types/filesTypes";

export default class ClientStore {
  clientItems: ClientData[] | null | undefined = null;
  currentClientItem: ClientData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  clientStatus: string | null = null;
  searchTerm: string = "";
  fromDate: string | null = null;
  toDate: string | null = null;
  bookingId?: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  // Add a new client
  // Modify addClient definition to accept a single client instead of ClientSchema
  addClient = async (client: {
    name: string;
    passportNumber: string;
    bookingId?: string | undefined;
  }): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Clients.create(client); // Ensure you send the correct data to your API
      runInAction(() => {
        this.clientItems = this.clientItems
          ? [
              ...this.clientItems,
              { createDate: formatDateTime(response.createDate!), ...response },
            ]
          : [response];
      });

      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding client:", error);
      return { status: "error", error: error as string };
    }
  };

  // Delete a client
  deleteClient = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Clients.delete(id);
      runInAction(() => {
        this.clientItems =
          this.clientItems?.filter((item) => item.id !== id) || null;
      });
      return { status: "success", data: "Client deleted successfully" };
    } catch (error) {
      console.error("Error deleting client:", error);
      return { status: "error", error: error as string };
    }
  };

  // Prepare parameters for API request
  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    if (this.bookingId) params.append("bookingId", this.bookingId);
    if (this.clientStatus) params.append("clientStatus", this.clientStatus);

    return params;
  }

  // Clear client items from the store
  clearClientItems = () => {
    this.clientItems = null;
  };

  // Set client status filter
  setStatusFilter = (status: string | null) => {
    this.clientStatus = status;
  };

  // Load all clients with pagination
  loadClientItems = async () => {
    const clients: ClientData[] = [];
    try {
      const result = await agent.Clients.getAll(this.axiosParams);

      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
        data.map((item) => {
          clients.push({
            ...item,
            createDate: item.createDate
              ? formatDateTime(item.createDate?.toString())
              : "No Set",
            updateDate: item.updateDate
              ? formatDateTime(item.updateDate?.toString())
              : "No Set",
            status: convertEnumToString(Number(item.status), clientStatus),
            createdBy: item.createdBy ? item.createdBy : "Customer",
          });
        });

        this.clientItems = clients;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Get a client by ID
  getClientItem = async (id: string) => {
    try {
      const result = await agent.Clients.getById(id);
      runInAction(() => {
        this.currentClientItem = {
          ...result,
          createDate: result.createDate
            ? formatDateTime(result.createDate?.toString())
            : "No Set",
          updateDate: result.updateDate
            ? formatDateTime(result.updateDate?.toString())
            : "No Set",
          status: convertEnumToString(Number(result.status), clientStatus),
          createdBy: result.createdBy ? result.createdBy : "Customer",
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Set client status to "In Process"
  setStatusInProcess = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Clients.setStatusInProcess(id);
      await this.getClientItem(id);
      return { status: "success", data: "Client status set to 'In Process'." };
    } catch (error) {
      console.error("Error updating client status: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Set client status to "Accepted"
  setStatusAccepted = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Clients.setStatusAccepted(id);
      await this.getClientItem(id);
      return { status: "success", data: "Client status set to 'Accepted'." };
    } catch (error) {
      console.error("Error updating client status: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Set client status to "Rejected"
  setStatusRejected = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Clients.setStatusRejected(id);
      await this.getClientItem(id);
      return { status: "success", data: "Client status set to 'Rejected'." };
    } catch (error) {
      console.error("Error updating client status: ", error);
      return { status: "error", error: error as string };
    }
  };

  uploadImage = async (formData: FormData): Promise<ActionResult<string>> => {
    try {
      await agent.Clients.uploadImage(formData);
      return { status: "success", data: "Documents Uploaded Successfully" };
    } catch (error) {
      console.error("Error uploading Documents: ", error);
      return { status: "error", error: error as string };
    }
  };

  sendEmail = async (body: { email: string, files: FileResponseData[] }): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Clients.sendEmail(body); // Send JSON body
      return { status: "success", data: "Documents Sent Successfully" };
    } catch (error) {
      console.error("Error Sending Documents: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Set pagination parameters
  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  // Set pagination data
  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  // Set search term for filtering clients
  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  setBookingIdParam = (bookingId: string) => {
    this.bookingId = bookingId;
  };

  // Set date filter
  setDateFilter = (from: string | null, to: string | null) => {
    this.fromDate = from;
    this.toDate = to;
  };
}
