import React from "react";
import { RefreshControl } from "react-native";
import { YStack } from "tamagui";

import { useSonarrConfigurator } from "../utils";

import { useSonarrHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import SonarrCalendar from "../components/home/calendar";

const SonarrHome: React.FC = () => {
  useSonarrConfigurator();

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  useSonarrHomeHeader(navigation);

  return (
    <YStack height="100%">
      <SonarrCalendar />
    </YStack>
  );
};

export default SonarrHome;
