export const dialogFlags = {
  deleteDialog: "delete_dialog",
  completeDialog: "complete_dialog",
  cancelDialog: "cancel_dialog",
  inProocess:"in_dialog", 
};

export const dayOfWeekMap: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const allowedImageExtension = [
  "image/",
];

export const allowedTextsExtension = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const pageSizeOptions = [
  { name: "10" },
  { name: "15" },
  { name: "20" },
  { name: "25" },
  { name: "30" },
];

export const fileOptions = [
  { label: "Copy Of Passport", value: "idProof" },
  { label: "Passport Size Photo", value: "addressProof" },
  { label: "Copy Of Passport & UAE Residency Of a Relative", value: "photo" },
  { label: "Fly Tickets & Hotel Booking" , value: "photo" },
];

export const lostDepartments = [
  { value: "Medical DHA - AREA 6", label: "Medical DHA - AREA 6" },
  { value: "Medical DHA - AREA 7", label: "Medical DHA - AREA 7" },
  { value: "Medical DHA - AREA 6 XRAY", label: "Medical DHA - AREA 6 XRAY" },
  { value: "Medical DHA - AREA 7 XRAY", label: "Medical DHA - AREA 7 XRAY" },
  { value: "Medical OHC - AREA 4", label: "Medical OHC - AREA 4" },
  { value: "AREA 5", label: "AREA 5" },
  { value: "AMER - ZONE A", label: "AMER - ZONE A" },
  { value: "TAWJEEH - ZONE B", label: "TAWJEEH - ZONE B" },
  { value: "TYPING - ZONE C", label: "TYPING - ZONE C" },
  { value: "MAIN RECEPTION", label: "MAIN RECEPTION" },
  { value: "OTHER AREA", label: "OTHER AREA" },
];
export const CompalintDepartments = [
  { value: "AMER RECEPTION", label: "AMER RECEPTION" },
  { value: "AMER TYPING", label: "AMER TYPING" },
  { value: "HR", label: "HR" },
  { value: "DHA", label: "DHA" },
  { value: "ACCOUNTS", label: "ACCOUNTS" },
  { value: "CASHIER", label: "CASHIER" },
  { value: "TYPING", label: "TYPING" },
  { value: "MAIN RECEPTION", label: "MAIN RECEPTION" },
  { value: "OTHER", label: "OTHER" },
];