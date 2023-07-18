import React from "react";
import { useNavigation } from "expo-router";
import { filters } from "../../constants";
import { FlashList } from "@shopify/flash-list";
import { YStack, XStack, Text } from "tamagui";
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

  const settingsOptions = React.useMemo(() => {
    const options = filters.find((data) => data.id === filterType)?.options;
    return options?.map((item, index) =>
      createSettingsOptionsObject(
        navigation,
        item,
        filterType,
        selectedValue,
        index === options.length - 1
      )
    );
  }, [filterType, selectedValue]);

  // WARN: Do something here with selectedValue to set the filter in the search bar
  // and add visual indicator to the selected option on the search screen
  // Do this for the clear button too

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
                  <SettingsOption
                    t={t}
                    item={item}
                    style={{
                      backgroundColor: "$gray1",
                      ...(item.lastItem
                        ? {
                            borderBottomLeftRadius: "$5",
                            borderBottomRightRadius: "$5",
                          }
                        : {}),
                    }}
                  />
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
