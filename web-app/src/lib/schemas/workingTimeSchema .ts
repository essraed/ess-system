import { z } from 'zod';

export const workingTimeSchema = z.object({
  day: z.enum([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]), // Assuming DayOfWeek is an enum with these values
  fromTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "fromTime must be in HH:mm format (24-hour clock)"
    ),
  toTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "toTime must be in HH:mm format (24-hour clock)"
    ),
});

export type WorkingTimeSchema = z.infer<typeof workingTimeSchema>;
