// app/wizard/Step5.tsx
"use client";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Autocomplete,
  Box,
} from "@mui/material";
import {
  OFFER_TYPES,
  OFFER_CATEGORIES,
  URGENCY_OPTIONS,
} from "./data/suggestions";
import { useWizard } from "./context/WizardContext";
import { SyntheticEvent } from "react";
import Step5Guide from "./component/Step5Guide";
import { ExpandMoreSharp } from "@mui/icons-material";

export default function Step5() {
  const { data, setData } = useWizard();

  // Helper to safely handle null/undefined values
  const getValue = (
    value: string | undefined,
    options: Array<{ label: string; value: string }>
  ) => {
    return value
      ? options.find((option) => option.value === value) || null
      : null;
  };

  // Handle offerType change with proper typing
  const handleOfferTypeChange = (
    _: SyntheticEvent, // Explicitly type the event to avoid ESLint any warning
    newValue: { label: string; value: string } | null
  ) => {
    const offerType = (newValue?.value || "lead_magnet") as
      | "lead_magnet"
      | "sales"; // Default to "lead_magnet" if null
    const defaultCategory =
      offerType === "lead_magnet" ? "lead_generation" : "sales_conversion";
    setData({ offerType, offerCategory: defaultCategory });
  };

  // Handle offerCategory change with proper typing
  const handleOfferCategoryChange = (
    _: SyntheticEvent,
    newValue: { label: string; value: string } | null
  ) => {
    const offerCategory = (newValue?.value || "lead_generation") as
      | "lead_generation"
      | "sales_conversion"
      | "upsell"
      | "cross_sell"
      | "retention"
      | "reactivation"
      | "referral"
      | "survey"; // Default to "lead_generation" if null
    setData({ offerCategory });
  };

  // Handle urgency change
  const handleUrgencyChange = (
    _: SyntheticEvent,
    newValue: { label: string; value: string } | null
  ) => {
    const urgency = newValue?.value || "";
    setData({ urgency });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        ساخت پیشنهاد ویژه
      </Typography>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step5Guide />
        </AccordionDetails>
      </Accordion>
      <Autocomplete
        options={OFFER_TYPES}
        value={getValue(data.offerType, OFFER_TYPES)}
        onChange={handleOfferTypeChange}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="نوع پیشنهاد"
            sx={{ mb: 3 }}
            helperText="آیا هدف جذب لید است یا فروش مستقیم؟"
          />
        )}
      />

      <Autocomplete
        options={OFFER_CATEGORIES}
        value={getValue(data.offerCategory, OFFER_CATEGORIES)}
        onChange={handleOfferCategoryChange}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="دسته‌بندی پیشنهاد"
            sx={{ mb: 3 }}
            helperText="هدف کلی پیشنهاد را مشخص کنید."
          />
        )}
      />

      <TextField
        fullWidth
        label="مقدار پیشنهاد (مثلاً: دسترسی رایگان به درس اول)"
        value={data.offerValue || ""}
        onChange={(e) => setData({ offerValue: e.target.value })}
        sx={{ mb: 3 }}
        helperText="چه چیزی به مخاطب ارائه می‌دهید؟ برای لیدمگنت، ارزش رایگان و برای فروش، تخفیف یا باندل بنویسید."
      />

      <Autocomplete
        options={URGENCY_OPTIONS}
        value={getValue(data.urgency, URGENCY_OPTIONS)}
        onChange={handleUrgencyChange}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="فوریت/کمبود"
            sx={{ mb: 3 }}
            helperText="ایجاد حس فوریت برای اقدام سریع."
          />
        )}
      />
    </Box>
  );
}
