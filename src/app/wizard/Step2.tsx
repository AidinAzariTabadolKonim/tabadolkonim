// app/wizard/Step2.tsx
"use client";
import {
  Autocomplete,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import { PAIN_POINTS, DESIRES, GENDER_OPTIONS } from "./data/suggestions";
import { useWizard } from "./context/WizardContext";
import { stringsToOptions, optionsToStrings } from "./utils/option-converters";
import Step2Guide from "./component/Step2Guide";
import { ExpandMoreSharp } from "@mui/icons-material";

export default function Step2() {
  const { data, setData } = useWizard();

  return (
    <Box sx={{ p: 3 }}>
        <Accordion sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step2Guide />
        </AccordionDetails>
      </Accordion>
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
