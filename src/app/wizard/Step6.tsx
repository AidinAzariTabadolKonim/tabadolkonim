// app/wizard/Step6.tsx
"use client";
import { TextField, Box } from "@mui/material";
import { useWizard } from "./context/WizardContext";
export default function Step6() {
  const { data, setData } = useWizard();

  return (
    <Box sx={{ p: 3 }}>
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
