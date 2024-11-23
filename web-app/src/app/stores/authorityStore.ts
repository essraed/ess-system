import { makeAutoObservable, runInAction } from "mobx";
import { AuthorityModel } from "../../types/AuthorityModel";

import { ActionResult } from "../../types";
import { AuthoritySchema } from "../../lib/schemas/authoritySchema";
import agent from "../api/agent";
import { PaginationData, PagingParams } from "../../types/pagination";
import { formatDateTime } from "../../lib/utils";

export default class AuthorityStore {
  authorities: AuthorityModel[] | null | undefined = null;
  authoritiesForDropdown: AuthorityModel[] | null | undefined = null;
  currentAuthority: AuthorityModel | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Add Authority
  addAuthority = async (
    data: AuthoritySchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Authority.create(data);
      runInAction(() => {
        this.authorities = this.authorities
          ? [...this.authorities, response]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Update Authority
  updateAuthority = async (
    id: string,
    data: AuthoritySchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Authority.update(id, data);
      return { status: "success", data: response as string };
    } catch (error) {
      console.error("Error: ", error);
      return { status: "error", error: error as string };
    }
  };

  deleteAuthority = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Authority.delete(id);
      runInAction(() => {
        this.authorities = this.authorities?.filter((a) => a.id !== id) || null;
      });
      return { status: "success", data: "Authority deleted successfully" };
    } catch (error) {
      console.error("Error deleting authority:", error);
      return { status: "error", error: error as string };
    }
  };

  createAuthority = async (
    authority: AuthoritySchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Authority.create(authority);
      runInAction(() => {
        this.authorities = this.authorities
          ? [...this.authorities, {createDate: formatDateTime(response.createDate), ...response}]
          : [response];
      });
      return { status: "success", data: "Authority created successfully" };
    } catch (error) {
      console.error("Error creating authority:", error);
      return { status: "error", error: error as string };
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    return params;
  }

  clearAuthorities = () => {
    this.authorities = null;
  };

  loadAuthoritiesForDropdown = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Authority.listForDropdown();
      runInAction(() => {
        this.authoritiesForDropdown = result;
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  loadAuthorities = async () => {
    const authorityList: AuthorityModel[] = [];
    try {
      const result = await agent.Authority.list(this.axiosParams);

      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          authorityList.push({
            ...item,
            updateDate: item.updateDate ? formatDateTime(item.updateDate) : 'No set',
            createDate: formatDateTime(item.createDate),
            updatedBy: item.updatedBy ? item.updatedBy : 'No set',
          });
        });
        this.authorities = authorityList;
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  getAuthority = async (id: string) => {
    this.loadingInitial = true;
    try {
      const result = await agent.Authority.getById(id);
      runInAction(() => {
        this.currentAuthority = result;
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
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
