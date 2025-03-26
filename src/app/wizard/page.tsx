// app/wizard/page.tsx
"use client";
import { useState } from "react";
import Stepper from "./component/Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import { WizardProvider } from "./context/WizardContext";
export default function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const STEPS = [
    "اطلاعات اولیه",
    "پرسونای مخاطب",
    "تحقیق محصول",
    "ایده اصلی",
    "پیشنهاد ویژه",
    "دعوت به اقدام",
    "مرور نهایی",
    "تولید هوش مصنوعی",
  ];

  return (
    <WizardProvider>
      <Stepper
        steps={STEPS}
        activeStep={activeStep}
        onNext={() => setActiveStep((prev) => prev + 1)}
        onBack={() => setActiveStep((prev) => prev - 1)}
      >
        {activeStep === 0 && <Step1 />}
        {activeStep === 1 && <Step2 />}
        {activeStep === 2 && <Step3 />}
        {activeStep === 3 && <Step4 />}
        {activeStep === 4 && <Step5 />}
        {activeStep === 5 && <Step6 />}
        {activeStep === 6 && <Step7 />}
        {activeStep === 7 && <Step8 />}
        {/* Add other steps here */}
      </Stepper>
    </WizardProvider>
  );
}
