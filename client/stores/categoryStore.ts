import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '@/types/pagination';
import { ActionResult } from '@/types';
import { CategoryData, CategoryInput } from '@/types/category';
import agent from '@/actions/agent';

export default class CategoryStore {
    categories: CategoryData[] | null = null;
    currentCategory: CategoryData | null = null;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Add a new category
    async addCategory(category: CategoryInput): Promise<ActionResult<string>> {
        try {
            const response = await agent.Categories.create(category);
            runInAction(() => {
                this.categories = this.categories ? [...this.categories, response] : [response]; // Add new car to the list
            });
            return { status: 'success', data: response.id }; 
        } catch (error) {
            console.error("Error adding category: ", error);
            return { status: 'error', error: error as string };
        }
    }

    // // Update an existing category
    // async updateCategory(id: string, category: CategoryInput): Promise<ActionResult<string>> {
    //     try {
    //         const response = await agent.Categories.update(id, category);
    //         return { status: 'success', data: response as string };
    //     } catch (error) {
    //         console.error("Error updating category: ", error);
    //         return { status: 'error', error: error as string };
    //     }
    // }

    // Delete a category
    async deleteCategory(id: string): Promise<ActionResult<string>> {
        try {
            await agent.Categories.delete(id);
            runInAction(() => {
                this.categories = this.categories?.filter(c => c.id !== id) || null;
            });
            return { status: 'success', data: 'Category deleted successfully' };
        } catch (error) {
            console.error("Error deleting category: ", error);
            return { status: 'error', error: error as string };
        }
    }

    // Load all categories
    async loadCategories() {
        this.loadingInitial = true;
        try {
            const result = await agent.Categories.getAll();
            runInAction(() => {
                this.categories = result;
            });
        } catch (error) {
            console.error("Error loading categories: ", error);
        } finally {
            runInAction(() => {
                this.loadingInitial = false; // Ensure loading state is updated
            });
        }
    }

    // Get a category by its ID
    async getCategory(id: string) {
        this.loadingInitial = true;
        try {
            const result = await agent.Categories.getById(id);
            runInAction(() => {
                this.currentCategory = result;
            });
        } catch (error) {
            console.error("Error fetching category: ", error);
        } finally {
            runInAction(() => {
                this.loadingInitial = false; // Ensure loading state is updated
            });
        }
    }
}
