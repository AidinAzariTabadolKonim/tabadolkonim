// src/types/index.ts
export interface InstagramAccount {
  $id: string;
  userId: string; // Added userId
  username: string;
  link: string;
  category: string;
  source: "admin_search" | "user_added";
  totalStars: number;
  voteCount: number;
  wouldLikeBack: boolean;
  wouldShareBack: boolean;
  wouldFollowBack: boolean;
  wouldCommentBack: boolean;
  hasSupportGroup: boolean;
  hasInstagramMarketingBusiness: boolean;
}

export interface Rating {
  $id: string;
  accountId: string;
  userId: string;
  stars: number;
}

export interface WatchlistItem {
  $id: string;
  userId: string;
  accountId: string;
}

export const CATEGORIES = [
  "هنری",
  "متن های زیبا",
  "بلاگ شخصی",
  "گالری",
  "پوشاک",
  "رمزارز",
  "خدمات زیبایی بانوان",
  "لوازم شخصی",
  "خدمات موبایل",
  "آرایشی بهداشتی",
  "اکسسوری و زیورآلات",
  "پیج تبلیغات",
  "غذایی",
  "ورزشی",
  "لوازم جانبی و الکترونیکی",
  "ساختمان و ملک",
  "حمل و نقل",
  "آموزشی",
  "لوازم خانگی",
  "سایر",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface AccountsTableProps {
  accounts: InstagramAccount[];
  rateAccount: (accountId: string, stars: number) => void;
  addToWatchlist: (accountId: string) => void;
  deleteFromWatchlist?: (watchlistId: string) => void;
  watchlist: WatchlistItem[]; // Fix type from string[] to WatchlistItem[]
  loading: boolean;
  error: string | null;
}
