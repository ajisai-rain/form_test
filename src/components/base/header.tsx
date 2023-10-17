import { CLink } from "@/chakura_ui/components/CLink";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { memo } from "react";

const NAV: { label: string; link: string }[] = [
  { label: "contact", link: "/contact" },
];

export const NAVIGATION_HEIGHT = "70px";
export const DefaultNavigation = memo(() => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      height={NAVIGATION_HEIGHT}
      px={"8px"}
    >
      <CLink href="/" variant={"nav"}>
        <Text variant={"title"}>LOGO</Text>
      </CLink>
      <HStack as="nav" spacing="8px">
        {NAV.map((v) => (
          <CLink key={`nav_${v.link}`} href={v.link} variant="nav">
            {v.label}
          </CLink>
        ))}
      </HStack>
    </Flex>
  );
});

DefaultNavigation.displayName = "DefaultHeader";
