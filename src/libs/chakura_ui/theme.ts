import { extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const nextFont = Inter({ subsets: ["latin"] });

export const chakuraTheme = extendTheme({
  
  fonts: {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily,
  },
});
