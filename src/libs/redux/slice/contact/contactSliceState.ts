import { ContactFormSchemaType } from "@/app/contact/_components/ContactStepWrapper/ContactInputForm/contactFormSchema";

export type ContactSliceState = {
  /**
   * 0:input
   * 1:confirm
   * 2:compleat
   */
  step: 0 | 1 | 2;
  inputValues?: ContactFormSchemaType;
};
