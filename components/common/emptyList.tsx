import React from "react";
import { H4, Spinner, XStack } from "tamagui";

import { UseQueryResult } from "@tanstack/react-query";

export const EmptyList: React.FC<{
  text: string;
  queryStatus: UseQueryResult<any, unknown>["status"];
  accentColor?: string;
}> = ({ queryStatus, text, accentColor }) => {
  return (
    <XStack justifyContent="center" marginTop="$5">
      {queryStatus === "pending" ? (
        <Spinner color={accentColor ?? undefined} size="large" />
      ) : (
        <H4 color="$gray11">{text}</H4>
      )}
    </XStack>
  );
};
