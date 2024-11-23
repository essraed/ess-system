import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { NotificationData, NotificationType } from "../../types/notification";
import { SIGNALR_HUB_URL } from "../../environment";
import * as signalR from "@microsoft/signalr";
import { convertEnumToString } from "../../lib/utils";
import { ActionResult } from "../../types";
import { PaginationData, PagingParams } from "../../types/pagination";
import { NotificationSchema } from "../../lib/schemas/notificationSchema";

export default class NotificationStore {
  notifications: NotificationData[] | null = [];
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
      console.log("Connected to SignalR hub");
    } catch (err) {
      console.error("Initial connection failed. Retrying...", err);
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
      console.log("SignalR already initialized.");
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

  get axiosParams() {
    const params = new URLSearchParams();

    if (this.takeCount) params.append("count", this.takeCount.toString());
    if (this.isRead) params.append("isRead", this.isRead.toString());
    if (this.fromDate) params.append("from", this.fromDate);
    if (this.toDate) params.append("to", this.toDate);
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  loadNotifications = async () => {
    try {
      const result = await agent.Notifications.getAll(this.axiosParams);
      runInAction(() => {
        const { pageNumber, pageSize, data, pageCount, totalCount } = result;
        this.setPagination({ pageNumber, pageSize, pageCount, totalCount });

        this.notifications = data;
      });
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  addNotification = async (
    notification: NotificationSchema
  ): Promise<ActionResult<string>> => {
    try {
      const response = await agent.Notifications.create(notification);
      runInAction(() => {
        this.notifications = this.notifications
          ? [...this.notifications, response]
          : [response]; // Add new car to the list
      });
      return { status: "success", data: response.id };
    } catch (error) {
      console.error("Error adding notification: ", error);
      return { status: "error", error: error as string };
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

  setCountParam = (count: number) => {
    this.takeCount = count;
  };

  setIsReadParam = (isRead: boolean) => {
    this.isRead = String(isRead);
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: PaginationData) => {
    this.pagination = pagination;
  };

  clearNotification = () => {
    this.notifications = null;
  };

  setDateFilter = (from: string, to: string) => {
    this.fromDate = from;
    this.toDate = to;
  };
}
