import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Box,
  Flex,
  Text,
  FlexProps,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { ContactFormSchemaType } from "../contactFormSchema";

type InputItemType = {
  label: string;
  required?: boolean;
  children?: React.ReactNode;
} & (
  | {
      noneFormControl: true;
      targetName?: never;
      errors?: never;
      placeHolder?: never;
      register?: never;
      inputProps?: never;
    }
  | {
      noneFormControl?: false;
      targetName: keyof ContactFormSchemaType;
      errors?: FieldErrors<ContactFormSchemaType>;
      register?: UseFormRegister<ContactFormSchemaType>;
      placeHolder?: string;
      inputProps?: InputProps;
    }
);

export const ContactFormRow = memo((props: InputItemType) => {
  const shareFlexProps = useMemo<FlexProps>(
    () => ({
      flexDir: { base: "column", md: "row" },
      py: { base: "8px", md: "32px" },
      borderBottom: {
        base: "none",
        md:
          !props.noneFormControl &&
          (props.targetName === "phoneNumber" ||
            props.targetName === "agreement")
            ? "none"
            : "1px solid lightgray",
      },
    }),
    [props.noneFormControl, props.targetName]
  );
  return props.noneFormControl ? (
    <Flex {...shareFlexProps}>
      <RowItem {...props} />
    </Flex>
  ) : (
    <FormControl
      display={"flex"}
      {...shareFlexProps}
      isInvalid={!!props.errors?.[props.targetName]}
    >
      <RowItem {...props} />
    </FormControl>
  );
});

const RowItem = memo((props: InputItemType) => {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={{ base: "100%", md: "350px" }}
        mr={{ base: 0, md: "48px" }}
        mb={{ base: "8px", md: 0 }}
      >
        {props.noneFormControl ? (
          <Text fontWeight={"bold"} whiteSpace={"pre"}>
            {props.label}
          </Text>
        ) : (
          <FormLabel margin={0} htmlFor={props.targetName}>
            <Text fontWeight={"bold"} whiteSpace={"pre"}>
              {props.label}
            </Text>
          </FormLabel>
        )}
        {props.required && (
          <Box p={"2px 16px"} border={"1px solid #CD2B25"} color={"#CD2B25"}>
            <Text whiteSpace={"pre"}>必須</Text>
          </Box>
        )}
      </Flex>
      {props.children || (
        <Box w={"100%"}>
          <Input
            id={props.targetName}
            placeholder={props?.placeHolder}
            {...props.register?.(props.targetName)}
            _placeholder={{ color: "gray" }}
            {...props.inputProps}
          />
          <FormErrorMessage>
            {props.targetName ? props.errors?.[props.targetName]?.message : ""}
          </FormErrorMessage>
        </Box>
      )}
    </>
  );
});

ContactFormRow.displayName = "ContactFormRow";
RowItem.displayName = "RowItem";
