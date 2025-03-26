import React from "react";
import { Typography } from "@mui/material";

export default function Step7Guide() {
  return (
    <Typography component="div">
      <Typography variant="h6">مقدمه</Typography>
      <Typography>
        متن (متن) خود را به یک عنوان (عنوان)، بدنه (بدنه) و پایان (پایان) با
        استفاده از چارچوب AIDA ساختار دهید: توجه، علاقه، اشتیاق، اقدام.
      </Typography>

      <Typography variant="h6">عنوان (عنوان)</Typography>
      <Typography>
        با ایده اصلی توجه را جلب کنید، مثلاً «با زمان‌بندی یک کلیکی 10+ ساعت در
        هفته صرفه‌جویی کنید.»
      </Typography>

      <Typography variant="h6">بدنه (بدنه)</Typography>
      <Typography>
        - <strong>توجه</strong>: مشکل را بیان کنید، مثلاً «ساعات زیادی را برای
        زمان‌بندی هدر می‌دهید؟»
        <br />- <strong>علاقه</strong>: راه‌حل را معرفی کنید، مثلاً «ابزار هوش
        مصنوعی ما این مشکل را حل می‌کند.»
        <br />- <strong>اشتیاق</strong>: مزایا را نشان دهید، مثلاً «بدون نیاز به
        مهارت فنی، در وقت صرفه‌جویی کنید.»
        <br />- <strong>اقدام</strong>: CTA را فشار دهید، مثلاً «اکنون ثبت‌نام
        کنید!»
      </Typography>

      <Typography variant="h6">پایان (پایان)</Typography>
      <Typography>
        با CTA پایان دهید، مثلاً «اکنون ثبت‌نام کنید—فقط 50 جایگاه باقی مانده!»
      </Typography>

      <Typography variant="h6">نحوه استفاده</Typography>
      <Typography>- پیام کامل کمپین را تشکیل می‌دهد.</Typography>
    </Typography>
  );
}
