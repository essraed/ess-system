import { dayOfWeekMap } from "../../constants/constants";
import { PUBLIC_API_URL } from "../../environment";
import { AuthoritySchema } from "../../lib/schemas/authoritySchema";
import { BookingSchema } from "../../lib/schemas/bookingSchema";
import { CarSchema } from "../../lib/schemas/CarSchema";
import { CategorySchema } from "../../lib/schemas/categorySchema";
import { BusinessSchema } from "../../lib/schemas/businessSchema";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { NotificationSchema } from "../../lib/schemas/notificationSchema";
import {
  RegisterForUpdateSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { ServiceSchema } from "../../lib/schemas/serviceSchema";
import { UserPromptSchema } from "../../lib/schemas/UserPromptSchema";
import { WorkingTimeSchema } from "../../lib/schemas/workingTimeSchema ";
import { AuthorityModel } from "../../types/AuthorityModel";
import { BookingData, BookingDetailsData } from "../../types/booking";
import { CarData } from "../../types/car";
import { CategoryData } from "../../types/category";
import { ContactData } from "../../types/contact";
import { DocumentModel, DocumentUpdateModel } from "../../types/Document";
import { DropdownType } from "../../types/Dropdown";
import { NotificationData } from "../../types/notification";
import { PagedResponse } from "../../types/pagination";
import { ServiceData } from "../../types/service";
import { User, UserIdAndName } from "../../types/User";
import { WorkingTimeData } from "../../types/workingTime";
import { store } from "../stores/store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ContactSchema } from "../../lib/schemas/contactSchema";
import { LostData } from "../../types/lost";
import { LostSchema } from "../../lib/schemas/lostSchema";
import { ComplaintSchema } from "../../lib/schemas/complaintSchema";
import { ComplaintData } from "../../types/complaints";
import { CanceledReason, paymentType } from "../../lib/utils";
import { NationalityData } from "../../types/nationality";
import { DocumentBookingSchema } from "../../lib/schemas/documentBookingSchema";
import { BlogDetailsData } from "../../types/blog";
import { BlogSchema } from "../../lib/schemas/BlogSchema";
import { ClientData } from "../../types/client";
import { ClientSchema } from "../../lib/schemas/clientScema";
import { EventData } from "../../types/event";
import { EventSchema } from "../../lib/schemas/EventSchema";
import { FileResponseData } from "../../types/filesTypes";
import { EventPROData } from "../../types/eventPRO";
import { EventPROSchema } from "../../lib/schemas/EventPROSchema";
import { TestimonailData } from "../../types/testimonial";
import { TestimonialSchema } from "../../lib/schemas/testimonialSchema ";
import { Agent } from "http";

axios.defaults.baseURL = PUBLIC_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
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
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Cars = {
  getAll: (params: URLSearchParams) =>
    axios.get<PagedResponse<CarData[]>>("cars", { params }).then(responseBody),
  getById: (id: string) => requests.get<CarData>(`cars/${id}`),
  create: (car: CarSchema) => requests.post<CarData>("cars", car),
  delete: (id: string) => requests.del<string>(`cars/${id}`),
};

const Blogs = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<BlogDetailsData[]>>("blog", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<BlogDetailsData>(`blog/${id}`),
  create: (blog: BlogSchema) => requests.post<BlogDetailsData>("blog", blog),
  uploadImage: (formData: FormData) =>
    axios.post<string>("blog/upload-image", formData).then(responseBody),
  uploadImageForPost: (formData: FormData) =>
    axios
      .post<string>("blog/upload-image-ForPost", formData)
      .then(responseBody),
  delete: (id: string) => requests.del<string>(`blog/${id}`),
};
const Testimonials = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<TestimonailData[]>>("testimonial", { params })
      .then(responseBody),
  create: (testimonial: TestimonialSchema) =>
    requests.post<TestimonailData>("testimonial", testimonial),
  delete: (id: string) => requests.del<string>(`testimonial/${id}`),
};

const Events = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<EventData[]>>("event", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<EventData>(`event/${id}`),
  create: (event: EventSchema) => requests.post<EventData>("event", event),
};

