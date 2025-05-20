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

export const maskEmail = (email: string): string => {
  const [localPart, domainPart] = email.split("@");

  if (!localPart || !domainPart) {
    return email; // fallback if invalid
  }

  // Handle local part (before @)
  const visibleLocal = localPart.slice(0, 2); // first 2 letters
  const maskedLocal = visibleLocal + "***";

  // Handle domain part (after @)
  const [domainName, domainExtension] = domainPart.split(".");

  const visibleDomain = domainName.charAt(0); // first letter of domain
  const maskedDomain = visibleDomain + "***";

  return `${maskedLocal}@${maskedDomain}.${domainExtension}`;
};

export function getInitials(fullName: string): string {
  const names = fullName.trim().split(/\s+/);
  const firstTwo = names.slice(0, 2);
  return firstTwo.map((name) => name[0].toUpperCase()).join("");
}
