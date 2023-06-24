import React from "react";
import { H3, YStack } from "tamagui";

const JellyfinDetailSection: React.FC<{
  header: string;
  headerPadding?: boolean;
  children: React.ReactNode;
}> = ({ header, headerPadding, children }) => {
  return (
    <YStack marginTop="$3">
      <H3 color="$color" paddingHorizontal={headerPadding ? "$3" : "$0"}>
        {header}
      </H3>
      <YStack marginTop="$1">{children}</YStack>
    </YStack>
  );
};

export default JellyfinDetailSection;