const EventPROs = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<EventPROData[]>>("eventPRO", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<EventPROData>(`eventPRO/${id}`),
  create: (eventPRO: EventPROSchema) =>
    requests.post<EventPROData>("eventPRO", eventPRO),
};

const Contacts = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<ContactData[]>>("contacts", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<ContactData>(`contacts/${id}`),
  create: (contact: ContactSchema | BusinessSchema) =>
    requests.post<ContactData>("contacts", contact),
  delete: (id: string) => requests.del<string>(`contacts/${id}`),
};
const Losts = {
  getAll: (params: URLSearchParams) =>
    axios.get<PagedResponse<LostData[]>>("lost", { params }).then(responseBody),
  getById: (id: string) => requests.get<LostData>(`lost/${id}`),
  create: (lost: LostSchema) => requests.post<LostData>("lost", lost),
  delete: (id: string) => requests.del<string>(`lost/${id}`),
  setStatusInProcess: (id: string, data: { remark: string }) =>
    requests.put<string>(`lost/${id}/status/in-process`, data),

  setStatusCompleted: (id: string, data: { remark: string }) =>
    requests.put<string>(`lost/${id}/status/completed`, data),
};
const Complaints = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<ComplaintData[]>>("complaint", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<ComplaintData>(`complaint/${id}`),
  create: (complaint: ComplaintSchema) =>
    requests.post<ComplaintData>("complaint", complaint),
  delete: (id: string) => requests.del<string>(`complaint/${id}`),
  setStatusInProcess: (id: string) =>
    requests.put<string>(`complaint/${id}/status/in-process`, {}),
  setStatusCompleted: (id: string) =>
    requests.put<string>(`complaint/${id}/status/completed`, {}),
};

const Clients = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<ClientData[]>>("client", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<ClientData>(`client/${id}`),
  create: (client: {
    name: string;
    passportNumber: string;
    bookingId?: string | undefined;
  }) => requests.post<ClientData>("client", client),
  delete: (id: string) => requests.del<string>(`client/${id}`),
  setStatusInProcess: (id: string) =>
    requests.put<string>(`client/${id}/status/in-process`, {}),
  setStatusRejected: (id: string) =>
    requests.put<string>(`client/${id}/status/rejected`, {}),
  setStatusAccepted: (id: string) =>
    requests.put<string>(`client/${id}/status/accepted`, {}),
  uploadImage: (formData: FormData) =>
    axios.post<string>("client/upload-image", formData).then(responseBody),
  sendEmail: (body: { email: string; files: FileResponseData[] }) =>
    axios.post<string>("client/send-email", body).then(responseBody),
};

const Categories = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<CategoryData[]>>("categories", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<CategoryData>(`categories/${id}`),
  listForDropdown: () =>
    requests.get<CategoryData[]>("categories/authorities-dropdown"),
  create: (formData: CategorySchema) =>
    requests.post<CategoryData>("categories", formData),
  delete: (id: string) => requests.del<string>(`categories/${id}`),
  uploadImage: (formData: FormData) =>
    axios.post<string>("categories/upload-image", formData).then(responseBody),
};

const Services = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<ServiceData[]>>("services/getAll", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<ServiceData>(`services/${id}`),

  create: (formData: ServiceSchema) =>
    requests.post<ServiceData>("services/create-service", formData),

  uploadImage: (formData: FormData) =>
    axios.post<string>("services/upload-image", formData).then(responseBody),
  update: (id: string, service: ServiceSchema) =>
    requests.put<string>(`services/${id}`, service),
  delete: (id: string) => requests.del<string>(`services/${id}`),
};

const WorkingTime = {
  getAll: () => requests.get<WorkingTimeData[]>("workingtime"),
  create: (workingTime: WorkingTimeSchema) => {
    const mappedData = {
      ...workingTime,
      day: dayOfWeekMap[workingTime.day],
    };
    return requests.post<WorkingTimeData>("workingtime", mappedData);
  },
};

const Payment = {
  initiate: (data: FormData) => requests.post("payment/initiate-payment", data),
  callback: (data: FormData) => requests.post("payment/payment-callback", data),
  getById: (id: string) => requests.get(`payment/${id}`),
  processGooglePayPayment: (paymentData: any) =>
    requests.post(`payment/google-pay`, paymentData),
};
// Helper function to ensure the time is in the correct format (HH:mm)

