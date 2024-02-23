import React from "react";
import { YStack } from "tamagui";

import { useSonarrConfigurator } from "../utils";

import { useSonarrHomeHeader } from "../components/useHeader";
import SonarrCalendar from "../components/home/calendar";

const SonarrHome: React.FC = () => {
  useSonarrConfigurator();

  useSonarrHomeHeader();

  return (
    <YStack height="100%">
      <SonarrCalendar />
    </YStack>
  );
};

export default SonarrHome;
