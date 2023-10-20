import { CheckIcon } from "@chakra-ui/icons";
import { Text, Center } from "@chakra-ui/react";
import { memo } from "react";

export const ContactCompleat = memo(() => {
  return (
    <Center gap={"16px"} mt={"32px"} flexDir={"column"}>
      <CheckIcon w={100} h={100} />
      <Text fontWeight={"bold"} fontSize={"xl"}>
        問い合わせいただき、ありがとうございます。
      </Text>
      <Text>console.logを確認ください</Text>
    </Center>
  );
});

ContactCompleat.displayName = "ContactCompleat";
