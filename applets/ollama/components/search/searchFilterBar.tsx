import React from "react";
import { useRouter } from "expo-router";
import { XStack, Button, GetProps, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { FlashList } from "@shopify/flash-list";
import { Screens } from "@astrysk/constants";
import { useOllamaStore } from "../../store";
import {
  FilterButton,
  ViewTypeButton,
  changeViewType,
} from "@astrysk/components";
import {
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaFilter,
  OllamaSearchFilterContext,
} from "../../types";
import { ollamaColors } from "../../colors";
import { isEmpty } from "@astrysk/utils";
import { ViewType } from "@astrysk/types";

const getOllamaFilterBarOptions = (
  context: OllamaSearchFilterContext
): OllamaFilter[] => {
  return [
    {
      id: "ollama:order",
      options: [
        { value: "ollama:alphabetical", supportsOrderBy: true },
        { value: "ollama:size", supportsOrderBy: true },
        { value: "ollama:modified_date", supportsOrderBy: true },
      ],
    },
  ];
};

const OllamaSearchFilterBar: React.FC<{
  context: OllamaSearchFilterContext;
  handleClearAllFilters?: () => void;
  style?: GetProps<typeof Stack>;
}> = ({ context, handleClearAllFilters, style }) => {
  const router = useRouter();

  const viewType = useOllamaStore((state) => state.viewType) ?? ViewType.List;

  const searchFilters = useOllamaStore((state) => state.searchFilters);

  const handleFilterPress = (id: string, isToggle?: boolean) => {
    if (isToggle) {
      // WARN: Put toggle logic here
    } else {
      router.push({
        pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
        params: {
          context: OllamaDetailScreenContext.SearchFilter,
          searchContext: context,
          itemId: id,
        } as OllamaDetailScreenProps,
      });
    }
  };

  const clearFiltersForContext = () => {
    // Don't clear filters if there are none
    if (!searchFilters?.[context]) return;
    // Clear filters for context
    useOllamaStore.setState((state) => ({
      searchFilters: {
        ...state.searchFilters,
        [context]: undefined,
      },
    }));
    handleClearAllFilters?.();
  };

  const checkActiveStatus = (id: string) => {
    if (searchFilters?.[context] && id in (searchFilters?.[context] ?? {})) {
      return true;
    }
    return false;
  };

  const filterBarOptions = React.useMemo(() => {
    const filterBarOptions = getOllamaFilterBarOptions(context);
    useOllamaStore.setState((state) => ({
      filterBarOptions: {
        ...state.filterBarOptions,
        [context]: filterBarOptions,
      },
    }));
    return filterBarOptions;
  }, [context]);

  return (
    <XStack height="$4" backgroundColor="$backgroundTransparent" {...style}>
      <XStack flex={1}>
        <FlashList
          horizontal
          data={filterBarOptions}
          extraData={searchFilters?.[context]}
          renderItem={({ item }) => (
            <FilterButton
              id={item.id}
              handlePress={handleFilterPress}
              active={checkActiveStatus(item.id)}
              activeBackgroundColor={ollamaColors.primary}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <XStack flex={1} width="$3" marginLeft="$3" alignItems="center">
              <Button
                flex={1}
                height="$2.5"
                borderRadius="$8"
                paddingHorizontal="$3"
                backgroundColor={
                  isEmpty(searchFilters?.[context])
                    ? "$gray5"
                    : ollamaColors.primary
                }
                onPress={() => clearFiltersForContext()}
              >
                <X size={18} opacity={0.8} />
              </Button>
            </XStack>
          }
          ListFooterComponent={() => <XStack marginLeft="$3" />}
          estimatedItemSize={69}
        />
      </XStack>
    </XStack>
  );
};
export default OllamaSearchFilterBar;
