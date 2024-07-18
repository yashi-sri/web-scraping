import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isValidDomain(domain) {
  const domainRegex = /^(?:(?:https?|ftp):\/\/)?(?:[\w-]+\.)+[a-z]{2,}$/i;
  return domainRegex.test(domain);
}
