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
  offerCategory: OfferCategory;
  offerValue: string;
  urgency: string;
  cta: string;
  channel: string;
  remainingTries: number; // New field to store remaining API call tries
};

const initialState: WizardData = {
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
  offerType: "lead_magnet",
  offerCategory: "lead_generation",
  offerValue: "",
  urgency: "",
  cta: "",
  channel: "",
  remainingTries: 3, // Default value, will be updated by API call
};

const WizardContext = createContext<{
  data: WizardData;
  setData: (data: Partial<WizardData>) => void;
  resetWizardState: () => void;
}>(null!);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WizardData>(initialState);

  const updateData = (partialData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partialData }));
  };

  const resetWizardState = () => {
    setData(initialState);
  };

  return (
    <WizardContext.Provider
      value={{ data, setData: updateData, resetWizardState }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  return useContext(WizardContext);
}
