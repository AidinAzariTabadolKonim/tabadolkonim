// app/wizard/Step4.tsx
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
import Step4Guide from "./component/Step4Guide";
import { ExpandMoreSharp } from "@mui/icons-material";
export default function Step4() {
  const { data, setData } = useWizard();
  return (
    <Box sx={{ p: 3 }}>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step4Guide />
        </AccordionDetails>
      </Accordion>
      <Typography variant="h6" sx={{ mb: 2 }}>
        ایده اصلی پیام:
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={data.coreIdea}
        onChange={(e) => setData({ ...data, coreIdea: e.target.value })}
        placeholder="مثال: صرفه‌جویی 10 ساعت در هفته با برنامه‌ریزی خودکار"
      />
    </Box>
  );
}
