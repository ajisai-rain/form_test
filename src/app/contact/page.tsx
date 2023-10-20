"use client";
import { Flex, Text } from "@chakra-ui/react";
import { ContactStepper } from "./_components/Stepper";
import { ContactTitleSVG } from "./_svg/contact_title";
import { memo, useEffect } from "react";
import { useAppDispatch } from "@/libs/redux/hooks";
import { contactSlice } from "@/libs/redux/slice/contact/contactSlice";
import { ContactStepWrapper } from "./_components/ContactStepWrapper";

const ContactPage = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(contactSlice.actions.reset());
  }, [dispatch]);
  return (
    <Flex justifyContent={"center"}>
      <Flex
        flexDir={"column"}
        w={{ base: "98%", md: "80%" }}
        alignItems={"center"}
      >
        <ContactTitleSVG />
        <Text fontSize={"xs"} mt={"8px"}>
          お問い合わせ
        </Text>
        <ContactStepper mt={"16px"} />
        <ContactStepWrapper />
      </Flex>
    </Flex>
  );
});

ContactPage.displayName = "ContactPage";
export default ContactPage;
