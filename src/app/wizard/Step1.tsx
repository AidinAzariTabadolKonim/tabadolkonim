// app/wizard/Step1.tsx
"use client";
import { Autocomplete, TextField, Box } from "@mui/material";
import { STAGES, EMOTIONS, MARKETING_CHANNELS } from "./data/suggestions";
import { useWizard } from "./context/WizardContext";

export default function Step1() {
  const { data, setData } = useWizard();

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
