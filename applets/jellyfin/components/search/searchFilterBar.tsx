import React, { Suspense } from "react";
import { useRouter } from "expo-router";
import { XStack, Button, Text, GetProps, Stack } from "tamagui";
import { X, ChevronDown } from "@tamagui/lucide-icons";
import { useGetGenres } from "../../api";
import { FlashList } from "@shopify/flash-list";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
  JellyfinFilter,
  JellyfinSearchFilterContext,
} from "../../types";
import { Screens } from "@astrysk/constants";
import { useJellyfinStore } from "../../store";
import { FilterButton } from "@astrysk/components";

const getJellyfinFilterBarOptions = (
  context: JellyfinSearchFilterContext,
  genres?: string[]
): JellyfinFilter[] => {
  return [
    ...(context === JellyfinSearchFilterContext.Search
      ? [
          {
            id: "jellyfin:type",
            options: [
              "jellyfin:movie",
              "jellyfin:series",
              "jellyfin:episode",
              "jellyfin:season",
              "jellyfin:person",
            ], // as BaseItemKind[],
          },
        ]
      : []),
    ...(context === JellyfinSearchFilterContext.Collection
      ? [
          {
            id: "jellyfin:genre",
            options: genres as string[],
          },
        ]
      : []),
    ...(context === JellyfinSearchFilterContext.Collection
      ? [
          {
            id: "jellyfin:status",
            options: [
              "jellyfin:played",
              "jellyfin:unplayed",
              "jellyfin:favourite",
            ],
          },
        ]
      : []),
    {
      id: "jellyfin:order",
      options: [
        "jellyfin:nameAscending",
        "jellyfin:nameDescending",
        "jellyfin:premiereDateAscending",
        "jellyfin:premiereDateDescending",
      ],
    },
  ];
};

const JellyfinSearchFilterBar: React.FC<{
  context: JellyfinSearchFilterContext;
  handleClearAllFilters?: () => void;
  style?: GetProps<typeof Stack>;
}> = ({ context, handleClearAllFilters, style }) => {
  const router = useRouter();
  const userId = useJellyfinStore.getState().userDetails?.Id as string;

  const searchFilters = useJellyfinStore((state) => state.searchFilters);

  const genres = useGetGenres({
    userId: userId,
  });

  const handleFilterPress = (id: string) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: JellyfinDetailScreenContext.SearchFilter,
        searchContext: context,
        itemId: id,
      } as JellyfinDetailScreenProps,
    });
  };

  const clearFiltersForContext = () => {
    // Don't clear filters if there are none
    if (!searchFilters?.[context]) return;
    // Clear filters for context
    useJellyfinStore.setState((state) => ({
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
    const filterBarOptions = getJellyfinFilterBarOptions(
      context,
      (genres.data?.Items?.map((item) => item?.Name) as string[]) ?? []
    );
    useJellyfinStore.setState((state) => ({
      filterBarOptions: {
        ...state.filterBarOptions,
        [context]: filterBarOptions,
      },
    }));
    return filterBarOptions;
  }, [context, genres?.data?.Items]);

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
              activeBackgroundColor="$purple7"
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
                  searchFilters?.[context] ? "$purple7" : "$gray5"
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
export default JellyfinSearchFilterBar;
