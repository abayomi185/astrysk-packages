import React from "react";
import { useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { YStack, XStack } from "tamagui";
import { onItemLayout } from "@astrysk/utils";
import { SettingsOption } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { SettingsOptionProps } from "@astrysk/types";
import { NavigationProp } from "@react-navigation/native";
import { useJellyfinStore } from "../../store";

const createSettingsOptionsObject = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  item: string,
  filterType: string,
  selectedValue: string | null,
  last?: boolean
) => {
  return {
    key: item,
    name: item,
    type: "item",
    selectedValue: selectedValue,
    onPress: () => {
      useJellyfinStore.setState((state) => ({
        searchFilters: {
          ...state.searchFilters,
          [filterType]: item,
        },
      }));
      navigation.goBack();
    },
    lastItem: last,
  } as SettingsOptionProps;
};

const JellyfinSearchFilterOptions: React.FC<{ filterType: string }> = ({
  filterType,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const selectedValue =
    useJellyfinStore((state) => state?.searchFilters?.[filterType]) ?? "";

  // const filterBarOptions = useJellyfinStore((state) => state.filterBarOptions);
  const filterBarOptions = useJellyfinStore.getState().filterBarOptions;

  const settingsOptions = React.useMemo(() => {
    const options =
      filterBarOptions?.find((data) => data.id === filterType)?.options ?? [];
    return options?.map((item, index) =>
      createSettingsOptionsObject(
        navigation,
        item,
        filterType,
        selectedValue,
        index === options.length - 1
      )
    );
  }, [filterBarOptions, filterType, selectedValue]);

  return (
    <YStack height="100%" padding="$4">
      <YStack flex={1} width="100%" borderRadius="$5" overflow="hidden">
        <XStack flex={1} minHeight={flashListHeight}>
          <FlashList
            data={settingsOptions}
            renderItem={({ item }) => {
              return (
                <YStack
                  onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
                >
                  <SettingsOption t={t} item={item} />
                </YStack>
              );
            }}
            estimatedItemSize={51}
            showsVerticalScrollIndicator={false}
          />
        </XStack>
      </YStack>
    </YStack>
  );
};

export default JellyfinSearchFilterOptions;
