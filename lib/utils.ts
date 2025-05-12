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

export function getInitials(fullname: string): string {
  if (!fullname?.trim()) return ""; // Handle empty/null input

  const names = fullname.trim().split(/\s+/); // Split by any whitespace
  let initials = "";

  // Always take first letter of first name
  if (names[0]) initials += names[0][0];

  // Take first letter of last name if exists
  if (names.length > 1) initials += names[names.length - 1][0];

  return initials.toUpperCase();
}
