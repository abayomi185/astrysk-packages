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
import { JellyfinSearchFilterContext } from "../../types";
import { TFunction, t } from "i18next";

const createSettingsOptionsObject = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  item: string,
  context: JellyfinSearchFilterContext,
  filterType: string,
  selectedValue: string | null,
  last?: boolean
) => {
  return {
    key: item,
    name: t(item),
    type: "item",
    selectedValue: selectedValue,
    onPress: () => {
      useJellyfinStore.setState((state) => ({
        searchFilters: {
          ...state.searchFilters,
          [context]: {
            ...state.searchFilters?.[context],
            [filterType]: item,
          },
        },
      }));
      navigation.goBack();
    },
    lastItem: last,
  } as SettingsOptionProps;
};

const JellyfinSearchFilterOptions: React.FC<{
  context: JellyfinSearchFilterContext;
  filterType: string;
}> = ({ context, filterType }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const selectedValue =
    useJellyfinStore(
      (state) => state?.searchFilters?.[context]?.[filterType]
    ) ?? "";

  // WARN: This is not ideal to get the filterBarOptions from the store here.
  const filterBarOptions = useJellyfinStore.getState().filterBarOptions;

  const settingsOptions = React.useMemo(() => {
    const options =
      filterBarOptions?.[context]?.find((data) => data.id === filterType)
        ?.options ?? [];
    return options?.map((item, index) =>
      createSettingsOptionsObject(
        t,
        navigation,
        item,
        context,
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
