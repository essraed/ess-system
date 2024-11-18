import { PUBLIC_API_URL } from "../../environment";
import { AuthoritySchema } from "../../lib/schemas/authoritySchema";
import { BookingSchema } from "../../lib/schemas/bookingSchema";
import { CategorySchema } from "../../lib/schemas/categorySchema";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { RegisterSchema } from "../../lib/schemas/registerSchema";
import { ServiceSchema } from "../../lib/schemas/serviceSchema";
import { UserPromptSchema } from "../../lib/schemas/UserPromptSchema";
import { AuthorityModel } from "../../types/AuthorityModel";
import { BookingData } from "../../types/booking";
import { CarData, CarInput } from "../../types/car";
import { CategoryData } from "../../types/category";
import { DocumentModel, DocumentUpdateModel } from "../../types/Document";
import { NotificationData } from "../../types/notification";
import { PagedResponse } from "../../types/pagination";
import { ServiceData } from "../../types/service";
import { User, UserIdAndName } from "../../types/User";
import { WorkingTimeData, WorkingTimeInput } from "../../types/workingTime";
import { store } from "../stores/store";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = PUBLIC_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response || {};
    if (
      error.code === "ECONNABORTED" ||
      error.message.includes("Network Error")
    ) {
      throw "The backend server is not reachable. Please check if the backend is running.";
    }

    switch (status) {
      case 400:
        if (Array.isArray(data)) {
          const modalStateErrors: string[] = [];
          for (const key in data) {
            if (data[key]) {
              modalStateErrors.push(data[key].description);
            }
          }
          throw modalStateErrors;
        } else {
          throw typeof data === "string" ? data : "Something went wrong";
        }

      case 401:
        throw "Unauthorized";
      case 403:
        throw "Forbidden";
      case 404:
        throw "Not Found";
      case 500:
        throw "Internal Server Error";
      default:
        throw "An unknown error occurred";
    }
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Cars = {
  getAll: () => requests.get<CarData[]>("cars/getAll"),
  getById: (id: string) => requests.get<CarData>(`cars/${id}`),
  create: (car: CarInput) => requests.post<CarData>("cars", car),
  delete: (id: string) => requests.del<string>(`cars/${id}`),
};

const Categories = {
  getAll: () => requests.get<CategoryData[]>("categories"),
  getById: (id: string) => requests.get<CategoryData>(`categories/${id}`),
  create: (category: CategorySchema) =>
    requests.post<CategoryData>("categories", category),
  delete: (id: string) => requests.del<string>(`categories/${id}`),
};

const Services = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<ServiceData[]>>("services/getAll", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<ServiceData>(`services/${id}`),
  create: (categoryId: string, service: ServiceSchema) =>
    requests.post<ServiceData>(`services/${categoryId}`, service),
  update: (id: string, service: ServiceSchema) =>
    requests.put<string>(`services/${id}`, service),
  delete: (id: string) => requests.del<string>(`services/${id}`),
};

const WorkingTime = {
  getAll: () => requests.get<WorkingTimeData[]>("workingtime"),
  create: (workingTime: WorkingTimeInput) =>
    requests.post<WorkingTimeData>("workingtime", workingTime),
};

const Bookings = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<BookingData[]>>("booking", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<BookingData>(`booking/${id}`),
  getAvailableSlots: (date: string) =>
    requests.get<string[]>(`booking/available-slots/${date}`),
  create: (booking: BookingSchema) =>
    requests.post<BookingData>("booking", booking),
  delete: (id: string) => requests.del<string>(`booking/${id}`),
  setStatusInProcess: (id: string) =>
    requests.put<string>(`booking/${id}/status/in-process`, {}),
  setStatusRejected: (id: string) =>
    requests.put<string>(`booking/${id}/status/rejected`, {}),
  setStatusFinished: (id: string) =>
    requests.put<string>(`booking/${id}/status/finished`, {}),
};

const Account = {
  current: () => requests.get<User>("account"),
  getUsersIdAndName: () =>
    requests.get<UserIdAndName[]>("account/getUsersIdAndName"),
  login: (user: LoginSchema) => requests.post<User>("account/login", user),
  register: (user: RegisterSchema) =>
    requests.post<User>("account/register", user),
};

const AiHelper = {
  getAIResult: (userPrompt: UserPromptSchema) =>
    requests.post<string>("ChatGpt/generate-summary", userPrompt),
};

const Documents = {
  list: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<DocumentModel[]>>("documents", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<DocumentModel>(`documents/${id}`),
  create: (document: FormData) =>
    requests.post<DocumentModel>("documents", document),
  update: (id: string, documentUpdateDto: DocumentUpdateModel) =>
    requests.put<string>(`documents/${id}`, documentUpdateDto),
  delete: (id: string) => requests.del<string>(`documents/${id}`),
};

const Authority = {
  list: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<AuthorityModel[]>>("authority/getAll", { params })
      .then(responseBody),
  listForDropdown: () =>
    requests.get<AuthorityModel[]>("authority/getAllForDropdown"),
  getById: (id: string) => requests.get<AuthorityModel>(`authority/${id}`),
  create: (document: AuthoritySchema) =>
    requests.post<AuthorityModel>("authority", document),
  update: (id: string, documentUpdateDto: AuthoritySchema) =>
    requests.put<string>(`authority/${id}`, documentUpdateDto),
  delete: (id: string) => requests.del<string>(`authority/${id}`),
};


const Notifications = {
  getAll: (params: URLSearchParams) => axios.get<NotificationData[]>("notification", {params }).then(responseBody),
  ReadToggle: (id: string) => requests.put<string>(`notification/${id}`, {}),
};


const agent = {
  Account,
  AiHelper,
  Documents,
  Authority,
  Cars,
  Categories,
  Services,
  WorkingTime,
  Bookings,
  Notifications,
};

export default agent;
