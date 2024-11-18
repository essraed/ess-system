import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { NotificationData, NotificationType } from "../../types/notification";
import { SIGNALR_HUB_URL } from "../../environment";
import * as signalR from "@microsoft/signalr";
import { convertEnumToString } from "../../lib/utils";
import { ActionResult } from "../../types";

export default class NotificationStore {
  notifications: NotificationData[] = [];
  unreadCount: number = 0;
  takeCount: number | null = null;
  connection: signalR.HubConnection | null = null;
  isRead: string | null = null;

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

            this.notifications.unshift({
              id: id,
              title,
              message: message,
              isRead: false,
              type: notificationType,
              moreDetailsUrl: moreDetailsUrl,
            });
            this.unreadCount += 1;
            console.log(
              `New notification received: ${id} ${title} ${message} ${notificationType} ${moreDetailsUrl}`
            );
          });
        }
      );
    }
  };

  initializeSignalR = async () => {
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
    try {
      const notifications = await agent.Notifications.getAll(this.axiosParams);
      runInAction(() => {
        this.notifications = notifications;
        this.unreadCount = notifications.filter((n) => !n.isRead).length;
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

  get axiosParams() {
    const params = new URLSearchParams();

    if (this.takeCount) params.append("count", this.takeCount.toString());
    if (this.isRead) params.append("isRead", this.isRead.toString());

    return params;
  }

  setCountParam = (count: number) => {
    this.takeCount = count
  }

  setIsReadParam = (isRead: boolean) => {
    this.isRead = String(isRead);
  }
}
