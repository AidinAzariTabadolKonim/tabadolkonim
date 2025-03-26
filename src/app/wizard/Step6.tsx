// app/wizard/Step6.tsx
"use client";

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import { useWizard } from "./context/WizardContext";
import Step6Guide from "./component/Step6Guide";
import { ExpandMoreSharp } from "@mui/icons-material";
export default function Step6() {
  const { data, setData } = useWizard();

  return (
    <Box sx={{ p: 3 }}>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step6Guide />
        </AccordionDetails>
      </Accordion>
      <TextField
        fullWidth
        label="دعوت به اقدام (CTA)"
        value={data.cta}
        onChange={(e) => setData({ cta: e.target.value })}
        placeholder="مثال: همین حالا ثبت‌نام کنید!"
      />
    </Box>
  );
}
