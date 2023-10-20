"use client";
import { NAVIGATION_HEIGHT } from "@/constats";
import { CLink } from "@/libs/chakura_ui/components/CLink";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Text,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { memo, useRef } from "react";
import { Show } from "@chakra-ui/react";

const NAV: { label: string; link: string }[] = [
  { label: "contact", link: "/contact" },
];

export const DefaultNavigation = memo(() => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      height={NAVIGATION_HEIGHT}
      px={"8px"}
    >
      <CLink href="/" variant={"nav"}>
        <Text>LOGO</Text>
      </CLink>
      <Show above={"md"}>
        <MenuList />
      </Show>
      <Show below={"md"}>
        <SpDrawerMenu />
      </Show>
    </Flex>
  );
});

const SpDrawerMenu = memo(() => {
  // useDisclosureで閉じ・開きの管理
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* ハンバーガーアイコン部分 */}
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      {/* Drawer部分 */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <MenuList onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

const MenuList = memo(({ onClick }: { onClick?: () => void }) => (
  <HStack as="nav" spacing="8px">
    {NAV.map((v) => (
      <CLink
        onClick={onClick}
        key={`nav_${v.link}`}
        href={v.link}
        variant="nav"
      >
        {v.label}
      </CLink>
    ))}
  </HStack>
));

DefaultNavigation.displayName = "DefaultHeader";
MenuList.displayName = "MenuList";
SpDrawerMenu.displayName = "SpDrawerMenu";
