import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateToken = () => {
  const min = 100000; // Minimum 6-figure number
  const max = 999999; // Maximum 6-figure number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
