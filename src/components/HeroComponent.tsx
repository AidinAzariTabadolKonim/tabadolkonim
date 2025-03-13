"use client";

import { useState } from "react";
import { Box, Button, Typography, Stack, Modal } from "@mui/material";
import { motion } from "framer-motion";
import { useUser, SignIn } from "@clerk/nextjs";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface HeroComponentProps {
  onAddAccountClick: () => void;
  onCheckListClick: () => void;
}

export default function HeroComponent({
  onAddAccountClick,
  onCheckListClick,
}: HeroComponentProps) {
  const { user } = useUser();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Handle "Add your own account" button click
  const handleAddAccount = () => {
    if (user) {
      onAddAccountClick();
    } else {
      setIsSignInOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)", // Instagram-inspired gradient
        color: "white",
        px: { xs: 2, sm: 4 }, // Responsive padding
      }}
    >
      {/* Header Title with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, // Responsive font size
            fontWeight: "bold",
          }}
        >
          به تبادل کنیم خوش آمدید
        </Typography>
      </motion.div>

      {/* Subtitle with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" } }} // Responsive font size
        >
          فالوور گیری رایگان در اینستا گرام و تبادل با دیگران
        </Typography>
      </motion.div>

      {/* Buttons Stack with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }} // Hover animation
            whileTap={{ scale: 0.95 }} // Tap animation
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddAccount}
            sx={{
              borderRadius: "16px", // Rounded corners
              bgcolor: "#405de6", // Instagram blue-purple shade
              "&:hover": { bgcolor: "#374dc7" },
            }}
          >
            اضافه کردن حساب خود
          </Button>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="secondary"
            size="large"
            onClick={onCheckListClick}
            sx={{
              borderRadius: "16px",
              bgcolor: "#fd1d1d", // Instagram red shade
              "&:hover": { bgcolor: "#e01b1b" },
            }}
          >
            مشاهده لیست حساب‌ها
          </Button>
        </Stack>
      </motion.div>

      {/* Video Button with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box sx={{ m: 4 }}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outlined"
            startIcon={<PlayArrowIcon />}
            onClick={() =>
              console.log("Video button clicked - placeholder for popup")
            }
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "16px",
              "&:hover": {
                borderColor: "#e0e0e0",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            اینجا کجاست؟
          </Button>
        </Box>
      </motion.div>

      {/* Sign-in Modal */}
      <Modal
        open={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        aria-labelledby="sign-in-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <SignIn />
        </Box>
      </Modal>
    </Box>
  );
}
