"use client";

import {
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SignedIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { InstagramAccount } from "../types";
import React from "react";

interface AccountRowProps {
  account: InstagramAccount;
  rateAccount: (accountId: string, stars: number) => void;
  addToWatchlist: (accountId: string) => void;
  deleteFromWatchlist?: (watchlistId: string) => void; // Optional, only needed in watchlist context
  isInWatchlist: boolean;
  watchlistItemId?: string; // Optional, for watchlist deletion
}

export default function AccountRow({
  account,
  rateAccount,
  addToWatchlist,
  deleteFromWatchlist,
  isInWatchlist,
  watchlistItemId,
}: AccountRowProps) {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ minWidth: 150 }}>
          {account.username}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#f28c38",
            color: "#fff",
            "&:hover": { backgroundColor: "#e07b30" },
          }}
          href={account.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          بازدید
        </Button>
        <Typography variant="body1" sx={{ minWidth: 120 }}>
          {account.category}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating
            value={
              account.voteCount ? account.totalStars / account.voteCount : 0
            }
            onChange={(_, value) => value && rateAccount(account.$id, value)}
            precision={1}
            readOnly={!SignedIn}
          />
          <Typography variant="body2">({account.voteCount} رای)</Typography>
        </Box>
        <SignedIn>
          {isInWatchlist && deleteFromWatchlist && watchlistItemId ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteFromWatchlist(watchlistItemId)}
            >
              حذف از لیست تماشا
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => addToWatchlist(account.$id)}
              disabled={isInWatchlist}
            >
              افزودن به لیست تماشا
            </Button>
          )}
        </SignedIn>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اطلاعات بیشتر</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            <Chip
              label="مایل به پس گرفتن"
              color={account.wouldLikeBack ? "success" : "error"}
              size="small"
            />
            <Chip
              label="مایل به اشتراک‌گذاری"
              color={account.wouldShareBack ? "success" : "error"}
              size="small"
            />
            <Chip
              label="مایل به فالو"
              color={account.wouldFollowBack ? "success" : "error"}
              size="small"
            />
            <Chip
              label="مایل به کامنت"
              color={account.wouldCommentBack ? "success" : "error"}
              size="small"
            />
            <Chip
              label="گروه پشتیبانی"
              color={account.hasSupportGroup ? "success" : "error"}
              size="small"
            />
            <Chip
              label="کسب‌وکار بازاریابی"
              color={
                account.hasInstagramMarketingBusiness ? "success" : "error"
              }
              size="small"
            />
            <Chip
              label={
                account.source === "admin_search"
                  ? "اضافه شده توسط جستجوی اینستاگرام"
                  : "اضافه شده توسط کاربر"
              }
              sx={{ backgroundColor: "#f28c38", color: "#fff" }}
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
