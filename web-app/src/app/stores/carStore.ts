import { makeAutoObservable, runInAction } from "mobx";
import { CarData} from "../../types/car";
import { PaginationData, PagingParams } from "../../types/pagination";
import { ActionResult } from "../../types";
import agent from "../api/agent";
import { CarSchema } from "../../lib/schemas/CarSchema";

export default class CarStore {
  cars: CarData[] | null  = null;
  currentCar: CarData | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  searchTerm: string = "";
  loadingInitial = false;
  loading: boolean = false; // Additional loading state for specific actions

  constructor() {
    makeAutoObservable(this);
  }

  // Add Car
  addCar = async (car: CarSchema): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      const response = await agent.Cars.create(car);
      runInAction(() => {
        this.cars = this.cars ? [...this.cars, response] : [response];
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding car: ", error);
      return { status: "error", error: error as string };
    } finally {
      runInAction(() => {
        this.loading = false; // Reset loading state
      });
    }
  };

  // // Update Car
  // updateCar = async (id: string, car: CarInput): Promise<ActionResult<string>> => {
  //     this.loading = true;
  //     try {
  //         const response = await agent.Cars.update(id, car);
  //         runInAction(() => {
  //             if (this.cars) {
  //                 const index = this.cars.findIndex(c => c.id === id);
  //                 if (index !== -1) {
  //                     this.cars[index] = response; // Update the car in the list
  //                 }
  //             }
  //         });
  //         return { status: 'success', data: response.id }; // Assuming response has an id
  //     } catch (error) {
  //         console.error("Error updating car: ", error);
  //         return { status: 'error', error: error as string };
  //     } finally {
  //         runInAction(() => {
  //             this.loading = false; // Reset loading state
  //         });
  //     }
  // };

  // Delete Car
  deleteCar = async (id: string): Promise<ActionResult<string>> => {
    this.loading = true;
    try {
      await agent.Cars.delete(id);
      runInAction(() => {
        this.cars = this.cars?.filter((c) => c.id !== id) || null; // Filter out deleted car
      });
      return { status: "success", data: "Car deleted successfully" };
    } catch (error) {
      console.error("Error deleting car: ", error);
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

  clearCars = () => {
    this.cars = null;
  };

  // Load Cars
  loadCars = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Cars.getAll(this.axiosParams);
      runInAction(() => {
        runInAction(() => {
            const { pageNumber, pageSize, data, pageCount, totalCount } = result;
            this.setPagination({ pageNumber, pageSize, pageCount, totalCount });
            this.cars = data;
          });
      });
    } catch (error) {
      console.error("Error loading cars: ", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; // Reset loading state
      });
    }
  };

  // Get Car by ID
  getCar = async (id: string) => {
    this.loadingInitial = true;
    try {
      const result = await agent.Cars.getById(id);
      runInAction(() => {
        this.currentCar = result; // Store the current car details
      });
    } catch (error) {
      console.error("Error fetching car: ", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; // Reset loading state
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
}
