"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { chakuraTheme } from "./theme";

export const ChakuraProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={chakuraTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};
