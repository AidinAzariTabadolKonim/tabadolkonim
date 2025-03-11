"use client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CATEGORIES } from "../types";

interface FiltersAccordionProps {
  filterId: string;
  setFilterId: (value: string) => void;
  filterName: string;
  setFilterName: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterWouldLikeBack: boolean;
  setFilterWouldLikeBack: (value: boolean) => void;
  filterWouldShareBack: boolean;
  setFilterWouldShareBack: (value: boolean) => void;
  filterWouldFollowBack: boolean;
  setFilterWouldFollowBack: (value: boolean) => void;
  filterWouldCommentBack: boolean;
  setFilterWouldCommentBack: (value: boolean) => void;
  filterHasSupportGroup: boolean;
  setFilterHasSupportGroup: (value: boolean) => void;
  filterHasInstagramMarketingBusiness: boolean;
  setFilterHasInstagramMarketingBusiness: (value: boolean) => void;
}

export default function FiltersAccordion({
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
}: FiltersAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>فیلترها</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            label="فیلتر بر اساس ID"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
          />
          <TextField
            label="فیلتر بر اساس نام کاربری"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">همه دسته‌بندی‌ها</MenuItem>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={
              <Switch
                checked={filterWouldLikeBack}
                onChange={(e) => setFilterWouldLikeBack(e.target.checked)}
              />
            }
            label="مایل به پس گرفتن"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterWouldShareBack}
                onChange={(e) => setFilterWouldShareBack(e.target.checked)}
              />
            }
            label="مایل به اشتراک‌گذاری مجدد"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterWouldFollowBack}
                onChange={(e) => setFilterWouldFollowBack(e.target.checked)}
              />
            }
            label="مایل به فالو کردن مجدد"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterWouldCommentBack}
                onChange={(e) => setFilterWouldCommentBack(e.target.checked)}
              />
            }
            label="مایل به کامنت گذاشتن مجدد"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterHasSupportGroup}
                onChange={(e) => setFilterHasSupportGroup(e.target.checked)}
              />
            }
            label="دارای گروه پشتیبانی"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterHasInstagramMarketingBusiness}
                onChange={(e) =>
                  setFilterHasInstagramMarketingBusiness(e.target.checked)
                }
              />
            }
            label="دارای کسب‌وکار بازاریابی اینستاگرام"
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
