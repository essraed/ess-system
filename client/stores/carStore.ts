import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '@/types/pagination';
import { ActionResult } from '@/types';
import { CarData, CarInput } from '@/types/car';
import agent from '@/actions/agent';

export default class CarStore {
    cars: CarData[] | null = null;
    currentCar: CarData | null = null;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    loadingInitial = false;
    loading: boolean = false;  // Additional loading state for specific actions

    constructor() {
        makeAutoObservable(this);
    }

    // Add Car
    addCar = async (car: CarInput): Promise<ActionResult<string>> => {
        this.loading = true;
        try {
            const response = await agent.Cars.create(car);
            runInAction(() => {
                this.cars = this.cars ? [...this.cars, response] : [response];
            });
            return { status: 'success', data: response.id };
        } catch (error) {
            console.error("Error adding car: ", error);
            return { status: 'error', error: error as string };
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
                this.cars = this.cars?.filter(c => c.id !== id) || null; // Filter out deleted car
            });
            return { status: 'success', data: 'Car deleted successfully' };
        } catch (error) {
            console.error("Error deleting car: ", error);
            return { status: 'error', error: error as string };
        } finally {
            runInAction(() => {
                this.loading = false; // Reset loading state
            });
        }
    };

    // Load Cars
    loadCars = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Cars.getAll();
            runInAction(() => {
                this.cars = result; // Store the list of cars
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
}
