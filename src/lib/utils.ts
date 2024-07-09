import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ls } from "./LocalStorage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleUnauthorized() {
  ls.clear();
  window.location.href = "/login";
}
