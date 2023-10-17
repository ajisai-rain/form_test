import { ChakuraProviders } from "@/chakura_ui/providers";
import { DefaultFooter, FOOTER_HEIGHT } from "@/components/base/footer";
import { DefaultNavigation, NAVIGATION_HEIGHT } from "@/components/base/header";
import { ReduxProviders } from "@/redux/providers";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";

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
