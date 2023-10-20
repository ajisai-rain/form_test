import { ChakuraProviders } from "@/libs/chakura_ui/providers";
import { DefaultFooter } from "@/app/_components/base/footer";
import { DefaultNavigation } from "@/app/_components/base/header";
import { ReduxProviders } from "@/libs/redux/providers";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FOOTER_HEIGHT, NAVIGATION_HEIGHT } from "@/constats";

export const metadata: Metadata = {
  title: "Form Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body>
        <ChakuraProviders>
          <ReduxProviders>
            <DefaultNavigation />
            <Box
              px={"16px"}
              minH={`calc(100vh - ${FOOTER_HEIGHT} - ${NAVIGATION_HEIGHT})`}
            >
              {children}
            </Box>
            <DefaultFooter />
          </ReduxProviders>
        </ChakuraProviders>
      </body>
    </html>
  );
}
