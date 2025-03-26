import { useState } from "react";
import { useWizard } from "../context/WizardContext";
import { getEnhancedChannelInstructions } from "../utils/channelInstructions";

export const useGenerate = () => {
  const { data, setData } = useWizard();
  const [generatedText, setGeneratedText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const generatePrompt = () => {
    const newPrompt = `
      به عنوان یک کپی‌رایتر حرفه‌ای، متن تبلیغاتی به زبان فارسی برای کمپین "${
        data.campaignName
      }" ایجاد کن. این متن برای کانال "${
      data.channel
    }" است و باید با توجه به دستورالعمل‌های خاص این کانال نوشته شود.

      نوع عرضه: ${
        data.offerType === "lead_magnet"
          ? "جذب لید (Lead Magnet)"
          : "فروش (Sales)"
      }
      دسته‌بندی پیشنهاد: ${data.offerCategory}
      - از این دسته‌بندی برای تنظیم لحن و هدف متن استفاده کن. برای مثال، اگر "upsell" است، بر ارتقا به محصول بهتر تمرکز کن.

      هدف اصلی:
      ${
        data.offerType === "lead_magnet"
          ? "جذب مخاطبان برای دریافت یک منبع رایگان که به آن‌ها کمک می‌کند تا مشکلاتشان را حل کنند."
          : "تشویق مخاطبان به خرید محصول یا خدمات با تأکید بر مزایا و ارزش‌های آن."
      }

      مرحله آگاهی مخاطب: ${data.stage}
      - بر اساس این مرحله، پیام را طوری تنظیم کن که با سطح آگاهی مخاطب هماهنگ باشد. برای مثال، اگر مخاطب در مرحله "مشکل آگاه" است، بر روی مشکل و راه‌حل تمرکز کن.

      احساس هدف: ${data.emotion}
      - متن را طوری بنویس که این احساس را در مخاطب برانگیزد. برای مثال، اگر احساس هدف "کنجکاوی" است، از جملات پرسشی یا اطلاعات ناقص برای تحریک کنجکاوی استفاده کن.

      مشکلات مخاطب: ${data.painPoints?.join("، ")}
      - این مشکلات را در متن به طور همدلانه مطرح کن تا مخاطب احساس کند که شما درکشان می‌کنید.

      خواسته‌های مخاطب: ${data.desires?.join("، ")}
      - نشان ده که محصول یا منبع رایگان چگونه این خواسته‌ها را برآورده می‌کند.

      ویژگی‌های محصول: ${data.features
        ?.map((f) => `${f.feature} (${f.benefit})`)
        .join("، ")}
      - به جای لیست کردن ویژگی‌ها، بر روی مزایایی که این ویژگی‌ها برای مخاطب دارند تمرکز کن.

      نقطه تمایز: ${data.usp}
      - این نقطه تمایز را برجسته کن تا مخاطب بفهمد چرا باید محصول یا منبع شما را انتخاب کند.

      پیشنهاد ویژه: ${data.offerValue}
      - این پیشنهاد را به طور واضح و جذاب ارائه کن، به‌ویژه اگر محدودیت زمانی یا تعداد دارد.

      فوریت: ${data.urgency}
      - حس فوریت را با این محدودیت در متن ایجاد کن (مثلاً "فقط تا 24 ساعت").

      دعوت به اقدام: ${data.cta}
      - این دعوت به اقدام را به طور برجسته و متقاعدکننده در متن قرار ده.

      دستورالعمل خاص کانال:
      ${getEnhancedChannelInstructions(data.channel)}

      لطفاً متن را با توجه به این اطلاعات و با در نظر گرفتن بهترین روش‌های کپی‌رایتینگ برای کانال مورد نظر بنویسید. از مدل‌های کپی‌رایتینگ مانند AIDA (توجه، علاقه، تمایل، اقدام) یا PAS (مشکل، تحریک، راه‌حل) برای ساختاردهی متن استفاده کن. متن را روان، جذاب و متناسب با زبان فارسی بنویسید.
    `;
    setPrompt(newPrompt.trim());
    return newPrompt;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedText("");
    try {
      const promptText = generatePrompt();
      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("برای تولید متن، ابتدا باید وارد شوید");
        }
        if (response.status === 429) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        throw new Error("خطا در سرور");
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      const text =
        result.generated_text ||
        result[0]?.generated_text ||
        "پاسخی دریافت نشد";
      setGeneratedText(text);

      // Fetch the updated dailyCount from the new API route
      const apiCallDataResponse = await fetch("/api/getApiCallData");
      if (!apiCallDataResponse.ok) {
        const errorData = await apiCallDataResponse.json();
        throw new Error(errorData.error);
      }

      const apiCallData = await apiCallDataResponse.json();
      const newDailyCount = apiCallData.dailyCount;
      setData({ remainingTries: Math.max(0, 3 - newDailyCount) });
    } catch (error) {
      console.error("Error:", error);
      setGeneratedText(
        error instanceof Error
          ? error.message
          : "خطا در ارتباط با سرور. لطفاً دوباره امتحان کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setSnackbarOpen(true))
      .catch(() => setSnackbarOpen(false));
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return {
    generatedText,
    prompt,
    loading,
    snackbarOpen,
    setSnackbarOpen,
    handleGenerate,
    handleCopyToClipboard,
    handleCloseSnackbar,
  };
};

export const useGenerateForStep8 = () => {
  const {
    generatedText,
    prompt,
    loading,
    snackbarOpen,
    setSnackbarOpen,
    handleGenerate,
    handleCopyToClipboard,
    handleCloseSnackbar,
  } = useGenerate();
  return {
    generatedText,
    prompt,
    loading,
    snackbarOpen,
    setSnackbarOpen,
    handleGenerate,
    handleCopyToClipboard,
    handleCloseSnackbar,
  };
};
