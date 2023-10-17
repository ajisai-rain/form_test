import NextLink from "next/link";
import { Button, ButtonProps } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
} & ButtonProps;

export const CLink = memo(({ children, href, ...buttonProps }: Props) => {
  return (
    <NextLink href={href}>
      <Button {...buttonProps}>{children}</Button>
    </NextLink>
  );
});

CLink.displayName = "CLink";
