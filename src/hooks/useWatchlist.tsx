"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { WatchlistItem } from "../types";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const fetchWatchlist = useCallback(async () => {
    if (!user) return { success: false, message: "لطفاً وارد شوید" };
    setLoading(true);
    try {
      const response = await fetch("/api/watchlist");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "خطا در بارگذاری لیست تماشا");
      setWatchlist(data);
      return { success: true, message: "لیست تماشا با موفقیت بارگذاری شد" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "خطا در بارگذاری لیست تماشا" };
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user, fetchWatchlist]);

  async function addToWatchlist(accountId: string) {
    if (!user) return { success: false, message: "لطفاً وارد شوید" };
    setLoading(true);
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "خطا در افزودن به لیست تماشا");
      await fetchWatchlist(); // Refresh watchlist
      return { success: true, message: result.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: "خطا در افزودن به لیست تماشا" };
    } finally {
      setLoading(false);
    }
  }

  async function deleteFromWatchlist(watchlistId: string) {
    if (!user) return { success: false, message: "لطفاً وارد شوید" };
    setLoading(true);
    try {
      const response = await fetch(`/api/watchlist/${watchlistId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "خطا در حذف از لیست تماشا");
      await fetchWatchlist(); // Refresh watchlist
      return { success: true, message: result.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: "خطا در حذف از لیست تماشا" };
    } finally {
      setLoading(false);
    }
  }

  return { watchlist, addToWatchlist, deleteFromWatchlist, loading };
}
