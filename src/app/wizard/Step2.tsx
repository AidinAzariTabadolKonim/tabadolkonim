// app/wizard/Step2.tsx
"use client";
import { Autocomplete, TextField, Box } from "@mui/material";
import { PAIN_POINTS, DESIRES, GENDER_OPTIONS } from "./data/suggestions";
import { useWizard } from "./context/WizardContext";
import { stringsToOptions, optionsToStrings } from "./utils/option-converters";

export default function Step2() {
  const { data, setData } = useWizard();

  return (
    <Box sx={{ p: 3 }}>
      <Autocomplete
        options={GENDER_OPTIONS}
        value={GENDER_OPTIONS.find((opt) => opt.value === data.gender) || null}
        onChange={(_, newValue) => setData({ gender: newValue?.value || "" })}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="جنسیت" sx={{ mb: 3 }} />
        )}
      />

      <Autocomplete
        multiple
        options={PAIN_POINTS}
        value={stringsToOptions(data.painPoints || [], PAIN_POINTS)}
        onChange={(_, newValue) =>
          setData({ painPoints: optionsToStrings(newValue || []) })
        }
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="مشکلات مخاطب" sx={{ mb: 3 }} />
        )}
      />

      <Autocomplete
        multiple
        options={DESIRES}
        value={stringsToOptions(data.desires || [], DESIRES)}
        onChange={(_, newValue) =>
          setData({ desires: optionsToStrings(newValue || []) })
        }
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="خواسته‌های مخاطب" />
        )}
      />
    </Box>
  );
}
