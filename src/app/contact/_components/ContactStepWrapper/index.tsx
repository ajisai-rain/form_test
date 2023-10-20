"use client";
import { useAppSelector } from "@/libs/redux/hooks";
import { memo } from "react";
import { ContactInputForm } from "./ContactInputForm";
import { ContactConfirm } from "./ContactConfirm";
import { ContactCompleat } from "./ContactCompleat";

export const ContactStepWrapper = memo(() => {
  const step = useAppSelector((state) => state.contactSlice.step);
  if (step === 0) return <ContactInputForm />;
  if (step === 1) return <ContactConfirm />;
  if (step === 2) return <ContactCompleat />;
});

ContactStepWrapper.displayName = "ContactStepWrapper";
