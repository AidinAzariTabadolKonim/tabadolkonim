import React from "react";
import { Typography } from "@mui/material";

export default function Step3Guide() {
  return (
    <Typography component="div">
      <Typography variant="h6">مقدمه</Typography>
      <Typography>
        محصول (محصول) خود را تحقیق کنید تا ویژگی‌ها (ویژگی‌ها)، مزایا (مزایا) و
        پیشنهاد فروش منحصر به فرد (پیشنهاد فروش منحصر به فرد - USP) آن را
        شناسایی کنید.
      </Typography>

      <Typography variant="h6">ویژگی‌های محصول (ویژگی‌های محصول)</Typography>
      <Typography>
        آنچه محصول شما انجام می‌دهد را فهرست کنید، مثلاً «زمان‌بندی مبتنی بر هوش
        مصنوعی» یا «پشتیبانی 24/7».
      </Typography>

      <Typography variant="h6">مزایا (مزایا)</Typography>
      <Typography>
        هر ویژگی را به یک مزیت مرتبط کنید، مثلاً «زمان‌بندی مبتنی بر هوش مصنوعی»
        → «صرفه‌جویی 10+ ساعت در هفته».
      </Typography>

      <Typography variant="h6">پیشنهاد فروش منحصر به فرد (USP)</Typography>
      <Typography>
        مشخص کنید چه چیزی محصول شما را متمایز می‌کند، مثلاً «تنها ابزاری با
        همگام‌سازی تیمی در زمان واقعی».
      </Typography>

      <Typography variant="h6">نحوه استفاده</Typography>
      <Typography>
        - ویژگی‌ها و مزایا ایده اصلی و پیشنهاد را تقویت می‌کنند.
        <br />- USP کمپین شما را متمایز می‌کند.
      </Typography>
    </Typography>
  );
}
