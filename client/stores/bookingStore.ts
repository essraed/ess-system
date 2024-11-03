import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '@/types/pagination';
import { ActionResult } from '@/types';
import { BookingData, BookingInput } from '@/types/booking';
import agent from '@/actions/agent';

export default class BookingStore {
  bookings: BookingData[] | null | undefined = null;
  currentBooking: BookingData | null = null;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Add Booking
  addBooking = async (booking: BookingInput): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Bookings.create(booking);
      runInAction(() => {
        this.bookings = this.bookings ? [...this.bookings, response] : [response]; // Add new car to the list
      });
      return { status: 'success', data: response.id };
    } catch (error) {
      console.error("Error adding booking: ", error);
      return { status: 'error', error: error as string };
    }
  };

  //   // Update Booking
  //   updateBooking = async (id: string, booking: BookingInput): Promise<ActionResult<string>> => {
  //     try {
  //       const response = await agent.Bookings.update(id, booking);
  //       return { status: 'success', data: response as string };
  //     } catch (error) {
  //       console.error("Error updating booking: ", error);
  //       return { status: 'error', error: error as string };
  //     }
  //   };

  // Delete Booking
  deleteBooking = async (id: string): Promise<ActionResult<string>> => {
    try {
      await agent.Bookings.delete(id);
      runInAction(() => {
        this.bookings = this.bookings?.filter(b => b.id !== id) || null;
      });
      return { status: 'success', data: 'Booking deleted successfully' };
    } catch (error) {
      console.error("Error deleting booking: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Load Bookings
  loadBookings = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Bookings.getAll(this.axiosParams);
      runInAction(() => {
        this.bookings = result.data;
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error("Error loading bookings: ", error);
      this.loadingInitial = false;
    }
  };

  // Get Booking by ID
  getBooking = async (id: string) => {
    this.loadingInitial = true;
    try {
      const result = await agent.Bookings.getById(id);
      runInAction(() => {
        this.currentBooking = result;
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error("Error fetching booking: ", error);
      this.loadingInitial = false;
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    return params;
  }
}
