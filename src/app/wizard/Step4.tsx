// app/wizard/Step4.tsx
"use client";
import { TextField, Box, Typography } from "@mui/material";
import { useWizard } from "./context/WizardContext";
export default function Step4() {
  const { data, setData } = useWizard();
  return (
    <Box sx={{ p: 3 }}>
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
