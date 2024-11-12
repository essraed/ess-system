import { ZodIssue } from "zod";
import { differenceInYears } from "date-fns";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return ""

  const date = new Date(dateString);

  // Format the date part as DD-MM-YYYY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  const datePart = `${day}-${month}-${year}`;

  // Format the time part as HH:MM AM/PM
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} ${timePart}`;
}

export async function saveToken(token: string | null | undefined) {
  if (typeof window === 'undefined') return null;

  if (token) {
    Cookies.set('userAuth', token, { expires: 7 });
  } else {
    Cookies.remove('userAuth');
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;

  return Cookies.get('userAuth') || null;
}

export default function handleErrors(error: string | ZodIssue[]) {
  const errors: string[] = [];

  if (Array.isArray(error)) {
    error.forEach((err: any) => {
      errors.push(err as string);
    });
  } else {
    errors.push(error);
    toast.error(error);
  }

  return errors;
}


export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function separateCamelCase(str: string): string {
  const capitalised = capitalizeFirstLetter(str)
  return capitalised.replace(/([a-z])([A-Z])/g, '$1 $2');
}