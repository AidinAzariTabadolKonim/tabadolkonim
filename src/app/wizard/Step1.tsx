"use client";
import { useEffect, useState } from "react"; // Added useEffect and useState
import {
  Autocomplete,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import { STAGES, EMOTIONS, MARKETING_CHANNELS } from "./data/suggestions";
import { useWizard } from "./context/WizardContext";
import { useUser } from "@clerk/nextjs"; // Added useUser for Clerk authentication
import Step1Guide from "./component/Step1Guide";
import { ExpandMoreSharp } from "@mui/icons-material";

export default function Step1() {
  const { data, setData } = useWizard();
  const { isSignedIn } = useUser(); // Get Clerk user authentication status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Fetch API call limit when the component mounts
  useEffect(() => {
    if (!isSignedIn) return;

    const fetchApiLimit = async () => {
      try {
        const response = await fetch("/api/checkApiLimit");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const result = await response.json();
        setData({ remainingTries: result.remainingTries });
      } catch (err) {
        console.error("Error fetching API call limit:", err);
        setError(
          err instanceof Error ? err.message : "خطا در بررسی محدودیت درخواست"
        );
      }
    };

    fetchApiLimit();
  }, [isSignedIn, setData]);

  // Convert string values to option objects
  const getOptionFromValue = (value: string, options: typeof STAGES) =>
    options.find((option) => option.value === value) || null;
  const getValue = (
    value: string | undefined,
    options: Array<{ label: string; value: string }>
  ) => {
    return value
      ? options.find((option) => option.value === value) || null
      : null;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step1Guide />
        </AccordionDetails>
      </Accordion>

      {/* Display error message if fetching API limit fails */}
      {error && (
        <Typography sx={{ color: "#FF6200", mb: 2 }}>{error}</Typography>
      )}

      <TextField
        fullWidth
        label="نام کمپین"
        value={data.campaignName}
        onChange={(e) => setData({ campaignName: e.target.value })}
        sx={{ mb: 3 }}
      />

      <Autocomplete
        options={STAGES}
        value={getOptionFromValue(data.stage, STAGES)}
        onChange={(_, newValue) =>
          setData({
            stage: newValue?.value || "",
          })
        }
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="مرحله آگاهی مخاطب" />
        )}
        sx={{ mb: 3 }}
      />

      <Autocomplete
        options={EMOTIONS}
        value={getOptionFromValue(data.emotion, EMOTIONS)}
        onChange={(_, newValue) =>
          setData({
            emotion: newValue?.value || "",
          })
        }
        sx={{ mb: 3 }}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} label="احساس اصلی" />}
      />
      <Autocomplete
        options={MARKETING_CHANNELS}
        sx={{ mb: 3 }}
        value={getValue(data.channel, MARKETING_CHANNELS)}
        onChange={(_, newValue) => setData({ channel: newValue?.value || "" })}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="کانال بازاریابی" sx={{ mb: 3 }} />
        )}
      />
    </Box>
  );
}
