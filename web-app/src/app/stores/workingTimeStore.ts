import { makeAutoObservable, runInAction } from 'mobx';
import { ActionResult } from '../../types';
import { WorkingTimeData } from '../../types/workingTime';
import agent from '../api/agent';
import { PaginationData, PagingParams } from '../../types/pagination';
import { WorkingTimeSchema } from '../../lib/schemas/workingTimeSchema ';
import { formatDateTime, formatTimeOnly } from '../../lib/utils';


export default class WorkingTimeStore {
  workingTimes: WorkingTimeData[] | null | undefined = null;
  currentWorkingTime: WorkingTimeData | null = null;
  loadingInitial = false;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  userId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  // Add Working Time
  addWorkingTime = async (workingTime: WorkingTimeSchema): Promise<ActionResult<string>> => {
    try {
      const response = await agent.WorkingTime.create(workingTime);
      runInAction(() => {
        this.workingTimes = this.workingTimes ? [...this.workingTimes, response] : [response]; // Add new car to the list
      });
      return { status: 'success', data: response.id };
    } catch (error) {
      console.error("Error adding working time: ", error);
      return { status: 'error', error: error as string };
    }
  };

  // Load Working Times
  loadWorkingTimes = async () => {
    const wtimes: WorkingTimeData [] = []
    try {
      const response = await agent.WorkingTime.getAll();

      runInAction(() => {
        response.map((item) => {
          wtimes.push({
            ...item,
            createDate: formatDateTime(item.createDate),
            createdBy: item.createdBy ? item.createdBy : 'No set',
            fromTime: formatTimeOnly(item.fromTime),
            toTime: formatTimeOnly(item.toTime)
          });
        });
        this.workingTimes = wtimes
      });
    } catch (error) {
      console.error("Error loading working times: ", error);
      this.loadingInitial = false;
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  clearNotification = () => {
    this.workingTimes = null;
  };

  setSelectedUser = (userId: string) => {
    this.userId = userId;
  };

}
