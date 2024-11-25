import { ZodIssue } from "zod";
import { User, UserIdAndName } from "../../types/User";
import { getToken, saveToken } from "../../lib/utils";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ActionResult } from "../../types";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import agent from "../api/agent";
import { RegisterSchema } from "../../lib/schemas/registerSchema";

export default class UserStore {
  user: User | null = null;
  error: ZodIssue[] | string | null = null;
  token: string | undefined | null = getToken();
  appLoaded: boolean = false;
  language: string = 'en';

  usersIdName: UserIdAndName[] | undefined = [];

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.token,
      token => {
        return saveToken(token)
      }
    )
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

      return { status: 'success', data: 'Logged in' }

    } catch (error) {
      console.log("Error: ", error);
      return { status: 'error', error: error as string }
    }
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();

      // reslove Mobx strict mode
      runInAction(() => this.user = user);

      return { status: 'success', data: 'We have got current user' }

    } catch (error) {
      console.log("Error: ", error);
      return { status: 'error', error: error as string }
    }
  }

  register = async (creds: RegisterSchema): Promise<ActionResult<string>> => {
    try {
      const user = await agent.Account.register(creds);

      // reslove Mobx strict mode
      runInAction(() => {
        this.setToken(user.token);
        this.user = user
      });

      return { status: 'success', data: 'Sign up' };

    } catch (error) {
      console.log("User Store: ", error);
      return { status: 'error', error: error as string };
    }
  };

  logout = async () => {
    runInAction(() => {
      this.setToken(null);
      this.user = null;
    })
  }

  setAppLoaded = async () => {
    this.appLoaded = true;
  }

  setLanguage = async (lang: string) => {
    this.language = lang;
  }

  setServerError(error: ZodIssue[] | string) {
    this.error = error;
  }

  setToken = async (token: string | null | undefined) => {
    await saveToken(token)
    runInAction(() => this.token = token)
  }

  loadUsers = async () => {
    const users = await agent.Account.getUsersIdAndName();
    runInAction(() => {
      this.usersIdName = users;
    });
  }

  hasRole = (role: string): boolean => {
    return this.user?.roles && Array.isArray(this.user.roles) ? this.user.roles.includes(role) : false;
  };  


  isAdmin = () => {
    return this.hasRole('ADMIN')
  }

  isUser = (): boolean => {
    return this.hasRole('USER');
  }
}