import React from "react";
import { YStack } from "tamagui";

import { useRadarrConfigurator } from "../utils";

import { useRadarrHomeHeader } from "../components/useHeader";
import RadarrCalendar from "../components/home/calendar";

const RadarrHome: React.FC = () => {
  useRadarrConfigurator();

  useRadarrHomeHeader();

  return (
    <YStack height="100%">
      <RadarrCalendar />
    </YStack>
  );
};

export default RadarrHome;
