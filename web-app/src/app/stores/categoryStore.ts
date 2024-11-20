import { runInAction, makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { ActionResult } from "../../types";
import { PaginationData, PagingParams } from "../../types/pagination";
import { CategoryData, CategoryInput } from "../../types/category";
import { formatDateTime } from "../../lib/utils";
import { CategorySchema } from "../../lib/schemas/categorySchema";

export default class CategoryStore {
  categories: CategoryData[] | null = null;
  currentCategory: CategoryData | null = null;
  categoriesForDropdown: CategoryData[] | null | undefined = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  userId: string = "";
  fromDate: string = "";
  toDate: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  // Add Category
  addCategory = async (
    formData: CategorySchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Categories.create(formData);
      runInAction(() => {
        this.categories = this.categories
          ? [...this.categories, response]
          : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding category: ", error);
      return { status: "error", error: error as string };
    }
  };

  // Update Category
  // updateCategory = async (
  //   id: string,
  //   data: CategoryInput
  // ): Promise<ActionResult<string>> => {
  //   try {
  //     await agent.Categories.create(data);
  //     runInAction(() => {
  //       if (this.categories) {
  //         const index = this.categories.findIndex((c) => c.id === id);
  //         if (index !== -1) {
  //           this.categories[index] = { ...this.categories[index], ...data };
  //         }
  //       }
  //     });
  //     return { status: "success", data: id };
  //   } catch (error) {
  //     console.error("Error updating category: ", error);
  //     return { status: "error", error: error as string };
  //   }
  // };

  // Delete Category
  deleteCategory = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Categories.delete(id);
      runInAction(() => {
        this.categories = this.categories?.filter((c) => c.id !== id) || null;
      });
      return { status: "success", data: "Category deleted successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
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

    return params;
  }

  // Load all categories
  loadCategories = async () => {
    const categoryList: CategoryData[] = [];
    try {
      const result = await agent.Categories.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          categoryList.push({
            ...item,
            createDate: item.createDate
              ? formatDateTime(item.createDate?.toString())
              : "",
          });
        });

        this.categories = categoryList;
      });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  loadCategoriesForDropdown = async () => {
    try {
      const result = await agent.Categories.listForDropdown();
      runInAction(() => {
        this.categoriesForDropdown = result;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Load category by ID
  getCategory = async (id: string) => {
    try {
      const category = await agent.Categories.getById(id);
      runInAction(() => {
        this.currentCategory = category;
      });
    } catch (error) {
      console.error("Error getting category:", error);
    }
  };

  setSelectedUser = (userId: string) => {
    this.userId = userId;
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

  clearCategories = () => {
    this.categories = null;
  };

  setDateFilter = (from: string, to: string) => {
    this.fromDate = from;
    this.toDate = to;
  };
}
