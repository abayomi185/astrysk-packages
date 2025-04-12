import React, { Suspense } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { YStack, XStack } from "tamagui";
import * as Crypto from "expo-crypto";
import { BaseItemDto, ImageType, useGetUserViews } from "../../api";
import { Image, ImageSource } from "expo-image";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/styles";
import { useQueryEvents, useQueryLoadingSpinner } from "@astrysk/utils";
import { useJellyfinStore } from "../../store";
import { Screens } from "@astrysk/constants";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";
import { FlashList } from "@shopify/flash-list";
import { onItemLayout } from "@astrysk/utils";

const JellyfinViewsItem: React.FC<{
  index: number;
  viewsItem: BaseItemDto;
}> = ({ index, viewsItem }) => {
  const router = useRouter();
  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const primaryBlurHash: string = viewsItem.ImageTags?.[
    ImageType.Primary
  ] as string;

  const recentlyAddedItemId: string = viewsItem.Id as string;

  const goToDetailScreen = () => {
    router.push({
      pathname: `/${Screens.HOME_SCREEN_DETAIL_ROUTE}+${Crypto.randomUUID()}`,
      params: {
        context: JellyfinDetailScreenContext.Views,
        itemCacheIndex: index.toString(),
        itemId: viewsItem.Id,
      } as JellyfinDetailScreenProps,
    });
  };

  return (
    <>
      <YStack
        width="$20"
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
              viewsItem.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
            }
            recyclingKey={recentlyAddedItemId}
            placeholderContentFit="cover"
          />
        </YStack>
      </YStack>
    </>
  );
};

const JellyfinViews: React.FC = () => {
  const { t } = useTranslation();

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const views = useGetUserViews(
    userId,
    { includeExternalContent: false },
    {
      query: {
        select: (data) => {
          return data.Items as BaseItemDto[];
        },
      },
    }
  );
  useQueryEvents(views, {
    onSuccess: (data) => {
      useJellyfinStore.setState((state) => ({
        mediaCache: {
          [serverId]: {
            ...state.mediaCache?.[serverId],
            viewsMediaCache: { data: data },
          },
        },
      }));
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      views.refetch({
        cancelRefetch: false,
      });
      return () => {};
    }, [])
  );

  useQueryLoadingSpinner(views);

  return (
    <>
      <SectionTitle>{t("jellyfin:media")}</SectionTitle>
      <YStack minHeight="$14">
        <Suspense>
          <XStack flex={1} minHeight={flashListHeight}>
            <FlashList
              horizontal
              data={views.data}
              renderItem={({ item, index }) => (
                <YStack
                  onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
                >
                  <JellyfinViewsItem index={index} viewsItem={item} />
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

export default JellyfinViews;
