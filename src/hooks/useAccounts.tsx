"use client";

import { useState, useEffect } from "react";
import { InstagramAccount } from "../types";

export function useAccounts() {
  const [allAccounts, setAllAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAccounts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/accounts");
      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          text.startsWith("<!DOCTYPE")
            ? "خطا در سرور"
            : JSON.parse(text).error ||
              `خطا در بارگذاری حساب‌ها (کد: ${response.status})`
        );
      }
      const data = await response.json();
      setAllAccounts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در بارگذاری حساب‌ها");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  return {
    allAccounts,
    loading,
    error,
    refetch: fetchAllAccounts,
  };
}
