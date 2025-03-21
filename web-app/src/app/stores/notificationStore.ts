import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { NotificationData, NotificationType } from "../../types/notification";
import { SIGNALR_HUB_URL } from "../../environment";
import * as signalR from "@microsoft/signalr";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { ActionResult } from "../../types";
import { PaginationData, PagingParams } from "../../types/pagination";

export default class NotificationStore {
  notifications: NotificationData[] | undefined = [];

  unreadCount: number = 0;
  takeCount: number | null = null;
  connection: signalR.HubConnection | null = null;
  isRead: string | null = null;
  pagination: PaginationData | null = null;
  pagingParams = new PagingParams();
  fromDate: string = "";
  toDate: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  stopConnection = () => {
    if (this.connection) this.connection.stop();
  };

  startConnection = async () => {
    try {
      if (this.connection) await this.connection.start();
    } catch (err) {
      setTimeout(this.startConnection, 5000);
    }
  };

  recieveNotification = () => {
    if (this.connection) {
      // Remove any existing listener to avoid duplicates
      this.connection.off("ReceiveNotification");

      // Add the new listener
      this.connection.on(
        "ReceiveNotification",
        (
          id: string,
          title: string,
          message: string,
          type: NotificationType,
          moreDetailsUrl: string
        ) => {
          runInAction(() => {
            const notificationType = convertEnumToString(
              type,
              NotificationType
            );

            // Check if notification already exists
            if (!this.notifications?.find((n) => n.id === id)) {
              this.notifications?.unshift({
                id: id,
                title,
                message: message,
                isRead: false,
                type: notificationType,
                moreDetailsUrl: moreDetailsUrl,
              });
              this.unreadCount += 1;
            }
          });
        }
      );
    }
  };

  initializeSignalR = async () => {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      return;
    }

    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(SIGNALR_HUB_URL)
        .withAutomaticReconnect()
        .build();

      await this.startConnection();
      console.log("SignalR connection established successfully.");

      this.recieveNotification();
    } catch (error) {
      console.error("Failed to initialize SignalR connection", error);
    }
  };

  loadNotifications = async () => {
    const notificationList: NotificationData[] = [];
    try {
      const result = await agent.Notifications.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        data.map((item) => {
          notificationList.push({
            ...item,
            createDate: item.createDate
              ? formatDateTime(item.createDate)
              : "No Set",
            updateDate: item.updateDate
              ? formatDateTime(item.updateDate?.toString())
              : "No Set",
            moreDetailsUrl: item.moreDetailsUrl ? item.moreDetailsUrl : "#",
          });
        });

        this.notifications = notificationList;

        this.unreadCount = data.filter((n) => !n.isRead).length;
      });
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  ReadToggle = async (id: string): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Notifications.ReadToggle(id);
      return { status: "success", data: response };
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      return { status: "error", error: error as string };
    }
  };

  deleteNotification = async (id: string): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Notifications.delete(id);
      runInAction(() => {
        this.notifications = this.notifications?.filter(
          (item) => item.id !== id
        );
      });
      return { status: "success", data: response };
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      return { status: "error", error: error as string };
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();

    if (this.takeCount) params.append("count", this.takeCount.toString());
    // if (this.isRead) params.append("isRead", this.isRead);
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  clearNotification = () => {
    this.notifications = undefined;
  };

  setCountParam = (count: number) => {
    this.takeCount = count;
  };

  setIsReadParam = (isRead: boolean|null) => {
    this.isRead = String(isRead);
  };

  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setDateFilter = (from: string, to: string) => {
    this.fromDate = from;
    this.toDate = to;
  };
}
