"use client";

import { Box, Typography } from "@mui/material";
import { InstagramAccount, WatchlistItem } from "../../types";
import AccountRow from "../../components/AccountRow";

interface WatchlistSectionProps {
  watchlist: WatchlistItem[];
  allAccounts: InstagramAccount[];
  rateAccount: (accountId: string, stars: number) => void;
  addToWatchlist: (accountId: string) => void;
  deleteFromWatchlist: (watchlistId: string) => void;
}

export default function WatchlistSection({
  watchlist,
  allAccounts,
  rateAccount,
  addToWatchlist,
  deleteFromWatchlist,
}: WatchlistSectionProps) {
  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        لیست تماشا
      </Typography>
      {watchlist.map((item) => {
        const account = allAccounts?.find((a) => a.$id === item.accountId);
        return account ? (
          <AccountRow
            key={item.$id}
            account={account}
            rateAccount={rateAccount}
            addToWatchlist={addToWatchlist}
            deleteFromWatchlist={deleteFromWatchlist}
            isInWatchlist={true}
            watchlistItemId={item.$id} // Pass the watchlist item ID
          />
        ) : (
          <Typography key={item.$id}>حساب یافت نشد</Typography>
        );
      })}
    </Box>
  );
}
