"use client";

import { useState } from "react";
import { InstagramAccount } from "../types";

export function useAddAccount() {
  const [loading, setLoading] = useState(false);

  async function addAccount(
    data: Omit<
      InstagramAccount,
      "$id" | "totalStars" | "voteCount" | "userId" | "source"
    >,
    onSuccess: () => void
  ): Promise<{ success: boolean; message: string }> {
    setLoading(true);
    try {
      const response = await fetch("/api/accounts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "خطا در افزودن حساب");

      onSuccess();
      return { success: true, message: result.message };
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در افزودن حساب";
      console.error(err);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }

  return { addAccount, loading };
}
