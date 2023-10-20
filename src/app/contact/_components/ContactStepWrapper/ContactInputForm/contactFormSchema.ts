import { validateUtils } from "@/utils/validate";
import { z } from "zod";

export const contactFormSchema = z.object({
  // TODO: 英名の人用にバリデーションを変える必要あり
  firstName: z.string().min(1, { message: "名を入力してください" }),
  familyName: z.string().min(1, { message: "性を入力してください" }),
  firstName_kana: z
    .string()
    .regex(validateUtils.hiragana, { message: "ひらがなで入力してください" }),
  familyName_kana: z
    .string()
    .regex(validateUtils.hiragana, { message: "ひらがなで入力してください" }),
  company: z.string().optional(),
  email: z
    .string()
    .email("正しいメールアドレスを入力してください")
    // .min(1, { message: "メールアドレスを入力してください" })
    .regex(validateUtils.HalfWidthAlphanumericSymbols),
  postcode: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return validateUtils.postCode.test(value);
      },
      {
        message: "正しいハイフンなし郵便番号を入力してください",
      }
    ),
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return validateUtils.phoneNumber.test(value);
      },
      {
        message: "正しいハイフンなし電話番号を入力してください",
      }
    ),
  inquiryTarget: z.string().min(1, { message: "選択してください" }),
  inquirySubject: z.string().min(1, { message: "件名を入力してください" }),
  inquiryContent: z
    .string()
    .min(1, { message: "問い合わせ内容を入力してください" })
    .max(1000, { message: "1000文字以内で入力してください" }),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "個人情報保護方針に同意は必須です" }),
  }),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
