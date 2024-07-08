import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleUnauthorized() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}
