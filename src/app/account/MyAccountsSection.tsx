"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  TableHead,
} from "@mui/material";
import { InstagramAccount } from "../../types";

interface MyAccountsSectionProps {
  myAccounts: InstagramAccount[];
  setMyAccounts: (accounts: InstagramAccount[]) => void;
}

export default function MyAccountsSection({
  myAccounts,
  setMyAccounts,
}: MyAccountsSectionProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<InstagramAccount | null>(null);

  const handleEdit = async () => {
    if (!editData) return;
    try {
      const response = await fetch(`/api/accounts/${editData.$id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(`Failed to update: ${responseData.error}`);
      setMyAccounts(
        myAccounts.map((a) => (a.$id === editData.$id ? editData : a))
      );
      setEditing(null);
      setEditData(null);
    } catch (err) {
      console.error("Error updating account:", err);
    }
  };

  const handleDelete = async (accountId: string) => {
    try {
      const response = await fetch(`/api/accounts/${accountId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to delete account");
      setMyAccounts(myAccounts.filter((a) => a.$id !== accountId));
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  const startEditing = (account: InstagramAccount) => {
    setEditing(account.$id);
    setEditData({ ...account });
  };

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 2, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        حساب‌های من
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>نام کاربری</TableCell>
            <TableCell sx={{ textAlign: "center" }}>لینک</TableCell>
            <TableCell sx={{ textAlign: "center" }}>اقدامات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myAccounts.map((account) => (
            <TableRow key={account.$id}>
              {editing === account.$id && editData ? (
                <>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TextField
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TextField
                      value={editData.link}
                      onChange={(e) =>
                        setEditData({ ...editData, link: e.target.value })
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.wouldLikeBack}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                wouldLikeBack: e.target.checked,
                              })
                            }
                          />
                        }
                        label="مایل به پس گرفتن"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.wouldShareBack}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                wouldShareBack: e.target.checked,
                              })
                            }
                          />
                        }
                        label="مایل به اشتراک‌گذاری"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.wouldFollowBack}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                wouldFollowBack: e.target.checked,
                              })
                            }
                          />
                        }
                        label="مایل به فالو"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.wouldCommentBack}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                wouldCommentBack: e.target.checked,
                              })
                            }
                          />
                        }
                        label="مایل به کامنت"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.hasSupportGroup}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hasSupportGroup: e.target.checked,
                              })
                            }
                          />
                        }
                        label="گروه پشتیبانی"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editData.hasInstagramMarketingBusiness}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hasInstagramMarketingBusiness: e.target.checked,
                              })
                            }
                          />
                        }
                        label="کسب‌وکار بازاریابی"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Button variant="contained" onClick={handleEdit}>
                          ذخیره
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setEditing(null)}
                        >
                          لغو
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell sx={{ textAlign: "center" }}>
                    {account.username}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <a
                      href={account.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {account.link}
                    </a>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => startEditing(account)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(account.$id)}
                      >
                        حذف
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Chip
                        label="مایل به پس گرفتن"
                        color={account.wouldLikeBack ? "success" : "error"}
                        size="small"
                      />
                      <Chip
                        label="مایل به اشتراک‌گذاری"
                        color={account.wouldShareBack ? "success" : "error"}
                        size="small"
                      />
                      <Chip
                        label="مایل به فالو"
                        color={account.wouldFollowBack ? "success" : "error"}
                        size="small"
                      />
                      <Chip
                        label="مایل به کامنت"
                        color={account.wouldCommentBack ? "success" : "error"}
                        size="small"
                      />
                      <Chip
                        label="گروه پشتیبانی"
                        color={account.hasSupportGroup ? "success" : "error"}
                        size="small"
                      />
                      <Chip
                        label="کسب‌وکار بازاریابی"
                        color={
                          account.hasInstagramMarketingBusiness
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </Box>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
