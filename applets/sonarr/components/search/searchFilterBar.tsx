import React, { Suspense } from "react";
import { useRouter } from "expo-router";
import { XStack, Button, Text, GetProps, Stack } from "tamagui";
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

const getSonarrFilterBarOptions = (
  context: SonarrSearchFilterContext
): SonarrFilter[] => {
  return [
    {
      id: "sonarr:status",
      options: [
        "sonarr:all",
        "sonarr:monitored",
        "sonarr:unmonitored",
        "sonarr:continuing",
        "sonarr:ended",
        "sonarr:missing",
      ],
    },
    {
      id: "sonarr:order",
      options: [
        "sonarr:nameAscending",
        "sonarr:nameDescending",
        "sonarr:dateAddedAscending",
        "sonarr:dateAddedDescending",
        "sonarr:episodesAscending",
        "sonarr:episodesDescending",
        "sonarr:networkAscending",
        "sonarr:networkDescending",
        "sonarr:nextAiringAscending",
        "sonarr:nextAiringDescending",
        "sonarr:previousAiringAscending",
        "sonarr:previousAiringDescending",
        "sonarr:qualityProfileAscending",
        "sonarr:qualityProfileDescending",
        "sonarr:sizeAscending",
        "sonarr:sizeDescending",
        "sonarr:typeAscending",
        "sonarr:typeDescending",
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
  // const userId = useSonarrStore.getState().userDetails?.Id as string;

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
              data={item.options}
              handlePress={handleFilterPress}
              active={checkActiveStatus(item.id)}
              activeBackgroundColor="$blue7"
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
                backgroundColor={searchFilters?.[context] ? "$blue7" : "$gray5"}
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
