import { DayOfWeek } from "./commonTypes";

export interface WorkingTimeData { 
    id: string; 
    day: DayOfWeek; 
    fromTime: string; 
    toTime: string; 
    isActive: boolean; 
    createDate?: string; 
    createdBy?: string; 
}






