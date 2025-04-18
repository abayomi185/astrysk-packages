import React from "react";
import { useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { YStack, XStack } from "tamagui";
import { onItemLayout } from "@astrysk/utils";
import { ClearFilterButton, SettingsOption } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import {
  ExtendedNavigationProp,
  FilterOrder,
  SettingsOptionProps,
} from "@astrysk/types";
import { useOllamaStore } from "../../store";
import {
  OllamaFilterKind,
  OllamaFilterKindValue,
  OllamaSearchFilterContext,
} from "../../types";
import { TFunction } from "i18next";

const createSettingsOptionsObject = (
  t: TFunction,
  navigation: ExtendedNavigationProp,
  item: string,
  supportsOrderBy: boolean,
  context: OllamaSearchFilterContext,
  filterType: OllamaFilterKind,
  selectedValue: OllamaFilterKindValue,
  first?: boolean,
  last?: boolean
) => {
  return {
    key: item,
    name: t(item),
    type: "item",
    selectedValue: selectedValue.value,
    supportsOrderBy,
    selectedValueOrder: selectedValue.order,
    onPress: () => {
      useOllamaStore.setState((state) => {
        let selectedValueOrder;

        if (supportsOrderBy) {
          if (selectedValue.order === undefined) {
            selectedValueOrder = FilterOrder.ASCENDING;
          } else if (selectedValue.order === FilterOrder.ASCENDING) {
            selectedValueOrder = FilterOrder.DESCENDING;
          } else if (selectedValue.order === FilterOrder.DESCENDING) {
            selectedValueOrder = FilterOrder.ASCENDING;
          }
        }

        return {
          searchFilters: {
            ...state.searchFilters,
            [context]: {
              ...state.searchFilters?.[context],
              [filterType]: {
                value: item,
                order: selectedValueOrder,
              },
            },
          },
        };
      });
      navigation.goBack();
    },
    firstItem: first,
    lastItem: last,
  } as SettingsOptionProps;
};

const OllamaSearchFilterOptions: React.FC<{
  context: OllamaSearchFilterContext;
  filterType: string;
}> = ({ context, filterType }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const selectedValue =
    useOllamaStore((state) => state?.searchFilters?.[context]?.[filterType]) ??
    {};

  const filterBarOptions = useOllamaStore.getState().filterBarOptions;

  const settingsOptions = React.useMemo(() => {
    const options =
      filterBarOptions?.[context]?.find((data) => data.id === filterType)
        ?.options ?? [];
    return options?.map((item, index) =>
      createSettingsOptionsObject(
        t,
        navigation,
        item.value,
        item.supportsOrderBy ?? false,
        context,
        filterType,
        selectedValue,
        index === 0,
        index === options.length - 1
      )
    );
  }, [filterBarOptions, filterType, selectedValue]);

  const clearFilter = () => {
    useOllamaStore.setState((state) => {
      const newContextFilters = { ...state.searchFilters?.[context] };
      delete newContextFilters[filterType];
      return {
        searchFilters: {
          ...state.searchFilters,
          [context]: newContextFilters,
        },
      };
    });
    navigation.goBack();
  };

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
            ListHeaderComponent={
              <XStack>
                <ClearFilterButton clearFilter={clearFilter} />
              </XStack>
            }
          />
        </XStack>
      </YStack>
    </YStack>
  );
};

export default OllamaSearchFilterOptions;
