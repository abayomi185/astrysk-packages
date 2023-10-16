import React, { Suspense } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { YStack, XStack, H6 } from "tamagui";
import * as Crypto from "expo-crypto";
import { BaseItemDto, ImageType, useGetLatestMedia } from "../../api";
import { Image, ImageSource } from "expo-image";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/styles";
import { useSetLoadingSpinner } from "@astrysk/utils";
import { useJellyfinStore } from "../../store";
import { Screens } from "@astrysk/constants";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";
import { FlashList } from "@shopify/flash-list";
import { onItemLayout } from "@astrysk/utils";

const JellyfinRecentlyAddedItem: React.FC<{
  index: number;
  recentlyAddedItem: BaseItemDto;
}> = ({ index, recentlyAddedItem }) => {
  const router = useRouter();
  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const primaryBlurHash: string = recentlyAddedItem.ImageTags?.[
    ImageType.Primary
  ] as string;

  const recentlyAddedItemId: string = recentlyAddedItem.Id as string;

  const goToDetailScreen = () => {
    router.push({
      pathname: `/${Screens.HOME_SCREEN_DETAIL_ROUTE}+${Crypto.randomUUID()}`,
      params: {
        context: JellyfinDetailScreenContext.RecentlyAdded,
        itemCacheIndex: index.toString(),
        itemId: recentlyAddedItem.Id,
      } as JellyfinDetailScreenProps,
    });
  };

  return (
    <>
      <YStack
        width="$9"
        marginLeft="$3"
        pressStyle={{ scale: 0.97 }}
        animation="delay"
        onPress={() => goToDetailScreen()}
      >
        <YStack height="$12" borderRadius="$6" backgroundColor="$gray6">
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
            source={
              {
                uri: `${baseURL}/Items/${recentlyAddedItemId}/Images/Primary`,
                headers: {
                  "X-Emby-Authorization": token,
                },
              } as ImageSource
            }
            placeholder={
              recentlyAddedItem.ImageBlurHashes?.Primary?.[
                primaryBlurHash
              ] as string
            }
            recyclingKey={recentlyAddedItemId}
            placeholderContentFit="cover"
          />
        </YStack>
        <YStack paddingHorizontal="$1" paddingTop="$1">
          <H6
            color="$color"
            ellipsizeMode="tail"
            numberOfLines={2}
            lineHeight={25}
          >
            {recentlyAddedItem.Name}
          </H6>
        </YStack>
      </YStack>
    </>
  );
};

const JellyfinRecentlyAdded: React.FC = () => {
  const { t } = useTranslation();

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const latestMedia = useGetLatestMedia(
    userId,
    { limit: 50 },
    {
      query: {
        // initialData: () => {
        //   // WARN: Make use of time to regulate query staletime
        //   // return useJellyfinStore.getState().mediaCache?.resumeMediaCache.data;
        // },
        onSuccess: (data) => {
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                latestMediaCache: { data: data },
              },
            },
          }));
        },
      },
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      latestMedia.refetch({
        cancelRefetch: false,
      });
      return () => {};
    }, [])
  );

  useSetLoadingSpinner(latestMedia);

  return (
    <>
      <SectionTitle>{t("jellyfin:recentlyAdded")}</SectionTitle>
      <YStack minHeight="$14">
        <Suspense>
          <XStack flex={1} minHeight={flashListHeight}>
            <FlashList
              horizontal
              data={latestMedia.data}
              renderItem={({ item, index }) => (
                <YStack
                  onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
                >
                  <JellyfinRecentlyAddedItem
                    index={index}
                    recentlyAddedItem={item}
                  />
                </YStack>
              )}
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              ListFooterComponent={() => <XStack marginLeft="$3" />}
              estimatedItemSize={100}
            />
          </XStack>
        </Suspense>
      </YStack>
    </>
  );
};

export default JellyfinRecentlyAdded;
