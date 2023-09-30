import React, { Suspense } from "react";
import { Alert } from "react-native";
import { useRouter, useNavigation, useFocusEffect } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Text, YStack, XStack, H6, Progress, ProgressIndicator } from "tamagui";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";

import { BaseItemDto, BaseItemKind, useGetResumeItems } from "../../api";

import {
  isTestflightBuild,
  setLoadingSpinner,
  useLoadingSpinner,
} from "@astrysk/utils";
import { useJellyfinStore } from "../../store";
import { Actions, Screens } from "@astrysk/constants";
import { onItemLayout } from "@astrysk/utils";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";

const JellyfinResumeMediaItem: React.FC<{
  index: number;
  resumeItem: BaseItemDto;
}> = ({ resumeItem }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const backdropBlurHash: string =
    (resumeItem.ParentBackdropImageTags?.[0] as string) ||
    (resumeItem.BackdropImageTags?.[0] as string);
  const backdropImageId: string = resumeItem.ParentBackdropItemId as string;
  const backdropImageExists: boolean =
    Boolean(backdropImageId) ||
    (resumeItem.BackdropImageTags?.length as number) > 0;
  const primaryImageId: string = resumeItem.Id as string;

  const getItemNameForVideoPlayer = () => {
    if (resumeItem.Type === BaseItemKind.Episode) {
      return `${resumeItem.SeriesName} - ${
        resumeItem.ParentIndexNumber ? `S${resumeItem.ParentIndexNumber}:` : ""
      }E${resumeItem.IndexNumber} - ${resumeItem.Name}`;
    } else {
      return resumeItem.Name;
    }
  };

  const continuePlayingMedia = () => {
    if (isTestflightBuild) {
      router.push({
        pathname: `/${Screens.ROOT_FS_MODAL_ROUTE}`,
        params: {
          context: JellyfinDetailScreenContext.SeriesDetail,
          itemId: resumeItem?.Id,
          itemName: getItemNameForVideoPlayer(),
        } as JellyfinDetailScreenProps,
      });
    } else {
      Alert.alert(
        t("jellyfin:alert:playbackNotAvailable"),
        t("jellyfin:alert:playbackNotAvailableReason") as string
      );
    }
  };

  const imageId = backdropImageId ? backdropImageId : primaryImageId;

  return (
    <YStack
      width="$20"
      marginLeft="$3"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => continuePlayingMedia()}
    >
      <YStack height="$12" borderRadius="$6" backgroundColor="$gray6">
        <Image
          style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
          source={{
            uri: `${baseURL}/Items/${imageId}/Images/${
              backdropImageExists ? "Backdrop" : "Primary"
            }?api_key=${token}`,
          }}
          placeholder={
            resumeItem.ImageBlurHashes?.Backdrop?.[backdropBlurHash] as string
          }
          transition={200}
          recyclingKey={imageId}
          placeholderContentFit="cover"
        />
        <YStack
          position="absolute"
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Ionicons name="play" size={56} color="#fff" /> */}
          {/* <Button icon={<Play size="$5" />}></Button> */}
          <Progress
            size="$1"
            position="absolute"
            bottom={9}
            width="89%"
            backgroundColor="$gray9Dark"
            value={resumeItem.UserData?.PlayedPercentage}
            elevate
          >
            <ProgressIndicator backgroundColor="$gray12Dark" />
          </Progress>
        </YStack>
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        {resumeItem.Type === "Episode" && (
          <>
            <H6 color="$color" ellipsizeMode="tail" numberOfLines={1}>
              {resumeItem.SeriesName}
            </H6>
            <XStack>
              <Text color="$color"></Text>
              <Text
                color="$color"
                ellipsizeMode="tail"
                numberOfLines={1}
                opacity={0.6}
              >
                {resumeItem.ParentIndexNumber
                  ? `S${resumeItem.ParentIndexNumber}:E${resumeItem.IndexNumber} ${resumeItem.Name}`
                  : `${resumeItem.Name}`}
              </Text>
            </XStack>
          </>
        )}
        {resumeItem.Type === "Movie" && (
          <>
            <H6
              color="$color"
              ellipsizeMode="tail"
              numberOfLines={1}
              marginTop="$2"
            >
              {resumeItem.Name}
            </H6>
          </>
        )}
      </YStack>
    </YStack>
  );
};

// WARN: Add on-mount animation for Flatlist - Reanimated
const JellyfinResumeMedia: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const resumeItems = useGetResumeItems(
    userId,
    {},
    {
      query: {
        initialData: () => {
          // WARN: Make use of time to regulate query staletime
          return useJellyfinStore.getState().mediaCache?.[serverId]
            ?.resumeMediaCache?.data;
        },
        onSuccess: (data) => {
          // Set state for this data to cache it and read from state instead
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                resumeMediaCache: { data: data },
              },
            },
          }));
          setLoadingSpinner(JellyfinResumeMedia.name, Actions.DONE);
        },
        onError: () => {
          // WARN: If it errors, handle it and direct user to re-authenticate
          // console.log("Error querying resumeItems");
          setLoadingSpinner(JellyfinResumeMedia.name, Actions.DONE);
          // WARN: Use Error Toast. Put toast in Tab Navigator component; think of something
        },
      },
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      resumeItems.refetch({
        cancelRefetch: false,
      });
      return () => {};
    }, [])
  );

  useLoadingSpinner(JellyfinResumeMedia.name);

  return (
    <YStack minHeight="$14.5" marginTop="$3">
      <Suspense>
        <XStack flex={1} minHeight={flashListHeight}>
          <FlashList
            horizontal
            data={resumeItems.data?.Items}
            renderItem={({ item, index }) => (
              <YStack
                onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
              >
                <JellyfinResumeMediaItem index={index} resumeItem={item} />
              </YStack>
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            ListFooterComponent={() => <XStack marginLeft="$3" />}
            estimatedItemSize={320}
          />
        </XStack>
      </Suspense>
    </YStack>
  );
};

export default JellyfinResumeMedia;
