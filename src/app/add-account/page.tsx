"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useAddAccount } from "@hooks/useAddAccount";
import { CATEGORIES } from "../../types";
import { useUser } from "@clerk/nextjs";

export default function AddAccount() {
  const { addAccount, loading, error } = useAddAccount();
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async () => {
    if (!user) return;
    await addAccount({
      username,
      link,
      category,
      source: "user_added",
    });
    setUsername("");
    setLink("");
    setCategory("");
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        افزودن حساب جدید
      </Typography>
      <TextField
        label="نام کاربری"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="لینک اینستاگرام"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        displayEmpty
      >
        <MenuItem value="" disabled>
          انتخاب دسته‌بندی
        </MenuItem>
        {CATEGORIES.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "در حال افزودن..." : "افزودن"}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
}
