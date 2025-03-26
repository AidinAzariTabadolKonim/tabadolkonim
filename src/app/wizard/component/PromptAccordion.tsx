// components/PromptAccordion.tsx
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const PromptAccordion = ({
  prompt,
  onCopy,
}: {
  prompt: string;
  onCopy: (text: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    onCopy(prompt);
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>نمایش پرامپت</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{prompt}</Typography>
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
};
