import { Box } from "@chakra-ui/react";
import { memo } from "react";

export const FOOTER_HEIGHT = "200px";
export const DefaultFooter = memo(() => {
  return (
    <footer>
      <Box h={FOOTER_HEIGHT} w={"100%"} bg={"black"} />
    </footer>
  );
});

DefaultFooter.displayName = "DefaultFooter";
