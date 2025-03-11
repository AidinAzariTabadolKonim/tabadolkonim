"use client";

import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import AccountRow from "./AccountRow";
import { InstagramAccount, WatchlistItem } from "../types";

interface AccountsTableProps {
  accounts: InstagramAccount[];
  rateAccount: (accountId: string, stars: number) => void;
  addToWatchlist: (accountId: string) => void;
  deleteFromWatchlist?: (watchlistId: string) => void;
  watchlist: WatchlistItem[]; // Fix type from string[] to WatchlistItem[]
  loading: boolean;
  error: string | null;
}

export default function AccountsTable({
  accounts,
  rateAccount,
  addToWatchlist,
  deleteFromWatchlist,
  watchlist,
  loading,
  error,
}: AccountsTableProps) {
  const [displayedAccounts, setDisplayedAccounts] = useState<
    InstagramAccount[]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 25;
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayedAccounts(accounts.slice(0, pageSize));
    setHasMore(accounts.length > pageSize);
  }, [accounts]);

  useEffect(() => {
    const currentObserverRef = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPageStart = displayedAccounts.length;
          const nextAccounts = accounts.slice(
            nextPageStart,
            nextPageStart + pageSize
          );
          setDisplayedAccounts((prev) => [...prev, ...nextAccounts]);
          setHasMore(nextPageStart + nextAccounts.length < accounts.length);
        }
      },
      { rootMargin: "100px" }
    );

    if (currentObserverRef) observer.observe(currentObserverRef);
    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [hasMore, displayedAccounts, accounts]);

  if (loading && accounts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#f28c38" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (accounts.length === 0) {
    return <Typography>هنوز حسابی اضافه نشده است</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {displayedAccounts.map((account) => (
        <AccountRow
          key={account.$id}
          account={account}
          rateAccount={rateAccount}
          addToWatchlist={addToWatchlist}
          deleteFromWatchlist={deleteFromWatchlist}
          isInWatchlist={watchlist.some(
            (item) => item.accountId === account.$id
          )}
          watchlistItemId={
            watchlist.find((item) => item.accountId === account.$id)?.$id
          }
        />
      ))}
      {hasMore && <div ref={observerRef} style={{ height: "20px" }} />}
    </Box>
  );
}
