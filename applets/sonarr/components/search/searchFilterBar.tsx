import React from "react";
import { useRouter } from "expo-router";
import { XStack, Button, GetProps, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { FlashList } from "@shopify/flash-list";
import { Screens } from "@astrysk/constants";
import { useSonarrStore } from "../../store";
import { FilterButton } from "@astrysk/components";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
  SonarrFilter,
  SonarrSearchFilterContext,
} from "../../types";
import { sonarrColors } from "../../colors";
import { isEmpty } from "@astrysk/utils";

const getSonarrFilterBarOptions = (
  context: SonarrSearchFilterContext
): SonarrFilter[] => {
  return [
    {
      id: "sonarr:status",
      options: [
        { value: "sonarr:monitored" },
        { value: "sonarr:unmonitored" },
        { value: "sonarr:continuing" },
        { value: "sonarr:ended" },
        { value: "sonarr:missing" },
      ],
    },
    {
      id: "sonarr:order",
      options: [
        { value: "sonarr:alphabetical", supportsOrderBy: true },
        { value: "sonarr:dateAdded", supportsOrderBy: true },
        { value: "sonarr:episodes", supportsOrderBy: true },
        { value: "sonarr:network", supportsOrderBy: true },
        { value: "sonarr:nextAiring", supportsOrderBy: true },
        // { value: "sonarr:previousAiring", supportsOrderBy: true },
        { value: "sonarr:qualityProfile", supportsOrderBy: true },
        { value: "sonarr:size", supportsOrderBy: true },
        { value: "sonarr:type", supportsOrderBy: true },
      ],
    },
  ];
};

const SonarrSearchFilterBar: React.FC<{
  context: SonarrSearchFilterContext;
  handleClearAllFilters?: () => void;
  style?: GetProps<typeof Stack>;
}> = ({ context, handleClearAllFilters, style }) => {
  const router = useRouter();

  const searchFilters = useSonarrStore((state) => state.searchFilters);

  const handleFilterPress = (id: string) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: SonarrDetailScreenContext.SearchFilter,
        searchContext: context,
        itemId: id,
      } as SonarrDetailScreenProps,
    });
  };

  const clearFiltersForContext = () => {
    // Don't clear filters if there are none
    if (!searchFilters?.[context]) return;
    // Clear filters for context
    useSonarrStore.setState((state) => ({
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
    const filterBarOptions = getSonarrFilterBarOptions(context);
    useSonarrStore.setState((state) => ({
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
              activeBackgroundColor={sonarrColors.primary}
              // activeBackgroundColor={sonarrColors.accentColor}
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
                    : sonarrColors.primary
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
export default SonarrSearchFilterBar;
