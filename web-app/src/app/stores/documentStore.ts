import { makeAutoObservable, runInAction } from "mobx";
import { DocumentModel, DocumentUpdateModel } from "../../types/Document";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import handleErrors, { formatDateTime } from "../../lib/utils";
import { ZodIssue } from "zod";
import { UserPromptSchema } from "../../lib/schemas/UserPromptSchema";

export default class DocumentStore {
  documents: DocumentModel[] | null = null;
  currentDocument: DocumentModel | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  fromDate: string = "";
  toDate: string = "";
  userId: string = "";
  aiGeneratedResult: string | null | undefined = null;
  brief: string | null | undefined = null;
  authorityId: string | null | undefined = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearDocuments = () => {
    this.documents = null;
  };

  addDocument = async (data: FormData): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Documents.create(data);
      runInAction(() => {
        this.documents = this.documents
          ? [...this.documents, response]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      handleErrors(error as string | ZodIssue[]);
      console.log("Error: ", error);
      return { status: "error", error: error as string };
    }
  };

  deleteDocument = async (id: string): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Documents.delete(id);
      return { status: "success", data: response as string };
    } catch (error) {
      handleErrors(error as string | ZodIssue[]);
      console.log("Error: ", error);
      return { status: "error", error: error as string };
    }
  };

  updateDocument = async (
    id: string,
    aiResult: string
  ): Promise<ActionResult<string>> => {
    try {
      const documentUpdateDto: DocumentUpdateModel = {
        aiResult: aiResult ?? "",
      };

      const response = await agent.Documents.update(id, documentUpdateDto);
      return { status: "success", data: response as string };
    } catch (error) {
      handleErrors(error as string | ZodIssue[]);
      console.log("Error: ", error);
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

    if (this.userId) params.append("userId", this.userId);

    if (this.authorityId) params.append("authorityId", this.authorityId);

    return params;
  }

  loadDocuments = async () => {
    const letterList: DocumentModel[] = [];
    try {
      const result = await agent.Documents.list(this.axiosParams);

      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          letterList.push({
            ...item,
            createDate: formatDateTime(item.createDate),
            updatedBy: item.updatedBy ? item.updatedBy : 'No set',
            updateDate: item.updateDate ? formatDateTime(item.updateDate) : 'No set',
          });
        });
        
        this.documents = letterList;
      });
    } catch (error) {
      console.log(error);
      handleErrors(error as string | ZodIssue[]);
    }
  };

  getDocument = async (id: string) => {
    try {
      const result = await agent.Documents.getById(id);

      runInAction(() => {
        this.currentDocument = result;
      });
    } catch (error) {
      handleErrors(error as string | ZodIssue[]);
      console.log(error);
    }
  };

  updateGeneratedResult = (newResult: string) => {
    runInAction(() => {
      this.aiGeneratedResult = newResult;
    });
  };

  getAIResult = async (
    data: UserPromptSchema
  ): Promise<ActionResult<string>> => {
    try {
      const result = await agent.AiHelper.getAIResult(data);

      runInAction(() => {
        this.aiGeneratedResult = result;
        this.brief = data.brief;
        this.authorityId = data.authorityId;

        console.log("data.authorityId: ", data.authorityId);
      });

      return { status: "success", data: "success" };
    } catch (error) {
      handleErrors(error as string | ZodIssue[]);
      console.log("Error: ", error);
      return { status: "error", error: error as string };
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

  setDateFilter = (from: string, to: string) => {
    this.fromDate = from;
    this.toDate = to;
  };

  setSelectedUser = (userId: string) => {
    this.userId = userId;
  };
  setSelectedAuthority = (authorityId: string) => {
    this.authorityId = authorityId;
  };
}
