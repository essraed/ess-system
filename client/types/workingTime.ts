import { DayOfWeek } from "./commonTypes";

export interface WorkingTimeData { 
    id: string; 
    day: DayOfWeek; 
    fromTime: string; 
    toTime: string; 
    isActive: boolean; 
    createDate?: Date; 
    createdByName?: string; 
}

export interface WorkingTimeInput { 
    day: DayOfWeek; 
    fromTime: string; 
    toTime: string; 
}






