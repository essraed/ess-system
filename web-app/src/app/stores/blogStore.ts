import { makeAutoObservable, runInAction } from "mobx";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { formatDateTime } from "../../lib/utils";
import { BlogDetailsData } from "../../types/blog";
import { BlogSchema } from "../../lib/schemas/BlogSchema";

export default class BlogStore {
  blogs: BlogDetailsData[] | null  = null;
  currentBlog: BlogDetailsData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loadingInitial = false;
  loading: boolean = false; // Additional loading state for specific actions

  constructor() {
    makeAutoObservable(this);
  }


  // Delete Car
  deleteBlog = async (id: string): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      await agent.Blogs.delete(id);
      runInAction(() => {
        this.blogs = this.blogs?.filter((c) => c.id !== id) || null; // Filter out deleted car
      });
      return { status: "success", data: "Blog deleted successfully" };
    } catch (error) {
      console.error("Error deleting Blog: ", error);
      return { status: "error", error: error as string };
    } finally {
      runInAction(() => {
        this.loading = false; // Reset loading state
      });
    }
  };


  clearBlogs = () => {
    this.blogs = null;
  };

 // Load blogs
 loadBlogs = async () => {
  const blogs: BlogDetailsData[] = [];
  try {
    const result = await agent.Blogs.getAll(this.axiosParams);
    runInAction(() => {
      runInAction(() => {
          const { pageNumber, pageSize, data, pageCount, totalCount } = result;
          this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

          data.map((item) => {
            blogs.push({
              ...item,
              createDate: formatDateTime(item.createDate),
              createdBy: item.createdBy ? item.createdBy : 'No set'
            });
          });

          this.blogs = blogs;
        });
    });
  } catch (error) {
    console.error("Error loading blogs: ", error);
  } finally {
    runInAction(() => {
      this.loadingInitial = false; // Reset loading state
    });
  }
};


// Get Car by ID
getBlog= async (id: string) => {
  this.loadingInitial = true;
  try {
    const result = await agent.Blogs.getById(id);
    runInAction(() => {
      this.currentBlog = result; // Store the current blogs details
    });
  } catch (error) {
    console.error("Error fetching blog: ", error);
  } finally {
    runInAction(() => {
      this.loadingInitial = false; // Reset loading state
    });
  }
};

 // Add Blog
 addBlog = async (blog: BlogSchema): Promise<ActionResult<string>> => {
  this.loading = true;
  try {
    const response = await agent.Blogs.create(blog);
    runInAction(() => {
      this.blogs = this.blogs ? [...this.blogs, response] : [response];
    });
    return { status: "success", data: response.id };
  } catch (error) {
    console.error("Error adding blog: ", error);
    return { status: "error", error: error as string };
  } finally {
    runInAction(() => {
      this.loading = false; // Reset loading state
    });
  }
};

get axiosParams() {
  const params = new URLSearchParams();
  params.append("pageNumber", this.pagingParams.pageNumber.toString());
  params.append("pageSize", this.pagingParams.pageSize.toString());
  if (this.searchTerm) params.append("searchTerm", this.searchTerm);
  return params;
}

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
