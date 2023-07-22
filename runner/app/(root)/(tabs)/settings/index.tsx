import React from "react";
import { SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation, useRouter } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { YStack, XStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";

import { Screens } from "@astrysk/constants";
import { activeApplet } from "@applet";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { HeaderRightWrapper } from "@astrysk/components";
import { resetLoadingComponent } from "@astrysk/components";

export default (() => {
  const { t } = useTranslation();

  const router = useRouter();
  const navigation = useNavigation();

  const [_, appletInstance] = activeApplet;

  const appletSettingsOptions = React.useMemo(() => {
    return appletInstance.settingsOptions(router);
  }, []);

  React.useEffect(() => {
    resetLoadingComponent();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.SETTINGS_SCREEN,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, []);

  return (
    <SafeAreaView>
      <YStack height="100%" width="100%">
        <XStack flex={1}>
          <FlashList
            data={appletSettingsOptions}
            renderItem={({ item }) => {
              if (typeof item === "string") {
                return (
                  <SettingsOptionHeader t={t} headerTitle={item as string} />
                );
              } else {
                return <SettingsOption t={t} item={item} />;
              }
            }}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return typeof item === "string" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={100}
          />
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}) satisfies React.FC;
