"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { Box, Text, Button, Center, Flex } from "@chakra-ui/react";
import { memo, useCallback, useMemo, Fragment } from "react";
import { contactSlice } from "@/libs/redux/slice/contact/contactSlice";
import { ContactFormSchemaType } from "../ContactInputForm/contactFormSchema";

const DATA: {
  label: string;
  value:
    | Exclude<
        keyof ContactFormSchemaType,
        "firstName" | "familyName" | "firstName_kana" | "familyName_kana"
      >
    | "name"
    | "name_kana";
}[] = [
  { label: "名前", value: "name" },
  { label: "ふりがな", value: "name_kana" },
  { label: "社名", value: "company" },
  { label: "メールアドレス", value: "email" },
  { label: "郵便番号", value: "postcode" },
  { label: "住所", value: "address" },
  { label: "電話番号", value: "phoneNumber" },
  { label: "問い合わせ内容", value: "inquiryTarget" },
  { label: "件名", value: "inquirySubject" },
  { label: "本文", value: "inquiryContent" },
];

export const ContactConfirm = memo(() => {
  const dispatch = useAppDispatch();

  const inputValues = useAppSelector((state) => state.contactSlice.inputValues);

  const onChangeStep = useCallback(
    (action: "next" | "prev") => () => {
      dispatch(contactSlice.actions.updateStep(action));
      console.log(inputValues);
      window.scrollTo({ top: 0 });
    },
    [dispatch, inputValues]
  );

  const convertedInquiryTarget = useMemo(() => {
    const target = inputValues?.inquiryTarget;
    switch (target) {
      case "typeA":
        return "Aサービスについて";
      case "typeB":
        return "Bサービスについて";
      case "typeC":
        return "Cサービスについて";
      case "typeEmpty":
        return "その他";
      default: {
        return "";
      }
    }
  }, [inputValues?.inquiryTarget]);

  return (
    <Box w={"100%"} mt={"16px"}>
      <Box bg={"#F7F4F2"} p={"8px 16px"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          お客様情報
        </Text>
      </Box>

      {DATA.map((v) => (
        <Fragment key={v.value}>
          {v.value === "inquiryTarget" && (
            <Box mt={"16px"} bg={"#F7F4F2"} p={"8px 16px"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                お問い合わせ内容
              </Text>
            </Box>
          )}
          <Flex
            flexDir={{ base: "column", md: "row" }}
            mt={"16px"}
            alignItems={{ base: "start", md: "center" }}
          >
            <Text
              fontWeight={"bold"}
              whiteSpace={"pre"}
              w={"200px"}
              mr={"16px"}
            >
              {v.label}
            </Text>
            <Text w={"100%"} whiteSpace={"pre-wrap"}>
              {v.value === "name"
                ? `${inputValues?.familyName} ${inputValues?.firstName}`
                : v.value === "name_kana"
                ? `${inputValues?.familyName_kana} ${inputValues?.firstName_kana}`
                : v.value === "inquiryTarget"
                ? convertedInquiryTarget
                : inputValues?.[v.value] || "-"}
            </Text>
          </Flex>
        </Fragment>
      ))}

      <Center mt={"32px"} flexDir={"column"} gap={"16px"}>
        <Button
          w={"200px"}
          size="lg"
          colorScheme="orange"
          onClick={onChangeStep("next")}
        >
          入力内容の送信
        </Button>
        <Button
          w={"200px"}
          size="lg"
          colorScheme="gray"
          onClick={onChangeStep("prev")}
        >
          戻る
        </Button>
      </Center>
    </Box>
  );
});

ContactConfirm.displayName = "ContactConfirm";
