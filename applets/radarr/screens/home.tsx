import React from "react";
import { YStack } from "tamagui";

import { useRadarrConfigurator } from "../utils";

import { useRadarrHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import RadarrCalendar from "../components/home/calendar";

const RadarrHome: React.FC = () => {
  useRadarrConfigurator();

  const navigation = useNavigation();

  useRadarrHomeHeader(navigation);

  return (
    <YStack height="100%">
      <RadarrCalendar />
    </YStack>
  );
};

export default RadarrHome;
