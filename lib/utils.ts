import { Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";

// Utility for merging class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Animation variants
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-50px",
  amount: 0.2 as const,
};

// Placeholder images (high-quality food/chef photography)
export const images = {
  hero: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=90",
  heroChef: "/images/chefchiom-hero.webp", // Custom image of Chef Chioma Okonkwo
  about: "/images/chioma-about.webp", // Custom image of Chef Chioma Okonkwo for about section
  cooking: "/images/chiomacooking.webp", // Custom image of Chef Chioma Okonkwo cooking in the kitchen
  plating:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
  dish1: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  dish2:
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  dish3:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  dish4:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
  dish5:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  dish6:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  privateDining:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
  catering:
    "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85",
  classes:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85",
  menuDev:
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=85",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85",
  ingredients:
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=85",
  table:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
};

// Format currency
export function formatCurrency(
  amount: number,
  currency: string = "NGN",
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

// Generate slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Nigerian cuisine categories
export const cuisineCategories = [
  "Nigerian Classics",
  "Modern Nigerian",
  "Fusion",
  "Seafood",
  "Vegetarian",
  "Desserts",
  "Appetizers",
  "Soups & Stews",
];

// Service types
export const serviceTypes = [
  "Private Dining",
  "Event Catering",
  "Cooking Classes",
  "Menu Development",
  "Wine Pairing",
  "Corporate Events",
];
