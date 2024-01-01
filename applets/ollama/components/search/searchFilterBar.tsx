import React from "react";
import { useRouter } from "expo-router";
import { XStack, Button, GetProps, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { FlashList } from "@shopify/flash-list";
import { Screens } from "@astrysk/constants";
import { useOllamaStore } from "../../store";
import {
  CancelFilterButton,
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
import { checkActiveStatus, isEmpty } from "@astrysk/utils";
import { ViewType } from "@astrysk/types";
import { handleFilterPress } from "@astrysk/utils/utils/search";

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
    {
      id: "ollama:type",
      options: [{ value: "ollama:models" }, { value: "ollama:chatHistory" }],
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
              handlePress={(id: string, isToggle?: boolean) => {
                handleFilterPress<
                  OllamaDetailScreenProps,
                  OllamaDetailScreenContext,
                  OllamaSearchFilterContext
                >(
                  router,
                  OllamaDetailScreenContext.SearchFilter,
                  context,
                  id,
                  isToggle
                );
              }}
              active={checkActiveStatus<OllamaSearchFilterContext>(
                searchFilters,
                context,
                item.id
              )}
              activeBackgroundColor={ollamaColors.primary}
              appletColors={ollamaColors}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <CancelFilterButton
                active={isEmpty(searchFilters?.[context])}
                activeBackgroundColor={ollamaColors.primary}
                appletColors={ollamaColors}
                clearFilter={clearFiltersForContext}
              />
            </>
          }
          ListFooterComponent={() => <XStack marginLeft="$3" />}
          estimatedItemSize={69}
        />
      </XStack>
    </XStack>
  );
};
export default OllamaSearchFilterBar;
