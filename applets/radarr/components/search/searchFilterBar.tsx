import React from "react";
import { useRouter } from "expo-router";
import { XStack, Button, GetProps, Stack } from "tamagui";
import { X, LayoutGrid, List } from "@tamagui/lucide-icons";
import { FlashList } from "@shopify/flash-list";
import { Screens } from "@astrysk/constants";
import { useRadarrStore } from "../../store";
import {
  FilterButton,
  ViewTypeButton,
  changeViewType,
} from "@astrysk/components";
import {
  RadarrDetailScreenContext,
  RadarrDetailScreenProps,
  RadarrFilter,
  RadarrSearchFilterContext,
} from "../../types";
import { radarrColors } from "../../colors";
import { isEmpty } from "@astrysk/utils";
import { ViewType } from "@astrysk/types";
import { RADARR_SUPPORTED_VIEW_TYPES } from "../../utils";

const getRadarrFilterBarOptions = (
  context: RadarrSearchFilterContext
): RadarrFilter[] => {
  return [
    {
      id: "radarr:status",
      options: [
        { value: "radarr:monitored" },
        { value: "radarr:unmonitored" },
        { value: "radarr:missing" },
        { value: "radarr:wanted" },
        // { value: "radarr:cutoffUnmet" },
      ],
    },
    {
      id: "radarr:order",
      options: [
        { value: "radarr:alphabetical", supportsOrderBy: true },
        { value: "radarr:dateAdded", supportsOrderBy: true },
        { value: "radarr:digitalRelease", supportsOrderBy: true },
        { value: "radarr:physicalRelease", supportsOrderBy: true },
        { value: "radarr:inCinemas", supportsOrderBy: true },
        // { value: "radarr:minimumAvailability", supportsOrderBy: true },
        { value: "radarr:runtime", supportsOrderBy: true },
        // { value: "radarr:qualityProfile", supportsOrderBy: true },
        { value: "radarr:size", supportsOrderBy: true },
        { value: "radarr:studio", supportsOrderBy: true },
        { value: "radarr:year", supportsOrderBy: true },
      ],
    },
  ];
};

const RadarrSearchFilterBar: React.FC<{
  context: RadarrSearchFilterContext;
  handleClearAllFilters?: () => void;
  style?: GetProps<typeof Stack>;
}> = ({ context, handleClearAllFilters, style }) => {
  const router = useRouter();

  const viewType = useRadarrStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useRadarrStore((state) => state.searchFilters);

  const handleFilterPress = (id: string) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: RadarrDetailScreenContext.SearchFilter,
        searchContext: context,
        itemId: id,
      } as RadarrDetailScreenProps,
    });
  };

  const clearFiltersForContext = () => {
    // Don't clear filters if there are none
    if (!searchFilters?.[context]) return;
    // Clear filters for context
    useRadarrStore.setState((state) => ({
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
    const filterBarOptions = getRadarrFilterBarOptions(context);
    useRadarrStore.setState((state) => ({
      filterBarOptions: {
        ...state.filterBarOptions,
        [context]: filterBarOptions,
      },
    }));
    return filterBarOptions;
  }, [context]);

  return (
    <XStack
      height="$4"
      backgroundColor="$backgroundTransparent"
      {...style}
      justifyContent="space-between"
    >
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
              activeBackgroundColor={radarrColors.primary}
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
                    : radarrColors.primary
                }
                onPress={() => clearFiltersForContext()}
              >
                <X size={18} opacity={0.8} />
              </Button>
            </XStack>
          }
          ListFooterComponent={() => <XStack marginRight="$3" />}
          estimatedItemSize={69}
        />
      </XStack>
      <XStack width="$3" marginLeft="$2.5" marginRight="$3" alignItems="center">
        <ViewTypeButton
          viewType={viewType}
          onPressHandler={() => {
            changeViewType(
              viewType,
              RADARR_SUPPORTED_VIEW_TYPES,
              useRadarrStore
            );
          }}
        />
      </XStack>
    </XStack>
  );
};
export default RadarrSearchFilterBar;
