"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export function useRateAccount() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  async function rateAccount(accountId: string, stars: number) {
    if (!user) return { success: false, message: "لطفاً وارد شوید" };
    setLoading(true);

    try {
      const response = await fetch("/api/accounts/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, stars }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "خطا در ثبت امتیاز");
      return { success: true, message: result.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: "خطا در ثبت امتیاز" };
    } finally {
      setLoading(false);
    }
  }

  return { rateAccount, loading };
}
