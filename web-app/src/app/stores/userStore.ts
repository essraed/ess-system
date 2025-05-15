import { ZodIssue } from "zod";
import { User, UserIdAndName } from "../../types/User";
import { getToken, saveToken } from "../../lib/utils";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ActionResult } from "../../types";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import agent from "../api/agent";
import {
  RegisterForUpdateSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { PaginationData, PagingParams } from "../../types/pagination";

export default class UserStore {
  user: User | null = null;
  error: ZodIssue[] | string | null = null;
  token: string | undefined | null = getToken();
  appLoaded: boolean = false;
  language: string = "en";

  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";

  usersIdName: UserIdAndName[] | undefined = [];
  editUser: UserIdAndName | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        return saveToken(token);
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: LoginSchema): Promise<ActionResult<string>> => {
    try {
      const user = await agent.Account.login(creds);

      // reslove Mobx strict mode
      runInAction(() => {
        this.setToken(user.token);
        this.user = user;
      });

      return { status: "success", data: "Logged in" };
    } catch (error) {
      return { status: "error", error: error as string };
    }
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();

      // reslove Mobx strict mode
      runInAction(() => (this.user = user));

      return { status: "success", data: "We have got current user" };
    } catch (error) {
      return { status: "error", error: error as string };
    }
  };

  register = async (creds: RegisterSchema): Promise<ActionResult<string>> => {
    try {
      await agent.Account.register(creds);

      // reslove Mobx strict mode
      // runInAction(() => {
      //   this.setToken(user.token);
      //   this.user = user;
      // });

      return { status: "success", data: "User Created Succesfully " };
    } catch (error) {
      return { status: "error", error: error as string };
    }
  };

  deleteUser = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Account.delete(id);
      runInAction(() => {
        this.usersIdName =
          this.usersIdName?.filter((s) => s.id !== id) || undefined;
      });
      return { status: "success", data: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting User:", error);
      return { status: "error", error: error as string };
    }
  };

  updateUser = async (
    id: string,
    data: RegisterForUpdateSchema
  ): Promise<ActionResult<string>> => {
    try {
      await agent.Account.update(id, data);
      await this.loadUsers();
      return { status: "success", data: "User updated successfully" };
    } catch (error) {
      console.error("Error updating user: ", error);
      return { status: "error", error: error as string };
    }
  };

  getUSer = async (id: string) => {
    try {
      const result = await agent.Account.getById(id);
      runInAction(() => {
        this.editUser = result;
      });
    } catch (error) {
      console.error("Error loading service:", error);
    }
  };

  logout = async () => {
    runInAction(() => {
      this.setToken(null);
      this.user = null;
    });
  };

  setAppLoaded = async () => {
    this.appLoaded = true;
  };

  setLanguage = async (lang: string) => {
    this.language = lang;
  };

  setServerError(error: ZodIssue[] | string) {
    this.error = error;
  }

  setToken = async (token: string | null | undefined) => {
    await saveToken(token);
    runInAction(() => (this.token = token));
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    return params;
  }

  loadUsers = async () => {
    try {
      const result = await agent.Account.getUsersIdAndName(this.axiosParams);
      runInAction(() => {
        this.usersIdName = result.data;
      });
    } catch (error) {
      console.error("error loading users ", error);
    }
  };

  hasRole = (role: string): boolean => {
    return this.user?.roles && Array.isArray(this.user.roles)
      ? this.user.roles.includes(role)
      : false;
  };

  isAdmin = () => {
    return this.hasRole("ADMIN");
  };

  isUser = (): boolean => {
    return this.hasRole("USER");
  };
  isMarketUser = (): boolean => {
    return this.hasRole("MARKET");
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
