// components/SocialShare.tsx
import { useState } from "react";
import { IconButton, Fade } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const SocialShare = () => {
  const [showIcons, setShowIcons] = useState(false);

  const toggleIcons = () => setShowIcons(!showIcons);

  return (
    <div>
      <IconButton onClick={toggleIcons}>
        <ShareIcon />
      </IconButton>
      <Fade in={showIcons}>
        <div>
          <IconButton href="https://instagram.com" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://linkedin.com" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </div>
      </Fade>
    </div>
  );
};
