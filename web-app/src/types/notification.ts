export enum NotificationType {
  General = 0,
  Alert = 1,
  Reminder = 2,
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: NotificationType;
  moreDetailsUrl?: string;
  createDate?: string;
  updateDate?: string;
}
