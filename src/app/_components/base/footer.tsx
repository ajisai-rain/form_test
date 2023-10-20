import { FOOTER_HEIGHT } from "@/constats";
import { Box } from "@chakra-ui/react";
import { memo } from "react";

export const DefaultFooter = memo(() => {
  return (
    <Box as={"footer"} mt={"16px"}>
      <Box h={FOOTER_HEIGHT} w={"100%"} bg={"black"} />
    </Box>
  );
});

DefaultFooter.displayName = "DefaultFooter";
