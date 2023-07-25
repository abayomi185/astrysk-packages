import React from "react";
import { RefreshControl } from "react-native";
import { XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";

import { useSonarrConfigurator } from "../utils";

import { useSonarrHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";

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
      <FlashList
        data={listOrder}
        renderItem={({ item }) => (
          <>
            <item.component />
          </>
        )}
        ListFooterComponent={() => <XStack height="$13" />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={198}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#8E4EC6"
          />
        }
      />
    </YStack>
  );
};

export default SonarrHome;
