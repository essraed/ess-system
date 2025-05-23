import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { formatDateTime } from "../../lib/utils";
import { TestimonailData } from "../../types/testimonial";
import { TestimonialSchema } from "../../lib/schemas/testimonialSchema ";

export default class TestimonialStore {
  testimonials: TestimonailData[] | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loadingInitial = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadTestimonials = async () => {
    const testimonials: TestimonailData[] = [];
    this.loadingInitial = true;
    try {
      const result = await agent.Testimonials.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.forEach((item) => {
          testimonials.push({
            ...item,
            createDate: formatDateTime(item.createDate),
          });
        });

        this.testimonials = testimonials;
      });
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  addTestimonial = async (
    testimonial: TestimonialSchema
  ): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      const response = await agent.Testimonials.create(testimonial);
      runInAction(() => {
        this.testimonials = this.testimonials
          ? [...this.testimonials, response]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding testimonial:", error);
      return { status: "error", error: error as string };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTestimonial = async (
    id: string
  ): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      await agent.Testimonials.delete(id);
      runInAction(() => {
        this.testimonials =
          this.testimonials?.filter((t) => t.id !== id) || null;
      });
      return { status: "success", data: "Testimonial deleted successfully" };
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      return { status: "error", error: error as string };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
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

  clearTestimonials = () => {
    this.testimonials = null;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    if (this.searchTerm) params.append("searchTerm", this.searchTerm);
    return params;
  }
}
