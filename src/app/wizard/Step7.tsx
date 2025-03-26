// app/wizard/Step7.tsx
"use client";
import { Box, Typography, TextField } from "@mui/material";
import { useWizard } from "./context/WizardContext";
import {
  OFFER_TYPES,
  OFFER_CATEGORIES,
  EMOTIONS,
  PAIN_POINTS,
  DESIRES,
  URGENCY_OPTIONS,
  STAGES,
  MARKETING_CHANNELS,
} from "./data/suggestions";

export default function Step7() {
  const { data, setData } = useWizard();

  // Helper to get Persian label from English value
  const getLabel = (
    value: string,
    options: Array<{ label: string; value: string }>
  ) => options.find((opt) => opt.value === value)?.label || value || "";

  // Helper for array fields (painPoints, desires)
  const getArrayLabels = (
    values: string[],
    options: Array<{ label: string; value: string }>
  ) => values.map((val) => getLabel(val, options)).join("، ") || "";

  const handleChange = (field: keyof typeof data, value: string) => {
    setData({ [field]: value });
  };

  const handleArrayChange = (
    field: "painPoints" | "desires",
    value: string
  ) => {
    setData({ [field]: value.split(/،|,/).map((item) => item.trim()) });
  };

  const handleFeaturesChange = (value: string) => {
    const features = value.split(/،|,/).map((pair) => {
      const [feature, benefit] = pair.split(":").map((s) => s.trim());
      return { feature: feature || "", benefit: benefit || feature || "" };
    });
    setData({ features });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 3, color: "primary.main" }}>
        بررسی و ویرایش نهایی
      </Typography>

      {/* Campaign Basics Section */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          مشخصات اولیه
        </Typography>
        <TextField
          fullWidth
          label="نام کمپین"
          value={data.campaignName || ""}
          onChange={(e) => handleChange("campaignName", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="کانال بازاریابی"
          value={getLabel(data.channel, MARKETING_CHANNELS)}
          onChange={(e) => handleChange("channel", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="ایده اصلی"
          value={data.coreIdea || ""}
          onChange={(e) => handleChange("coreIdea", e.target.value)}
        />
      </Box>

      {/* Audience Section */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          مشخصات مخاطب
        </Typography>
        <TextField
          fullWidth
          label="سن مخاطب"
          value={data.age || ""}
          onChange={(e) => handleChange("age", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="جنسیت"
          value={data.gender || ""}
          onChange={(e) => handleChange("gender", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="مرحله آگاهی"
          value={getLabel(data.stage, STAGES)}
          onChange={(e) => handleChange("stage", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="احساس هدف"
          value={getLabel(data.emotion, EMOTIONS)}
          onChange={(e) => handleChange("emotion", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="مشکلات مخاطب (با کاما جدا کنید)"
          value={getArrayLabels(data.painPoints || [], PAIN_POINTS)}
          onChange={(e) => handleArrayChange("painPoints", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="خواسته‌های مخاطب (با کاما جدا کنید)"
          value={getArrayLabels(data.desires || [], DESIRES)}
          onChange={(e) => handleArrayChange("desires", e.target.value)}
        />
      </Box>

      {/* Product Section */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          مشخصات محصول
        </Typography>
        <TextField
          fullWidth
          label="ویژگی‌های محصول (با کاما جدا کنید، مثال: ویژگی:مزیت)"
          value={
            data.features
              ?.map((f) => `${f.feature}: ${f.benefit}`)
              .join("، ") || ""
          }
          onChange={(e) => handleFeaturesChange(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="نقطه تمایز (USP)"
          value={data.usp || ""}
          onChange={(e) => handleChange("usp", e.target.value)}
        />
      </Box>

      {/* Offer Section */}
      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          پیشنهاد ویژه
        </Typography>
        <TextField
          fullWidth
          label="نوع پیشنهاد"
          value={getLabel(data.offerType, OFFER_TYPES)}
          onChange={(e) => handleChange("offerType", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="دسته‌بندی پیشنهاد"
          value={getLabel(data.offerCategory, OFFER_CATEGORIES)}
          onChange={(e) => handleChange("offerCategory", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="مقدار پیشنهاد"
          value={data.offerValue || ""}
          onChange={(e) => handleChange("offerValue", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="فوریت/کمبود"
          value={getLabel(data.urgency, URGENCY_OPTIONS)}
          onChange={(e) => handleChange("urgency", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="دعوت به اقدام (CTA)"
          value={data.cta || ""}
          onChange={(e) => handleChange("cta", e.target.value)}
        />
      </Box>
    </Box>
  );
}
