import { makeAutoObservable, runInAction } from 'mobx';
import { CategoryData, CategoryInput } from '../../types/category';
import agent from '../api/agent';
import { ActionResult } from '../../types';
import { PaginationData, PagingParams } from '../../types/pagination';

export default class CategoryStore {
  categories: CategoryData[] | null = null;
  currentCategory: CategoryData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // Add Category
  addCategory = async (data: CategoryInput): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Categories.create(data);
      runInAction(() => {
        this.categories = this.categories ? [...this.categories, response] : [response];
      });
      return { status: 'success', data: response.id };
    } catch (error) {
      console.error("Error adding category: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Update Category
  updateCategory = async (id: string, data: CategoryInput): Promise<ActionResult<string>> => {
    try {
      await agent.Categories.create(data);
      runInAction(() => {
        if (this.categories) {
          const index = this.categories.findIndex(c => c.id === id);
          if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...data };
          }
        }
      });
      return { status: 'success', data: id };
    } catch (error) {
      console.error("Error updating category: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Delete Category
  deleteCategory = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Categories.delete(id);
      runInAction(() => {
        this.categories = this.categories?.filter(c => c.id !== id) || null;
      });
      return { status: 'success', data: 'Category deleted successfully' };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { status: 'error', error: error as string };
    }
  };

  // Load all categories
  loadCategories = async () => {
   
    try {
      const result = await agent.Categories.getAll();
      runInAction(() => {
        this.categories = result;
      });
    
    } catch (error) {
      console.error("Error loading categories:", error);
      
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
}
