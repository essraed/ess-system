import { makeAutoObservable, runInAction } from "mobx";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { PaginationData, PagingParams } from "../../types/pagination";
import { formatDateTime } from "../../lib/utils";
import { ContactData } from "../../types/contact";
import { BusinessSchema } from "../../lib/schemas/businessSchema";
import { ContactSchema } from "../../lib/schemas/contactSchema";

export default class ContactStore {
  contacts: ContactData[] | null | undefined = null;
  currentContact: ContactData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  fromDate: string | null = null;
  toDate: string | null = null;
  enquiryType: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addContact = async (
    data: BusinessSchema | ContactSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Contacts.create(data);
      runInAction(() => {
        this.contacts = this.contacts
          ? [
              ...this.contacts,
              { createDate: formatDateTime(response.createDate), ...response },
            ]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error: ", error);
      return { status: "error", error: error as string };
    }
  };

  deleteContact = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Contacts.delete(id);
      runInAction(() => {
        this.contacts = this.contacts?.filter((a) => a.id !== id) || null;
      });
      return { status: "success", data: "Contact deleted successfully" };
    } catch (error) {
      console.error("Error deleting Contact:", error);
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
    if (this.enquiryType !== null) {
      params.append("enquiryType", this.enquiryType.toString());
    } else {
      params.append("enquiryType", "null"); // or just skip appending for null
    }

    return params;
  }

  clearContacts = () => {
    this.contacts = null;
  };

  loadContact = async () => {
    const contacts: ContactData[] = [];
    try {
      const result = await agent.Contacts.getAll(this.axiosParams);

      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
        data.map((item) => {
          contacts.push({
            ...item,
            createDate: formatDateTime(item.createDate),
          });
        });

        this.contacts = contacts;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getContact = async (id: string) => {
    try {
      const result = await agent.Contacts.getById(id);
      runInAction(() => {
        this.currentContact = {
          ...result,
          createDate: formatDateTime(result.createDate),
        };
      });
    } catch (error) {
      console.error(error);
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
  setEnquiryType = (enquiryType: boolean | null) => {
    this.enquiryType = enquiryType;
  };
}
