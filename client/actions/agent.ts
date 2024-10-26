
import { AuthoritySchema } from "@/lib/schemas/authoritySchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { RegisterSchema } from "@/lib/schemas/registerSchema";
import { UserPromptSchema } from "@/lib/schemas/UserPromptSchema";
import { store } from "@/stores/store";
import { AuthorityModel } from "@/types/AuthorityModel";
import { DocumentModel, DocumentUpdateModel } from "@/types/Document";
import { PagedResponse } from "@/types/pagination";
import { User, UserIdAndName } from "@/types/User";
import axios, { AxiosError, AxiosResponse } from "axios";


// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     })
// }


axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.userStore.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Content-Type'] = 'application/json';
    };
    return config;
})

axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        const { data, status } = error.response as AxiosResponse;
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
                    throw typeof data === 'string' ? data : 'Something went wrong';
                }

            case 401:
                throw 'Unauthorized'
            case 403:
                throw 'Forbidden'
            case 404:
                throw 'Not Found'
            case 500:
                throw 'Internal Server Error'
            default:
                throw 'An unknown error occurred'
        }
    }
);


const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
    current: () => requests.get<User>('account'),
    getUsersIdAndName: () => requests.get<UserIdAndName[]>('account/getUsersIdAndName'),
    login: (user: LoginSchema) => requests.post<User>('account/login', user),
    register: (user: RegisterSchema) => requests.post<User>('account/register', user),
}

const AiHelper = {
    getAIResult: (userPrompt: UserPromptSchema) => requests.post<string>('ChatGpt/generate-summary', userPrompt)
}

const Documents = {
    list: (params: URLSearchParams) => axios.get<PagedResponse<DocumentModel[]>>('documents', { params }).then(responseBody),
    getById: (id: string) => requests.get<DocumentModel>(`documents/${id}`),
    create: (document: FormData) => requests.post<string>('documents', document),
    update: (id: string, documentUpdateDto: DocumentUpdateModel) => requests.put<string>(`documents/${id}`, documentUpdateDto),
    delete: (id: string) => requests.del<string>(`documents/${id}`)
}

const Authority = {
    list: (params: URLSearchParams) => axios.get<PagedResponse<AuthorityModel[]>>('authority/getAll', { params }).then(responseBody),
    listForDropdown: () => requests.get<AuthorityModel[]>('authority/getAllForDropdown'),
    getById: (id: string) => requests.get<AuthorityModel>(`authority/${id}`),
    create: (document: AuthoritySchema) => requests.post<string>('authority', document),
    update: (id: string, documentUpdateDto: AuthoritySchema) => requests.put<string>(`authority/${id}`, documentUpdateDto),
    delete: (id: string) => requests.del<string>(`authority/${id}`)
};

const agent = {
    Account,
    AiHelper,
    Documents,
    Authority,
}

export default agent;
