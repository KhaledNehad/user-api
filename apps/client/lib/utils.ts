import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { serverUrl } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getServerURL() {
  return serverUrl;
}
