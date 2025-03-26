// app/wizard/Step8.tsx
"use client";
import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PromptAccordion } from "./component/PromptAccordion";
import { SocialShare } from "./component/SocialShare";
import { useGenerateForStep8 } from "./hooks/useGenerate";

export default function Step8() {
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
      <Button
        variant="contained"
        onClick={handleGenerate}
        disabled={loading}
        sx={{ mb: 3 }}
        fullWidth
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
            "& .MuiAlert-message": { mr: 2 }, // Margin right of message
            "& .MuiAlert-action": { ml: 2, p: 0 }, // Margin left of action (close button)
            "& .MuiAlert-icon": { mr: 1 }, // Margin right of icon
          }}
        >
          متن با موفقیت کپی شد!
        </Alert>
      </Snackbar>
    </Box>
  );
}
