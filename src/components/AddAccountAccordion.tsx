"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  MenuItem,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SignedIn } from "@clerk/nextjs";
import { CATEGORIES } from "../types";
import { useState } from "react";

interface AddAccountAccordionProps {
  newUsername: string;
  setNewUsername: (value: string) => void;
  newLink: string;
  setNewLink: (value: string) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  wouldLikeBack: boolean;
  setWouldLikeBack: (value: boolean) => void;
  wouldShareBack: boolean;
  setWouldShareBack: (value: boolean) => void;
  wouldFollowBack: boolean;
  setWouldFollowBack: (value: boolean) => void;
  wouldCommentBack: boolean;
  setWouldCommentBack: (value: boolean) => void;
  hasSupportGroup: boolean;
  setHasSupportGroup: (value: boolean) => void;
  hasInstagramMarketingBusiness: boolean;
  setHasInstagramMarketingBusiness: (value: boolean) => void;
  handleAddAccount: () => Promise<void>;
  addLoading: boolean;
  addError: string | null;
}

export default function AddAccountAccordion({
  newUsername,
  setNewUsername,
  newLink,
  setNewLink,
  newCategory,
  setNewCategory,
  wouldLikeBack,
  setWouldLikeBack,
  wouldShareBack,
  setWouldShareBack,
  wouldFollowBack,
  setWouldFollowBack,
  wouldCommentBack,
  setWouldCommentBack,
  hasSupportGroup,
  setHasSupportGroup,
  hasInstagramMarketingBusiness,
  setHasInstagramMarketingBusiness,
  handleAddAccount,
  addLoading,
  addError,
}: AddAccountAccordionProps) {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const validateFields = () => {
    let isValid = true;

    if (!newUsername.trim()) {
      setUsernameError("نام کاربری نمی‌تواند خالی باشد");
      isValid = false;
    } else {
      setUsernameError(null);
    }

    if (!newLink.trim()) {
      setLinkError("لینک اینستاگرام نمی‌تواند خالی باشد");
      isValid = false;
    } else {
      setLinkError(null);
    }

    if (!newCategory.trim()) {
      setCategoryError("دسته‌بندی باید انتخاب شود");
      isValid = false;
    } else {
      setCategoryError(null);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      await handleAddAccount();
    }
  };

  return (
    <SignedIn>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>افزودن حساب جدید</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="نام کاربری"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            label="لینک اینستاگرام"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="https://www.instagram.com/username/"
            required
            error={!!linkError}
            helperText={linkError}
          />
          <TextField
            select
            label="دسته‌بندی"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            error={!!categoryError}
            helperText={categoryError}
          >
            <MenuItem value="" disabled>
              انتخاب دسته‌بندی
            </MenuItem>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={wouldLikeBack}
                  onChange={(e) => setWouldLikeBack(e.target.checked)}
                />
              }
              label="مایل به پس گرفتن"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={wouldShareBack}
                  onChange={(e) => setWouldShareBack(e.target.checked)}
                />
              }
              label="مایل به اشتراک‌گذاری مجدد"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={wouldFollowBack}
                  onChange={(e) => setWouldFollowBack(e.target.checked)}
                />
              }
              label="مایل به فالو کردن مجدد"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={wouldCommentBack}
                  onChange={(e) => setWouldCommentBack(e.target.checked)}
                />
              }
              label="مایل به کامنت گذاشتن مجدد"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={hasSupportGroup}
                  onChange={(e) => setHasSupportGroup(e.target.checked)}
                />
              }
              label="دارای گروه پشتیبانی"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={hasInstagramMarketingBusiness}
                  onChange={(e) =>
                    setHasInstagramMarketingBusiness(e.target.checked)
                  }
                />
              }
              label="دارای کسب‌وکار بازاریابی اینستاگرام"
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={addLoading}
            sx={{ mt: 2 }}
            fullWidth
          >
            {addLoading ? "در حال افزودن..." : "افزودن"}
          </Button>
          {addError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {addError}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </SignedIn>
  );
}
