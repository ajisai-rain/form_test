"use client";

import { useAppSelector } from "@/libs/redux/hooks";
import { Flex, Box, Text, FlexProps } from "@chakra-ui/react";
import { memo } from "react";

const STEPS = [{ title: "入力" }, { title: "確認" }, { title: "完了" }];

export const ContactStepper = memo((props: FlexProps) => {
  const step = useAppSelector((state) => state.contactSlice.step);

  return (
    <Flex
      gap={"16px"}
      borderBottom={"1px"}
      borderTop={"1px"}
      borderColor={"lightgray"}
      py={"16px"}
      px={"32px"}
      {...props}
    >
      {STEPS.map((v, index) => (
        <Flex alignItems={"center"} gap={"16px"} key={v.title}>
          <Text
            fontSize={"sm"}
            fontWeight={"bold"}
            color={step >= index ? "#CD2B25" : "lightgray"}
          >
            {v.title}
          </Text>
          {index !== 2 && (
            <Box
              bg={step > index ? "#CD2B25" : "lightgray"}
              w={"5px"}
              h={"5px"}
              borderRadius={"50%"}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
});

ContactStepper.displayName = "ContactStepper";
