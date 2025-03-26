// app/wizard/components/Stepper.tsx
"use client";
import {
  Box,
  Button,
  Stepper as MuiStepper,
  Step,
  StepLabel,
} from "@mui/material";

export default function Stepper({
  steps,
  activeStep,
  children,
  onNext,
  onBack,
}: {
  steps: string[];
  activeStep: number;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Box sx={{ mt: 4 }}>{children}</Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={onBack}>
          قبلی
        </Button>
        <Button variant="contained" onClick={onNext}>
          {activeStep === steps.length - 1 ? "پایان" : "بعدی"}
        </Button>
      </Box>
    </Box>
  );
}
