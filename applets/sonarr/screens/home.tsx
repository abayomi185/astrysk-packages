import React from "react";
import { YStack } from "tamagui";

import { useSonarrConfigurator } from "../utils";

import { useSonarrHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import SonarrCalendar from "../components/home/calendar";

const SonarrHome: React.FC = () => {
  useSonarrConfigurator();

  const navigation = useNavigation();

  useSonarrHomeHeader(navigation);

  return (
    <YStack height="100%">
      <SonarrCalendar />
    </YStack>
  );
};

export default SonarrHome;
