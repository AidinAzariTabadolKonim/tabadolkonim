// context/WizardContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

type OfferType = "lead_magnet" | "sales";
type OfferCategory =
  | "lead_generation"
  | "sales_conversion"
  | "upsell"
  | "cross_sell"
  | "retention"
  | "reactivation"
  | "referral"
  | "survey";

type WizardData = {
  campaignName: string;
  stage: string;
  emotion: string;
  age: string;
  gender: string;
  painPoints: string[];
  desires: string[];
  features: { feature: string; benefit: string }[];
  usp: string;
  coreIdea: string;
  offerType: OfferType;
  offerCategory: OfferCategory; // New field
  offerValue: string;
  urgency: string;
  cta: string;
  channel: string;
};

const WizardContext = createContext<{
  data: WizardData;
  setData: (data: Partial<WizardData>) => void;
}>(null!);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WizardData>({
    campaignName: "",
    stage: "",
    emotion: "",
    age: "",
    gender: "",
    painPoints: [],
    desires: [],
    features: [],
    usp: "",
    coreIdea: "",
    offerType: "lead_magnet" as OfferType,
    offerCategory: "lead_generation" as OfferCategory, // Default aligns with lead_magnet
    offerValue: "",
    urgency: "",
    cta: "",
    channel: "",
  });

  const updateData = (partialData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partialData }));
  };

  return (
    <WizardContext.Provider value={{ data, setData: updateData }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  return useContext(WizardContext);
}
