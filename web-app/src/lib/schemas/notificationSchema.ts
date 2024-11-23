import { z } from "zod";

export const notificationSchema = z.object({
  message: z.string().min(1, "Message is required"),
  title: z.string().min(1, "Title is required"),
  type: z.enum(["General", "Alert", "Reminder"]), // Matches the NotificationType enum
  url: z.string().url("Must be a valid URL").optional(), // URL is optional
});

// Infer the TypeScript type if needed
export type NotificationSchema = z.infer<typeof notificationSchema>;
