import React from "react";
import { BookingStatus } from "../../types/booking";

type StatusBadgeProps = {
  status: keyof typeof BookingStatus | string; // يمكن أن يكون Enum أو String
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusColors = {
    [BookingStatus.Pending]: {
      text: "text-orange-500",
      bg: "bg-orange-500",
      border: "border-orange-500",
    },
    [BookingStatus.InProcess]: {
      text: "text-sky-500",
      bg: "bg-sky-500",
    },
    [BookingStatus.Canceled]: {
      text: "text-slate-500",
      bg: "bg-slate-500",
    },
    [BookingStatus.Completed]: {
      text: "text-green-500",
      bg: "bg-green-500",
    },
  };

  const statusColor =
    statusColors[BookingStatus[status as keyof typeof BookingStatus]];

  if (!statusColor) {
    return (
      <div className="inline-flex items-center gap-2 border border-gray-400 rounded-2xl p-2 my-1 text-gray-500">
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl p-2 my-1 ${statusColor.text}`}
    >
      <span className="rounded-full">
        <div className={`w-2 h-2 ${statusColor.bg} rounded-full`}></div>
      </span>
      <p>{status}</p>
    </div>
  );
};

export default StatusBadge;
