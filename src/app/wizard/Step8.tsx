"use client";
import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PromptAccordion } from "./component/PromptAccordion";
import { SocialShare } from "./component/SocialShare";
import { useGenerateForStep8 } from "./hooks/useGenerate";
import Step8Guide from "./component/Step8Guide";
import { ExpandMoreSharp } from "@mui/icons-material";
import { useWizard } from "./context/WizardContext";

export default function Step8() {
  const { isSignedIn } = useUser();
  const { data } = useWizard(); // Get remainingTries from context
  const {
    generatedText: initialGeneratedText,
    prompt,
    loading,
    snackbarOpen,
    handleGenerate,
    handleCloseSnackbar,
    handleCopyToClipboard,
  } = useGenerateForStep8();
  const [generatedText, setGeneratedText] = useState(initialGeneratedText);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyGeneratedText = () => {
    if (textAreaRef.current) {
      handleCopyToClipboard(generatedText);
    }
  };

  useEffect(() => {
    setGeneratedText(initialGeneratedText);
  }, [initialGeneratedText]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Generate Button with Remaining Tries Display - Moved Above Accordion */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4, // Add margin below the section
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Stack button and counter vertically
            alignItems: "center",
            gap: 2, // Add space between button and counter
          }}
        >
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading || !isSignedIn}
            sx={{
              backgroundColor: isSignedIn && !loading ? "#FF6200" : "grey.500",
              "&:hover": {
                backgroundColor:
                  isSignedIn && !loading ? "#E05700" : "grey.500",
              },
              width: { xs: "100%", sm: "auto" }, // Responsive width
              px: 4,
              py: 1.5,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                در حال تولید...
              </>
            ) : (
              "تولید متن تبلیغاتی"
            )}
          </Button>
          {isSignedIn ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#1C2526", // Dark background
                color: "#FF6200", // Orange text
                borderRadius: "12px",
                px: 2,
                py: 1,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
                border: "1px solid #FF6200", // Orange border
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                تعداد تلاش‌های باقی‌مانده: {data.remainingTries}
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ color: "#FF6200", mt: 1 }}>
              ابتدا باید وارد شوید
            </Typography>
          )}
        </Box>
      </Box>

      {/* Accordion */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreSharp />}>
          <Typography variant="h6">راهنما</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step8Guide />
        </AccordionDetails>
      </Accordion>

      {/* Prompt Accordion */}
      <PromptAccordion prompt={prompt} onCopy={handleCopyToClipboard} />

      {/* Generated Text */}
      {generatedText && (
        <Box sx={{ position: "relative", mt: 2 }}>
          <TextField
            inputRef={textAreaRef}
            label="متن تولید شده"
            multiline
            rows={10}
            fullWidth
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleCopyGeneratedText}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
          />
          <SocialShare />
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            "& .MuiAlert-message": { mr: 2 },
            "& .MuiAlert-action": { ml: 2, p: 0 },
            "& .MuiAlert-icon": { mr: 1 },
          }}
        >
          متن با موفقیت کپی شد!
        </Alert>
      </Snackbar>
    </Box>
  );
}
