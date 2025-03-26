"use client";
import {
  Box,
  Button,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUser } from "@clerk/nextjs"; // Clerk hook to check user status
import { useWizard } from "../context/WizardContext"; // Import WizardContext

// Custom Step Connector with Orange Theme
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FF6200",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FF6200",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[500],
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

// Custom Step Label with Orange Theme
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-iconContainer": {
    "& .MuiStepIcon-root": {
      color: theme.palette.grey[500],
      "&.Mui-active": {
        color: "#FF6200",
      },
      "&.Mui-completed": {
        color: "#FF6200",
      },
      "& .MuiStepIcon-text": {
        fill: "white",
      },
    },
  },
  "& .MuiStepLabel-label": {
    color: theme.palette.grey[500],
    "&.Mui-active": {
      color: "#FF6200",
    },
    "&.Mui-completed": {
      color: "#FF6200",
    },
  },
}));

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
  const { isSignedIn } = useUser(); // Check if user is logged in
  const { resetWizardState } = useWizard(); // Get reset function from context

  // Handle "Begin Again" functionality
  const handleBeginAgain = () => {
    resetWizardState(); // Reset the wizard state
    onNext(); // This should reset activeStep to 0 in the parent component
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      {/* Box Wrapping the Stepper with Transparent Background and Orange Border */}
      <Box
        sx={{
          backgroundColor: "transparent",
          border: "2px solid #FF6200",
          borderRadius: "16px",
          padding: 2,
          mb: 4,
        }}
      >
        <MuiStepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomStepConnector />}
          sx={{
            backgroundColor: "transparent",
            "& .MuiStepConnector-root:first-of-type": {
              display: "none",
            },
            "& .MuiStepConnector-root:last-of-type": {
              display: "none",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </MuiStepper>
      </Box>

      {/* Step Content */}
      <Box sx={{ mt: 4 }}>{children}</Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={onBack}
          sx={{
            borderColor: "#FF6200",
            color: "#FF6200",
            "&:hover": {
              borderColor: "#E05700",
              backgroundColor: "rgba(255, 98, 0, 0.1)",
            },
            "&:disabled": {
              borderColor: "grey.500",
              color: "grey.500",
            },
          }}
        >
          قبلی
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleBeginAgain : onNext
            }
            disabled={activeStep === 0 && !isSignedIn} // Disable in Step 1 if not logged in
            sx={{
              backgroundColor: "#FF6200",
              "&:hover": {
                backgroundColor: "#E05700",
              },
              "&:disabled": {
                backgroundColor: "grey.500",
              },
            }}
          >
            {activeStep === steps.length - 1 ? "شروع دوباره" : "بعدی"}
          </Button>
          {activeStep === 0 && !isSignedIn && (
            <Typography sx={{ color: "#FF6200", mt: 1 }}>
              برای ادامه باید وارد شوید
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
