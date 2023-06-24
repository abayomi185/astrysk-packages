import React from "react";
import { BaseItemDto, BaseItemPerson, useGetItem } from "../../api";
import { useJellyfinStore } from "../../store";

import { Image, ImageSource } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { YStack, Text, XStack, H2, H4, H6 } from "tamagui";
import {
  roundToNearestStandardResolution,
  setLoadingSpinner,
} from "../../utils";
import { Actions, Screens } from "@astrysk/constants";
import { useTranslation } from "react-i18next";
import JellyfinDetailSection from "./section";
import JellyfinCastAndCrew from "./castAndCrew";
import { useJellyfinDetailHeader } from "../useHeader";
import { useNavigation, useRouter } from "expo-router";
import { JellyfinMovieActionPanel } from "./videoActionPanel";
import { TFunction } from "i18next";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";

const JellyfinMovieDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const movieId: string = forwardedData.Id as string;
  const movieName: string = forwardedData.Name as string;
  const backdropImageHash: string = forwardedData
    .BackdropImageTags?.[0] as string;
  const movieBoxImageHash: string =
    forwardedData.SeriesPrimaryImageTag as string;

  const yOffset = React.useRef(new Animated.Value(0)).current;
  const minHeight = 150;
  const maxHeight = 350;

  const headerOpacity = yOffset.interpolate({
    inputRange: [minHeight, maxHeight - 30],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const headerScale = yOffset.interpolate({
    inputRange: [-maxHeight, 0],
    outputRange: [3, 1],
    extrapolate: "clamp",
  });
  const imageOverlay = yOffset.interpolate({
    inputRange: [50, maxHeight],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const imageScrollOffset = yOffset.interpolate({
    inputRange: [0, maxHeight],
    outputRange: [0, -maxHeight],
    extrapolate: "clamp",
  });

  // const [movieData, setMovieData] = React.useState<BaseItemDto>();

  const [readMore, setReadMore] = React.useState(false);
  const [summaryLines, setSummaryLines] = React.useState(4);

  // Get Movie data
  const movieData = useGetItem(userId, movieId as string, {
    query: {
      initialData: () => {
        return useJellyfinStore.getState().mediaCache?.[serverId]
          ?.movieMediaCache?.[movieId]?.data;
      },
      onSuccess: (data) => {
        useJellyfinStore.setState((state) => ({
          mediaCache: {
            [serverId]: {
              ...state.mediaCache?.[serverId],
              movieMediaCache: {
                ...state.mediaCache?.[serverId]?.movieMediaCache,
                [movieId]: {
                  data: data,
                },
              },
            },
          },
        }));
        setLoadingSpinner(JellyfinMovieDetail.name, Actions.DONE);
      },
      onError: () => {
        setLoadingSpinner(JellyfinMovieDetail.name, Actions.DONE);
      },
    },
  });

  const getRuntimeFromTicks = (t: TFunction, runTimeTicks: number) => {
    const seconds = runTimeTicks / 10000000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}${t("jellyfin:hour")} ${minutes}${t("jellyfin:minute")}`;
  };

  const goToMoreDetailsScreen = () => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: JellyfinDetailScreenContext.MovieMoreDetail,
        itemId: movieId,
      } as JellyfinDetailScreenProps,
    });
  };

  const goToDescriptionScreen = () => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: JellyfinDetailScreenContext.MovieDescription,
        itemId: movieId,
      } as JellyfinDetailScreenProps,
    });
  };

  const goToPlayScreen = () => {
    router.push({
      pathname: `/${Screens.ROOT_FS_MODAL_ROUTE}`,
      params: {
        context: JellyfinDetailScreenContext.MovieDetail,
        itemId: movieId,
        itemName: movieName,
      } as JellyfinDetailScreenProps,
    });
  };

  // useLoadingSpinner(JellyfinSeriesDetail.name);
  useJellyfinDetailHeader(navigation, movieName, headerOpacity);

  return (
    <>
      <Animated.View
        style={{
          width: "100%",
          height: maxHeight,
          position: "absolute",
          transform: [
            { scale: headerScale },
            { translateY: imageScrollOffset },
          ],
        }}
      >
        <Image
          style={{ flex: 1, overflow: "hidden", height: maxHeight }}
          source={
            {
              uri: `${baseURL}/Items/${movieId}/Images/Backdrop`,
              headers: {
                "X-Emby-Authorization": token,
              },
            } as ImageSource
          }
          placeholder={
            forwardedData.ImageBlurHashes?.Backdrop?.[
              backdropImageHash
            ] as string
          }
          onLoadEnd={() => {
            setLoadingSpinner(JellyfinMovieDetail.name, Actions.DONE);
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          width: "100%",
          height: maxHeight,
          position: "absolute",
          opacity: imageOverlay,
        }}
      >
        <YStack flex={1} backgroundColor="$backgroundTransparent" />
      </Animated.View>
      <Animated.ScrollView
        style={{
          flex: 1,
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <YStack paddingTop={maxHeight}>
          <YStack backgroundColor="$backgroundTransparent">
            <YStack paddingHorizontal="$3" paddingVertical="$2">
              <H2 textAlign="center" marginTop="$3">
                {movieName}
              </H2>
            </YStack>
            <YStack paddingHorizontal="$3">
              <JellyfinMovieActionPanel
                hasBeenWatched={movieData.data?.UserData?.Played}
                // setWatchedStatus={setWatchedStatus}
                playMovie={goToPlayScreen}
                moreDetails={goToMoreDetailsScreen}
              />
              <XStack marginTop="$4" justifyContent="center">
                {movieData && (
                  <>
                    <XStack alignItems="center">
                      <Ionicons name="star" color="gray" />
                      <Text marginLeft="$1.5" color="$gray10">
                        {movieData.data?.CommunityRating}
                      </Text>
                    </XStack>
                    <Text marginLeft="$3" color="$gray10">
                      {getRuntimeFromTicks(
                        t,
                        movieData.data?.RunTimeTicks as number
                      )}
                    </Text>
                    <Text marginLeft="$3" color="$gray10">
                      {movieData.data?.ProductionYear}
                    </Text>
                    <Text marginLeft="$3" color="$gray10">
                      {movieData.data?.OfficialRating}
                    </Text>
                    <Text marginLeft="$3" color="$gray10">
                      {`${roundToNearestStandardResolution(
                        movieData.data?.Height as number
                      )}p`}
                    </Text>
                  </>
                )}
              </XStack>
              <JellyfinDetailSection header={t("jellyfin:description")}>
                <Text
                  color="$gray11"
                  numberOfLines={readMore ? 0 : 4}
                  onTextLayout={(e) =>
                    setSummaryLines(e.nativeEvent.lines.length)
                  }
                >
                  {movieData.data?.Overview}
                </Text>
                <Text
                  display={!readMore && summaryLines >= 4 ? "flex" : "none"}
                  color="$blue10Dark"
                  onPress={() => {
                    goToDescriptionScreen();
                  }}
                >
                  {t("jellyfin:readMore")}
                </Text>
              </JellyfinDetailSection>
            </YStack>
            <JellyfinDetailSection
              header={t("jellyfin:castAndCrew")}
              headerPadding
            >
              <JellyfinCastAndCrew
                people={movieData.data?.People as BaseItemPerson[]}
              />
            </JellyfinDetailSection>
            <XStack height="$3" />
          </YStack>
        </YStack>
      </Animated.ScrollView>
    </>
  );
};

export default JellyfinMovieDetail;
