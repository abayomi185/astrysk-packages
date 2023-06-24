import React from "react";
import { XStack } from "tamagui";
import { AppletHeaderButton } from "./appletHeaderButton";
import { LoadingIndicator } from "./loadingIndicator";

export const HeaderRightWrapper = () => {
  return (
    <XStack>
      <LoadingIndicator />
      <AppletHeaderButton />
    </XStack>
  );
};
