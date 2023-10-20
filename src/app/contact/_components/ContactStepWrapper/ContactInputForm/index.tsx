"use client";

import { useForm } from "react-hook-form";
import {
  Button,
  Box,
  Text,
  Center,
  Flex,
  FormErrorMessage,
  FormControl,
  Input,
  Select,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { ContactFormSchemaType, contactFormSchema } from "./contactFormSchema";
import { ContactFormRow } from "./components/ContactFormRow";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { contactSlice } from "@/libs/redux/slice/contact/contactSlice";

export const ContactInputForm = memo(() => {
  const dispatch = useAppDispatch();
  const inputValues = useAppSelector((state) => state.contactSlice.inputValues);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ContactFormSchemaType>({
    mode: "all",
    resolver: zodResolver(contactFormSchema),
  });

  const onError = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSubmit = useCallback(
    (values: ContactFormSchemaType) => {
      dispatch(contactSlice.actions.updateStep("next"));
      dispatch(contactSlice.actions.updateInputValues(values));
      window.scrollTo({ top: 0 });
    },
    [dispatch]
  );

  const onChangePostCode = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputCode = e.target.value;
      if (inputCode.length !== 7) return;
      try {
        const res = await axios.get<{
          results: {
            address1: string;
            address2: string;
            address3: string;
          }[];
        }>("https://zipcloud.ibsnet.co.jp/api/search", {
          params: { zipcode: inputCode },
        });
        if (res.data?.results?.length) {
          const result = res.data.results[0];
          setValue(
            "address",
            result.address1 + result.address2 + result.address3
          );
        }
      } catch (e) {
        console.error("postcode get failed", e);
      }
    },
    [setValue]
  );

  return (
    <Box mt={"24px"} width={"100%"}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Box mb={{ base: "8px" }} bg={"#F7F4F2"} p={"8px 16px"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            お客様情報
          </Text>
        </Box>

        <ContactFormRow noneFormControl required label="お名前">
          <Flex w={"100%"} gap={"8px"}>
            <FormControl isInvalid={!!errors.familyName}>
              <Input
                defaultValue={inputValues?.familyName}
                placeholder="性"
                _placeholder={{ color: "gray" }}
                id={"familyName"}
                {...register("familyName")}
              />
              <FormErrorMessage>{errors.familyName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.firstName}>
              <Input
                defaultValue={inputValues?.firstName}
                placeholder="名"
                _placeholder={{ color: "gray" }}
                id={"firstName"}
                {...register("firstName")}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
        </ContactFormRow>

        <ContactFormRow noneFormControl required label="お名前(ふりがな)">
          <Flex w={"100%"} gap={"8px"} justifyContent={"center"}>
            <FormControl isInvalid={!!errors.familyName_kana}>
              <Input
                placeholder="せい"
                _placeholder={{ color: "gray" }}
                id={"familyName_kana"}
                defaultValue={inputValues?.familyName_kana}
                {...register("familyName_kana")}
              />
              <FormErrorMessage>
                {errors.familyName_kana?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.firstName_kana}>
              <Input
                placeholder="めい"
                _placeholder={{ color: "gray" }}
                id={"firstName_kana"}
                defaultValue={inputValues?.firstName_kana}
                {...register("firstName_kana")}
              />

              <FormErrorMessage>
                {errors.firstName_kana?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </ContactFormRow>

        <ContactFormRow
          register={register}
          errors={errors}
          targetName="company"
          label="社名"
          placeHolder="法人の場合のみ入力ください"
          inputProps={{
            defaultValue: inputValues?.company,
          }}
        />
        <ContactFormRow
          required
          register={register}
          errors={errors}
          targetName="email"
          label="メールアドレス"
          inputProps={{
            defaultValue: inputValues?.email,
          }}
        />
        <ContactFormRow
          register={register}
          errors={errors}
          targetName="postcode"
          label="郵便番号"
          placeHolder="ハイフンなし(0001111)"
          inputProps={{
            defaultValue: inputValues?.postcode,
            onChange: onChangePostCode,
            type: "number",
          }}
        />
        <ContactFormRow
          register={register}
          errors={errors}
          targetName="address"
          label="住所"
          inputProps={{
            defaultValue: inputValues?.address,
          }}
        />
        <ContactFormRow
          register={register}
          errors={errors}
          targetName="phoneNumber"
          label="電話番号"
          placeHolder="ハイフンなし(00011112222)"
          inputProps={{
            type: "tel",
            defaultValue: inputValues?.phoneNumber,
          }}
        />
        <Box mb={{ base: "8px" }} mt={"32px"} bg={"#F7F4F2"} p={"8px 16px"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            お問い合わせ内容
          </Text>
        </Box>
        <ContactFormRow required noneFormControl label="問い合わせ内容">
          <FormControl isInvalid={!!errors.inquiryTarget} w={"100%"}>
            <Select
              defaultValue={inputValues?.inquiryTarget || ""}
              id={"inquiryTarget"}
              {...register("inquiryTarget")}
            >
              <option hidden disabled value={""}>
                選択してください
              </option>
              <option color="gray" value={"typeA"}>
                Aサービスについて
              </option>
              <option value={"typeB"}>Bサービスについて</option>
              <option value={"typeC"}>Cサービスについて</option>
              <option value={"typeEmpty"}>その他</option>
            </Select>
            <FormErrorMessage>
              {errors?.inquiryTarget?.message}
            </FormErrorMessage>
          </FormControl>
        </ContactFormRow>
        <ContactFormRow
          required
          register={register}
          errors={errors}
          targetName="inquirySubject"
          label="件名"
          inputProps={{
            defaultValue: inputValues?.inquirySubject,
          }}
        />
        <ContactFormRow required label="本文" noneFormControl>
          <FormControl isInvalid={!!errors.inquiryContent} w={"100%"}>
            <Textarea
              maxLength={1000}
              placeholder="1000文字以内で入力してください"
              id={"inquiryContent"}
              {...register("inquiryContent")}
              defaultValue={inputValues?.inquiryContent}
            />
            <FormErrorMessage>
              {errors.inquiryContent?.message}
            </FormErrorMessage>
          </FormControl>
        </ContactFormRow>
        <ContactFormRow
          required
          errors={errors}
          targetName="agreement"
          label="個人情報保護"
        >
          <Box w={"100%"}>
            <Box
              border={"1px solid"}
              p={"16px"}
              width={"100%"}
              h={"100px"}
              overflow={"scroll"}
            >
              ダミー個人情報保護の案内
              お客様から収集する個人情報は、当社が提供するサービスの適切な運営と、お客様へのサポートを向上させるために使用されます。当社はお客様のプライバシーを尊重し、以下の原則に従ってお客様の個人情報を取り扱います。
              1. 収集と使用
              当社は、お客様から提供される個人情報を、次の目的で収集および使用します。
              サービス提供およびカスタマーサポートの向上 製品やサービスの提供
              法的要件への遵守 2. 保管とセキュリティ
              当社はお客様の個人情報を適切に保管し、機密情報として取り扱います。データへのアクセスは制限され、セキュリティ対策が講じられています。
              3. 共有
              お客様の個人情報は、法的要件に基づいて当局や規制機関と共有されることがありますが、それ以外の場合はお客様の同意なしに第三者と共有することはありません。
              4. アクセスと修正
              お客様は自身の個人情報にアクセスし、修正できます。詳細はお問い合わせください。
              5. 同意の取得
              お客様の個人情報を収集する際に、明示的な同意を取得する場合があります。同意を拒否する権利もお客様にはあります。
              お客様のプライバシーを守るために、当社は厳格なプライバシーポリシーを適用し、個人情報保護に全力を注いでいます。詳細については、当社のプライバシーポリシーをご参照いただくか、お問い合わせください。
            </Box>
            <Checkbox
              defaultChecked={inputValues?.agreement}
              mt={"8px"}
              id={"agreement"}
              {...register("agreement")}
            >
              個人情報保護方針に同意します
            </Checkbox>
            <FormErrorMessage>{errors.agreement?.message}</FormErrorMessage>
          </Box>
        </ContactFormRow>
        <Center>
          <Button size="lg" colorScheme="orange" type="submit">
            入力内容の確認へ
          </Button>
        </Center>
      </form>
    </Box>
  );
});

ContactInputForm.displayName = "ContactInputForm";
