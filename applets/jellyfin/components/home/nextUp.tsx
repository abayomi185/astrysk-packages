import React, { Suspense } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, YStack, XStack, H6, H3 } from "tamagui";
import * as Crypto from "expo-crypto";

import { BaseItemDto, ImageType, useGetNextUp } from "../../api";
import { Image, ImageSource } from "expo-image";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/styles";
import { setLoadingSpinner, useLoadingSpinner } from "../../utils";
import { useJellyfinStore } from "../../store";
import { Actions, Screens } from "@astrysk/constants";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";
import { onItemLayout } from "@astrysk/utils";

const JellyfinNextUpItem: React.FC<{
  index: number;
  nextUpItem: BaseItemDto;
}> = ({ index, nextUpItem }) => {
  const router = useRouter();

  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const primaryBlurHash: string = nextUpItem.ImageTags?.[
    ImageType.Primary
  ] as string;

  const seriesId: string = nextUpItem.SeriesId as string;

  const goToDetailScreen = () => {
    router.push({
      pathname: `/${Screens.HOME_SCREEN_DETAIL_ROUTE}+${Crypto.randomUUID()}`,
      params: {
        context: JellyfinDetailScreenContext.NextUp,
        itemCacheIndex: index.toString(),
        itemId: nextUpItem.Id, // Use id to check cache for data
      } as JellyfinDetailScreenProps,
    });
  };

  useLoadingSpinner(JellyfinNextUpItem.name);

  return (
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
              uri: `${baseURL}/Items/${seriesId}/Images/Primary`,
              headers: {
                "X-Emby-Authorization": token,
              },
            } as ImageSource
          }
          placeholder={
            nextUpItem.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
          }
          onLoadEnd={() => {
            setLoadingSpinner(JellyfinNextUpItem.name, Actions.DONE);
          }}
          recyclingKey={seriesId}
          placeholderContentFit="cover"
        />
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        <H6 color="$color" ellipsizeMode="tail" numberOfLines={1}>
          {nextUpItem.SeriesName}
        </H6>
        <Text color="$color" numberOfLines={1} opacity={0.6}>
          {nextUpItem.ParentIndexNumber
            ? `S${nextUpItem.ParentIndexNumber}:E${nextUpItem.IndexNumber} ${nextUpItem.Name}`
            : `${nextUpItem.Name}`}
        </Text>
      </YStack>
    </YStack>
  );
};

const JellyfinNextUp: React.FC = () => {
  const { t } = useTranslation();

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const nextUpMedia = useGetNextUp(
    { userId },
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
                nextUpMediaCache: { data: data },
              },
            },
          }));
          setLoadingSpinner(JellyfinNextUp.name, Actions.DONE);
        },
        onError: () => {
          // Call common function to alert or have indicator to show when there's an error.
          // Perhaps replace applet icon
          setLoadingSpinner(JellyfinNextUp.name, Actions.DONE);
        },
      },
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      nextUpMedia.refetch({
        cancelRefetch: false,
      });
      return () => {};
    }, [])
  );

  useLoadingSpinner(JellyfinNextUp.name);

  if (nextUpMedia.data?.Items?.length == 0) {
    return null;
  }

  return (
    <>
      <SectionTitle>{t("jellyfin:nextUp")}</SectionTitle>
      <YStack minHeight="$14" flexGrow={0}>
        {/* WARN: Add see more button here */}
        {/* May need to adjust padding */}
        <Suspense>
          <XStack flexGrow={1} height={flashListHeight}>
            <FlashList
              horizontal
              data={nextUpMedia.data?.Items}
              renderItem={({ item, index }) => (
                <YStack
                  onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
                >
                  <JellyfinNextUpItem index={index} nextUpItem={item} />
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

export default JellyfinNextUp;
