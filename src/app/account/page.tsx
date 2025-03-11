"use client";

import { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { InstagramAccount } from "../../types";
import { useAccounts } from "@hooks/useAccounts";
import { useWatchlist } from "@hooks/useWatchlist";
import MyAccountsSection from "./MyAccountsSection";
import WatchlistSection from "./WatchlistSection";
import { useRateAccount } from "@hooks/useRateAccount";
export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { allAccounts, loading: accountsLoading } = useAccounts();
  const {
    watchlist,
    loading: watchlistLoading,
    addToWatchlist,
    deleteFromWatchlist,
  } = useWatchlist();
  const { rateAccount } = useRateAccount();
  const [myAccounts, setMyAccounts] = useState<InstagramAccount[]>([]);

  useEffect(() => {
    async function fetchMyAccounts() {
      if (!user) return;
      try {
        const response = await fetch(`/api/accounts?userId=${user.id}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch my accounts");
        setMyAccounts(data);
      } catch (err) {
        console.error("Error fetching my accounts:", err);
      }
    }
    if (isLoaded && user) fetchMyAccounts();
  }, [user, isLoaded]);

  if (!isLoaded || accountsLoading || watchlistLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        حساب من
      </Typography>
      <MyAccountsSection
        myAccounts={myAccounts}
        setMyAccounts={setMyAccounts}
      />
      <WatchlistSection
        watchlist={watchlist}
        allAccounts={allAccounts}
        rateAccount={rateAccount}
        addToWatchlist={addToWatchlist}
        deleteFromWatchlist={deleteFromWatchlist} // Add this
      />
    </Container>
  );
}
