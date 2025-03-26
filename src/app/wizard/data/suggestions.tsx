// data/suggestions.ts
export type Option = {
  label: string;
  value: string;
};

export const STAGES: Option[] = [
  { label: "ناآگاه", value: "unaware" },
  { label: "مشکل‌آگاه", value: "problem_aware" },
  { label: "راه‌حل‌آگاه", value: "solution_aware" },
  { label: "محصول‌آگاه", value: "product_aware" },
  { label: "کاملاً آگاه", value: "most_aware" },
];

export const EMOTIONS: Option[] = [
  { label: "ترس", value: "fear" }, // Existing: Fear of loss or danger
  { label: "کنجکاوی", value: "curiosity" }, // Existing: Desire to explore
  { label: "طمع", value: "greed" }, // Existing: Wanting more
  { label: "تعلق", value: "belonging" }, // Existing: Need for connection
  { label: "غرور", value: "pride" }, // Existing: Self-esteem boost
  { label: "امید", value: "hope" }, // Optimism for a better future
  { label: "شادی", value: "happiness" }, // Joy or satisfaction
  { label: "عصبانیت", value: "anger" }, // Frustration or irritation
  { label: "غم", value: "sadness" }, // Loss or disappointment
  { label: "اضطراب", value: "anxiety" }, // Worry or unease
  { label: "هیجان", value: "excitement" }, // Anticipation or thrill
  { label: "آرامش", value: "calmness" }, // Peace or relaxation
  { label: "اعتماد", value: "trust" }, // Confidence in something/someone
  { label: "حسادت", value: "envy" }, // Wanting what others have
  { label: "شگفتی", value: "surprise" }, // Unexpected delight
  { label: "ناامیدی", value: "despair" }, // Hopelessness
  { label: "عشق", value: "love" }, // Deep affection or attachment
  { label: "شرم", value: "shame" }, // Embarrassment or guilt
  { label: "لذت", value: "pleasure" }, // Enjoyment or gratification
  { label: "خشم", value: "rage" }, // Intense anger
  { label: "امنیت", value: "security" }, // Feeling safe
  { label: "بی‌حوصلگی", value: "boredom" }, // Lack of interest
  { label: "احترام", value: "respect" }, // Admiration or esteem
  { label: "سرخوردگی", value: "frustration" }, // Blocked goals
  { label: "انتظار", value: "anticipation" }, // Looking forward to something
];

export const PAIN_POINTS: Option[] = [
  { label: "وقت کم آوردن", value: "time_shortage" }, // Existing: Lack of time
  { label: "هزینه‌های بالا", value: "high_costs" }, // Existing: Financial burden
  { label: "سردرگمی در انتخاب", value: "choice_confusion" }, // Existing: Decision overwhelm
  { label: "کیفیت پایین محصولات موجود", value: "low_quality" }, // Existing: Subpar options
  { label: "پشتیبانی ضعیف", value: "poor_support" }, // Existing: Lack of help
  { label: "عدم اطمینان به نتایج", value: "uncertainty" }, // Doubt about outcomes
  { label: "پیچیدگی بیش از حد", value: "over_complexity" }, // Too complicated
  { label: "دسترسی محدود", value: "limited_access" }, // Hard to obtain
  { label: "ناامنی اطلاعات", value: "data_insecurity" }, // Privacy/security fears
  { label: "عدم تطابق با نیازها", value: "mismatch_needs" }, // Not fitting requirements
  { label: "تاخیر در تحویل", value: "delivery_delays" }, // Slow service
  { label: "خستگی از امتحان کردن", value: "trial_fatigue" }, // Tired of failed attempts
  { label: "کمبود دانش", value: "knowledge_gap" }, // Not knowing how
  { label: "فشار اجتماعی", value: "social_pressure" }, // Judgment from others
  { label: "بی‌اعتمادی به برندها", value: "brand_distrust" }, // Skepticism
  { label: "اتلاف منابع", value: "resource_waste" }, // Wasted money/time
  { label: "عدم انعطاف‌پذیری", value: "inflexibility" }, // Rigid solutions
  { label: "ترس از شکست", value: "fear_of_failure" }, // Risk aversion
  { label: "مشکلات فنی", value: "technical_issues" }, // Glitches or bugs
  { label: "بی‌نظمی", value: "disorganization" }, // Chaos or clutter
  { label: "کمبود انگیزه", value: "lack_of_motivation" }, // Feeling uninspired
  { label: "استرس زیاد", value: "high_stress" }, // Overwhelm
  { label: "عدم شفافیت", value: "lack_of_clarity" }, // Confusion about offerings
  { label: "انزوای اجتماعی", value: "social_isolation" }, // Loneliness
  { label: "ناکامی در پیشرفت", value: "stagnation" }, // Stuck or no growth
];