const Bookings = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<BookingData[]>>("booking", { params })
      .then(responseBody),
  getById: (id: string) => requests.get<BookingDetailsData>(`booking/${id}`),
  getAvailableSlots: (date: string) =>
    requests.get<string[]>(`booking/available-slots/${date}`),
  create: (booking: BookingSchema | DocumentBookingSchema) =>
    requests.post<BookingData>("booking", booking),
  delete: (id: string) => requests.del<string>(`booking/${id}`),
  uploadImage: (formData: FormData) =>
    axios.post<string>("booking/upload-image", formData).then(responseBody),

  // Dropdown
  dropdownList: () => requests.get<DropdownType[]>("booking/get-all-dropdown"),

  setPaymentTypeOfBooking: (id: string, type: paymentType) =>
    requests.put<string>(`booking/${id}/setPaymentType`, type),

  // Updated status methods
  setStatusInProcess: (id: string) =>
    requests.put<string>(`booking/${id}/status/in-process`, {}),
  setStatusCanceled: (id: string, reason: CanceledReason) =>
    requests.put<string>(`booking/${id}/status/canceled`, reason),
  setStatusCompleted: (id: string) =>
    requests.put<string>(`booking/${id}/status/completed`, {}),
  setStatusPending: (id: string) =>
    requests.put<string>(`booking/${id}/status/pending`, {}),
};

const Account = {
  current: () => requests.get<User>("account"),
  getUsersIdAndName: (params: URLSearchParams) =>
    axios
      .get<
        PagedResponse<UserIdAndName[]>
      >("account/getUsersIdAndName", { params })
      .then(responseBody),
  login: (user: LoginSchema) => requests.post<User>("account/login", user),
  register: (user: RegisterSchema) =>
    requests.post<User>("account/register", user),
  delete: (id: string) => requests.del(`account/${id}`),
  update: (id: string, userDto: RegisterForUpdateSchema) =>
    requests.put<string>(`account/${id}`, userDto),
  getById: (id: string) =>
    requests.get<UserIdAndName>(`account/GetUserById/${id}`),
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
    requests.get<DropdownType[]>("authority/get-all-dropdown"),
  getById: (id: string) => requests.get<AuthorityModel>(`authority/${id}`),
  create: (document: AuthoritySchema) =>
    requests.post<AuthorityModel>("authority", document),
  update: (id: string, documentUpdateDto: AuthoritySchema) =>
    requests.put<string>(`authority/${id}`, documentUpdateDto),
  delete: (id: string) => requests.del<string>(`authority/${id}`),
};

const Notifications = {
  getAll: (params: URLSearchParams) =>
    axios
      .get<PagedResponse<NotificationData[]>>("notification", { params })
      .then(responseBody),
  ReadToggle: (id: string) => requests.put<string>(`notification/${id}`, {}),
  create: (notification: NotificationSchema) =>
    requests.post<NotificationData>("notification", notification),
  delete: (id: string) => requests.del<string>(`notification/${id}`),
};
const Nationality = {
  getAll: () => requests.get<NationalityData[]>("nationality"),
  getById: (id: string) => requests.get<NationalityData>(`nationality/${id}`),
};

// const Files = {
//   uploadFile: (formData: FormData) =>
//     axios
//       .post<FileResponseData>("files/uploadFile", formData, {})
//       .then(responseBody),

//   updateFile: (id: string, formData: FormData) =>
//     axios
//       .put<FileResponseData>(`files/updateFile/${id}`, formData)
//       .then(responseBody),

//   updateImage: (id: string, formData: FormData) =>
//     axios
//       .put<FileResponseData>(`files/updateImage/${id}`, formData)
//       .then(responseBody),

//   deleteFile: (id: string) =>
//     axios.delete<string>(`files/deleteFile/${id}`).then(responseBody),

//   deleteImage: (id: string) =>
//     axios.delete<string>(`files/deleteImage/${id}`).then(responseBody),
// };

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
  Contacts,
  Payment,
  Losts,
  Complaints,
  Nationality,
  Blogs,
  Clients,
  Events,
  EventPROs,
  Testimonials,
};

export default agent;
