import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "beginner": return "success";
    case "intermediate": return "warning";
    case "advanced": return "danger";
    default: return "neutral";
  }
}

export function getDifficultyStars(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case "beginner": return 1;
    case "intermediate": return 2;
    case "advanced": return 3;
    default: return 1;
  }
}