export const DESIRES: Option[] = [
  { label: "صرفه‌جویی در زمان", value: "time_saving" }, // Existing: Efficiency
  { label: "کاهش هزینه‌ها", value: "cost_reduction" }, // Existing: Savings
  { label: "راه‌حل آسان", value: "easy_solution" }, // Existing: Simplicity
  { label: "کیفیت بالا", value: "high_quality" }, // Existing: Excellence
  { label: "پشتیبانی قوی", value: "strong_support" }, // Existing: Reliability
  { label: "آرامش خاطر", value: "peace_of_mind" }, // Stress relief
  { label: "موفقیت سریع", value: "quick_success" }, // Fast results
  { label: "اعتماد به نفس", value: "confidence" }, // Self-assurance
  { label: "انعطاف‌پذیری", value: "flexibility" }, // Adaptability
  { label: "دسترسی آسان", value: "easy_access" }, // Convenience
  { label: "شفافیت کامل", value: "full_transparency" }, // Clarity
  { label: "امنیت بالا", value: "high_security" }, // Safety
  { label: "شخصی‌سازی", value: "personalization" }, // Tailored experience
  { label: "رشد شخصی", value: "personal_growth" }, // Self-improvement
  { label: "تجربه لذت‌بخش", value: "enjoyable_experience" }, // Fun or joy
  { label: "تعلق به جامعه", value: "community_belonging" }, // Social connection
  { label: "احترام و اعتبار", value: "respect_credibility" }, // Status
  { label: "نوآوری", value: "innovation" }, // Cutting-edge solutions
  { label: "استقلال", value: "independence" }, // Freedom
  { label: "اطمینان به نتیجه", value: "result_assurance" }, // Guaranteed outcomes
  { label: "انرژی بیشتر", value: "more_energy" }, // Vitality
  { label: "سازگاری با نیازها", value: "needs_fit" }, // Perfect match
  { label: "سرعت در اجرا", value: "execution_speed" }, // Quick delivery
  { label: "شناخته شدن", value: "recognition" }, // Fame or acknowledgment
  { label: "احساس قدرت", value: "empowerment" }, // Control or strength
];
export const OFFER_TYPES: { label: string; value: string }[] = [
  { label: "جذب لید (منبع رایگان)", value: "lead_magnet" },
  { label: "فروش مستقیم", value: "sales" },
];
export const OFFER_CATEGORIES: { label: string; value: string }[] = [
  { label: "جذب لید", value: "lead_generation" }, // Matches "lead_magnet"
  { label: "فروش", value: "sales_conversion" }, // Matches "sales"
  { label: "افزایش فروش (Upsell)", value: "upsell" },
  { label: "فروش متقاطع (Cross-sell)", value: "cross_sell" },
  { label: "نگهداری مشتری", value: "retention" },
  { label: "بازگرداندن مشتری", value: "reactivation" },
  { label: "ارجاع", value: "referral" },
  { label: "جمع‌آوری نظرات", value: "survey" },
];

export const URGENCY_OPTIONS: { label: string; value: string }[] = [
  { label: "بدون فوریت", value: "none" },
  { label: "محدود تا 24 ساعت", value: "24_hours" },
  { label: "محدود تا 48 ساعت", value: "48_hours" },
  { label: "فقط 10 عدد باقی‌مانده", value: "10_left" },
  { label: "تا پایان هفته", value: "week_end" },
];

export const CTAS: Option[] = [
  { label: "همین حالا خرید کنید", value: "buy_now" },
  { label: "ثبت‌نام رایگان", value: "signup_free" },
  { label: "درخواست مشاوره", value: "request_consultation" },
  { label: "دانلود کنید", value: "download_now" },
];

export const GENDER_OPTIONS: Option[] = [
  { label: "مرد", value: "male" },
  { label: "زن", value: "female" },
  { label: "سایر", value: "other" },
];

export const MARKETING_CHANNELS: Option[] = [
  { label: "یوتیوب (ویدئو کوتاه)", value: "youtube_short" },
  { label: "یوتیوب (ویدئو بلند)", value: "youtube_long" },
  { label: "ایمیل مارکتینگ", value: "email" },
  { label: "پست اینستاگرام", value: "instagram_post" },
  { label: "استوری اینستاگرام", value: "instagram_story" },
  { label: "ریلز اینستاگرام", value: "instagram_reels" },
  { label: "پست فیسبوک", value: "facebook_post" },
  { label: "تبلیغات فیسبوک", value: "facebook_ads" },
  { label: "توییت", value: "twitter" },
  { label: "پست لینکدین", value: "linkedin" },
  { label: "تبلیغات گوگل ادز", value: "google_ads" },
  { label: "وبلاگ", value: "blog" },
  { label: "پیامک تبلیغاتی", value: "sms" },
  { label: "تبلیغات بنری", value: "banner" },
  { label: "تبلیغات پیامرسان‌ها", value: "messenger" },
  { label: "پادکست", value: "podcast" },
];
