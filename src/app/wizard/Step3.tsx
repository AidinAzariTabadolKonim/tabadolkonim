// app/wizard/Step3.tsx
"use client";
import { useState } from "react";
import {
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import { useWizard } from "./context/WizardContext";
import Step3Guide from "./component/Step3Guide";
import { ExpandMoreSharp } from "@mui/icons-material";

interface ProductFeature {
  feature: string;
  benefit: string;
}

export default function Step3() {
  const { data, setData } = useWizard();
  const [feature, setFeature] = useState("");
  const [benefit, setBenefit] = useState("");

  const handleAddFeature = () => {
    if (!feature.trim() || !benefit.trim()) return;

    const newFeature: ProductFeature = {
      feature: feature.trim(),
      benefit: benefit.trim(),
    };

    setData({
      features: [...(data.features || []), newFeature],
    });
    setFeature("");
    setBenefit("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step3Guide />
        </AccordionDetails>
      </Accordion>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="ویژگی محصول"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
        <TextField
          label="مزیت برای مشتری"
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleAddFeature}
          disabled={!feature.trim() || !benefit.trim()}
        >
          افزودن
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        {data.features?.map((item: ProductFeature, index: number) => (
          <Chip
            key={index}
            label={`${item.feature} → ${item.benefit}`}
            onDelete={() => {
              const newFeatures = [...(data.features || [])];
              newFeatures.splice(index, 1);
              setData({ features: newFeatures });
            }}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <TextField
        fullWidth
        label="نقطه تمایز اصلی (USP)"
        value={data.usp || ""}
        onChange={(e) => setData({ usp: e.target.value })}
      />
    </Box>
  );
}
