import React from "react";
import { RefreshControl } from "react-native";
import { XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";

import { useJellyfinConfigurator } from "../utils";

import JellyfinResumeMedia from "../components/home/resumeMedia";
import JellyfinRecentlyAdded from "../components/home/recentlyAdded";
import JellyfinNextUp from "../components/home/nextUp";
import { useJellyfinHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import JellyfinViews from "../components/home/views";
import debounce from "lodash.debounce";
import { jellyfinColors } from "../colors";
// import LatestMedia from "@applets/jellyfin/components/home/latestMedia";

// const ResumeMedia = React.lazy(
//   () => import("@applets/jellyfin/components/resumeMedia")
// );

const JellyfinHome: React.FC = () => {
  useJellyfinConfigurator();

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  // WARN: Using state with this can allow for customisation of order
  const listOrder = React.useMemo(() => {
    if (refreshing === false) {
      return [
        {
          component: () => <JellyfinResumeMedia />,
        },
        {
          // header: () => <SectionTitle>{t("jellyfin:nextUp")}</SectionTitle>,
          component: () => <JellyfinNextUp />,
        },
        {
          // header: () => (
          //   <SectionTitle>{t("jellyfin:recentlyAdded")}</SectionTitle>
          // ),
          component: () => <JellyfinRecentlyAdded />,
        },
        {
          component: () => <JellyfinViews />,
        },
        // {
        //   component: () => (
        //     <LatestMedia resumeItems={resumeItems.data?.Items as BaseItemDto[]} />
        //   ),
        // },
      ];
    }
  }, [refreshing]);

  useJellyfinHomeHeader(navigation);

  return (
    <YStack height="100%">
      <FlashList
        data={listOrder}
        renderItem={({ item }) => (
          <>
            <item.component />
          </>
        )}
        ListFooterComponent={() => <XStack height="$13" />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={198}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={debounce(() => refreshing, 300)() ?? false}
        //     onRefresh={onRefresh}
        //     tintColor="#8E4EC6"
        //   />
        // }
        refreshControl={
          <RefreshControl
            refreshing={
              // WARN: Change this
              // This does not work as imagined
              debounce(() => refreshing, 100, {
                leading: false,
                trailing: true,
              })() ?? false
            }
            onRefresh={onRefresh}
            tintColor={jellyfinColors.accentColor}
          />
        }
      />
    </YStack>
  );
};

export default JellyfinHome;
