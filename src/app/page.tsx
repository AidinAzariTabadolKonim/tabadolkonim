"use client";

import { useState, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useAccounts } from "@hooks/useAccounts";
import { useRateAccount } from "@hooks/useRateAccount";
import { useWatchlist } from "@hooks/useWatchlist";
import { useAddAccount } from "@hooks/useAddAccount";
import { useFilters } from "@hooks/useFilters";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import FiltersAccordion from "@components/FiltersAccordion";
import AddAccountAccordion from "@components/AddAccountAccordion";
import AccountsTable from "@components/AccountsTable";
import HeroComponent from "@components/HeroComponent";

export default function Home() {
  // Existing state and hooks (keep all existing code)
  const {
    allAccounts,
    loading: accountsLoading,
    error: accountsError,
    refetch,
  } = useAccounts();
  const { rateAccount } = useRateAccount();
  const { addToWatchlist, deleteFromWatchlist, watchlist } = useWatchlist();
  const { addAccount } = useAddAccount();
  const [newUsername, setNewUsername] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [wouldLikeBack, setWouldLikeBack] = useState(false);
  const [wouldShareBack, setWouldShareBack] = useState(false);
  const [wouldFollowBack, setWouldFollowBack] = useState(false);
  const [wouldCommentBack, setWouldCommentBack] = useState(false);
  const [hasSupportGroup, setHasSupportGroup] = useState(false);
  const [hasInstagramMarketingBusiness, setHasInstagramMarketingBusiness] =
    useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const router = useRouter();

  const {
    filterId,
    setFilterId,
    filterName,
    setFilterName,
    filterCategory,
    setFilterCategory,
    filterWouldLikeBack,
    setFilterWouldLikeBack,
    filterWouldShareBack,
    setFilterWouldShareBack,
    filterWouldFollowBack,
    setFilterWouldFollowBack,
    filterWouldCommentBack,
    setFilterWouldCommentBack,
    filterHasSupportGroup,
    setFilterHasSupportGroup,
    filterHasInstagramMarketingBusiness,
    setFilterHasInstagramMarketingBusiness,
    filteredAccounts,
  } = useFilters(allAccounts);

  // Add refs for scrolling
  const addAccountRef = useRef<HTMLDivElement>(null);
  const checkListRef = useRef<HTMLDivElement>(null);

  // Scroll handlers
  const handleAddAccountClick = () => {
    addAccountRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckListClick = () => {
    checkListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Existing functions (keep all existing code)
  const exportToExcel = () => {
    const filteredData = filteredAccounts.map(({ ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Accounts");
    XLSX.writeFile(wb, "instagram_accounts.xlsx");
  };

  const handleAddAccount = async () => {
    const result = await addAccount(
      {
        username: newUsername,
        link: newLink,
        category: newCategory,
        wouldLikeBack,
        wouldShareBack,
        wouldFollowBack,
        wouldCommentBack,
        hasSupportGroup,
        hasInstagramMarketingBusiness,
      },
      () => {
        setNewUsername("");
        setNewLink("");
        setNewCategory("");
        setWouldLikeBack(false);
        setWouldShareBack(false);
        setWouldFollowBack(false);
        setWouldCommentBack(false);
        setHasSupportGroup(false);
        setHasInstagramMarketingBusiness(false);
      }
    );
    setSnackbarMessage(result.message);
    setSnackbarSeverity(result.success ? "success" : "error");
    setSnackbarOpen(true);
    if (result.success) {
      refetch();
      router.push("/");
    }
  };

  const handleRateAccount = async (accountId: string, stars: number) => {
    const result = await rateAccount(accountId, stars);
    setSnackbarMessage(result.message);
    setSnackbarSeverity(result.success ? "success" : "error");
    setSnackbarOpen(true);
    if (result.success) refetch();
  };

  const handleAddToWatchlist = async (accountId: string) => {
    const result = await addToWatchlist(accountId);
    setSnackbarMessage(result.message);
    setSnackbarSeverity(result.success ? "success" : "error");
    setSnackbarOpen(true);
    if (result.success) refetch();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteFromWatchlist = async (watchlistId: string) => {
    const result = await deleteFromWatchlist(watchlistId);
    setSnackbarMessage(result.message);
    setSnackbarSeverity(result.success ? "success" : "error");
    setSnackbarOpen(true);
    if (result.success) refetch();
  };

  return (
    <>
      {/* Hero Section */}
      <HeroComponent
        onAddAccountClick={handleAddAccountClick}
        onCheckListClick={handleCheckListClick}
      />

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        {/* Add Account Section with ref */}
        <div ref={addAccountRef}>
          <AddAccountAccordion
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newLink={newLink}
            setNewLink={setNewLink}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            wouldLikeBack={wouldLikeBack}
            setWouldLikeBack={setWouldLikeBack}
            wouldShareBack={wouldShareBack}
            setWouldShareBack={setWouldShareBack}
            wouldFollowBack={wouldFollowBack}
            setWouldFollowBack={setWouldFollowBack}
            wouldCommentBack={wouldCommentBack}
            setWouldCommentBack={setWouldCommentBack}
            hasSupportGroup={hasSupportGroup}
            setHasSupportGroup={setHasSupportGroup}
            hasInstagramMarketingBusiness={hasInstagramMarketingBusiness}
            setHasInstagramMarketingBusiness={setHasInstagramMarketingBusiness}
            handleAddAccount={handleAddAccount}
            addLoading={false}
            addError={null}
          />
        </div>
        {/* Filters */}
        <FiltersAccordion
          filterId={filterId}
          setFilterId={setFilterId}
          filterName={filterName}
          setFilterName={setFilterName}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterWouldLikeBack={filterWouldLikeBack}
          setFilterWouldLikeBack={setFilterWouldLikeBack}
          filterWouldShareBack={filterWouldShareBack}
          setFilterWouldShareBack={setFilterWouldShareBack}
          filterWouldFollowBack={filterWouldFollowBack}
          setFilterWouldFollowBack={setFilterWouldFollowBack}
          filterWouldCommentBack={filterWouldCommentBack}
          setFilterWouldCommentBack={setFilterWouldCommentBack}
          filterHasSupportGroup={filterHasSupportGroup}
          setFilterHasSupportGroup={setFilterHasSupportGroup}
          filterHasInstagramMarketingBusiness={
            filterHasInstagramMarketingBusiness
          }
          setFilterHasInstagramMarketingBusiness={
            setFilterHasInstagramMarketingBusiness
          }
        />
        {/* Results Counter and Excel Button */}
        <Box
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Typography variant="body1">
            تعداد نتایج: {filteredAccounts.length} / {allAccounts.length}
          </Typography>
          <Button variant="contained" onClick={exportToExcel}>
            دانلود به صورت اکسل
          </Button>
        </Box>
        {/* Accounts Table with ref */}
        <div ref={checkListRef}>
          <AccountsTable
            accounts={filteredAccounts}
            rateAccount={handleRateAccount}
            addToWatchlist={handleAddToWatchlist}
            deleteFromWatchlist={handleDeleteFromWatchlist}
            watchlist={watchlist}
            loading={accountsLoading}
            error={accountsError}
          />
        </div>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
