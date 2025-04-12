import React, { Suspense } from "react";
import { Alert } from "react-native";
import { H2, H3, YStack, Text, XStack, H4, H6, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";

import { Image, ImageSource } from "expo-image";
import {
  BaseItemDto,
  BaseItemDtoQueryResult,
  BaseItemKind,
  BaseItemPerson,
  ImageType,
  ItemFields,
  getGetEpisodesQueryKey,
  getGetItemQueryKey,
  useGetEpisodes,
  useGetItem,
  useGetItemImage,
  useGetSeasons,
  useMarkPlayedItem,
  useMarkUnplayedItem,
} from "../../api";
import { Actions, Screens } from "@astrysk/constants";
import {
  isTestflightBuild,
  setLoadingSpinner,
  useLoadingSpinner,
  useQueryEvents,
} from "@astrysk/utils";
import { useNavigation, useRouter, useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { JellyfinEpisodeActionPanel } from "../../components/detail/videoActionPanel";
import JellyfinDetailSection from "../../components/detail/section";
import { useJellyfinDetailHeader } from "../../components/useHeader";
import { useJellyfinStore } from "../../store";
import { Animated } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ContextMenu from "react-native-context-menu-view";
import JellyfinCastAndCrew from "./castAndCrew";
import JellyfinSeriesDetailEpisodeList from "./episodesList";
// import { resetLoadingComponent } from "@astrysk/components";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../../types";
import { useQueryClient } from "@tanstack/react-query";

const JellyfinSeriesDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const episodeData = useGetItem(userId, forwardedData.Id as string, {
    // query: {
    //   onSuccess: (data) => {
    //     // console.log(data);
    //   },
    // },
  });

  const seriesId: string =
    forwardedData.Type === BaseItemKind.Episode
      ? (forwardedData.SeriesId as string) ?? episodeData.data?.SeriesId
      : (forwardedData.Id as string);
  const seriesName: string =
    forwardedData.Type === BaseItemKind.Episode
      ? (forwardedData.SeriesName as string) ?? episodeData.data?.SeriesName
      : (forwardedData.Name as string);
  const backdropImageHash: string =
    forwardedData.Type === BaseItemKind.Episode
      ? (forwardedData.ParentBackdropImageTags?.[0] as string) ??
        episodeData.data?.ParentBackdropImageTags?.[0]
      : forwardedData.Type === BaseItemKind.Series
      ? (forwardedData.BackdropImageTags?.[0] as string) ??
        episodeData.data?.BackdropImageTags?.[0]
      : "";
  const seriesImageHash: string =
    forwardedData.Type === BaseItemKind.Episode
      ? (forwardedData.SeriesPrimaryImageTag as string) ??
        episodeData.data?.SeriesPrimaryImageTag
      : "";

  const yOffset = React.useRef(new Animated.Value(0)).current;
  const minHeight = 150;
  const maxHeight = 240;

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

  const [selectedSeasonID, setSelectedSeasonID] = React.useState<string>(); // ParentIndexNumber
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] =
    React.useState<number>();

  const [readMore, _] = React.useState(false);
  const [summaryLines, setSummaryLines] = React.useState(4);

  // Get Series data
  const seriesData = useGetItem(userId, seriesId as string, {
    query: {
      initialData: () => {
        return useJellyfinStore.getState().mediaCache?.[serverId]
          ?.seriesMediaCache?.[seriesId]?.data;
      },
    },
  });
  useQueryEvents(seriesData, {
    onSuccess: (data) => {
      useJellyfinStore.setState((state) => ({
        mediaCache: {
          [serverId]: {
            ...state.mediaCache?.[serverId],
            seriesMediaCache: {
              ...state.mediaCache?.[serverId]?.seriesMediaCache,
              [seriesId]: {
                data: data,
              },
            },
          },
        },
      }));
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
    onError: () => {
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
  });

  // Get all seasons for Series
  const seasonsData = useGetSeasons(seriesId);
  useQueryEvents(seasonsData, {
    onSuccess: (_data) => {
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
    onError: () => {
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
  });
  // Get season from forwardedData or set based on episodesData
  React.useEffect(() => {
    if ((seasonsData.data?.Items?.length ?? 0) > 0) {
      setSelectedSeasonID(
        (forwardedData.SeasonId as string) ||
          episodeData.data?.SeasonId ||
          seasonsData.data?.Items?.[0].Id
      );
    }
  }, [seasonsData.data]);

  // Get all episodes for all seasons
  const episodesData = useGetEpisodes(seriesId, {
    userId: userId,
    fields: [ItemFields.Overview],
  });
  useQueryEvents(episodesData, {
    // staleTime: 5_000,
    onSuccess: (data) => {
      // WARN: Cache this data in episodesMediaCache
      // setEpisodesData(data.Items as BaseItemDto[]);

      useJellyfinStore.setState((state) => ({
        mediaCache: {
          [serverId]: {
            ...state.mediaCache?.[serverId],
            episodesMediaCache: {
              ...state.mediaCache?.[serverId]?.episodesMediaCache,
              [seriesId]: {
                data: data.Items as BaseItemDto[],
              },
            },
          },
        },
      }));
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
    onError: () => {
      setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
    },
  });

  React.useEffect(() => {
    setSelectedEpisodeIndex(forwardedData.IndexNumber as number);
  }, []);

  const getSeasonDataUsingSeasonID = () => {
    return seasonsData.data?.Items?.[
      seasonsData.data.Items.findIndex((data) => data.Id === selectedSeasonID)
    ];
  };

  const onSelectEpisode = (indexNumber: number) => {
    setSelectedEpisodeIndex(indexNumber);
  };

  const markPlayedItem = useMarkPlayedItem({
    mutation: {
      onSuccess: () => {
        episodesData.refetch();
      },
    },
  });
  const markUnplayedItem = useMarkUnplayedItem({
    mutation: {
      onSuccess: () => {
        episodesData.refetch();
      },
    },
  });

  const queryClient = useQueryClient();

  const setWatchedStatus = () => {
    const episodeData = episodesData.data?.Items?.find(
      (episode) =>
        episode.SeasonId === selectedSeasonID &&
        episode.IndexNumber === selectedEpisodeIndex
    );

    episodeData
      ? episodeData?.UserData?.Played
        ? markUnplayedItem.mutate({
            userId: userId,
            itemId: episodeData.Id as string,
          })
        : markPlayedItem.mutate({
            userId: userId,
            itemId: episodeData.Id as string,
          })
      : Alert.alert(t("jellyfin:error:episodeNotSelected"));

    // Optimistically update cache before mutation
    queryClient.setQueryData<BaseItemDtoQueryResult>(
      getGetEpisodesQueryKey(seriesId, {
        userId: userId,
        fields: [ItemFields.Overview],
      }),

      (oldData) => {
        if (!oldData) {
          return undefined;
        }

        const newData = {
          ...oldData,
          Items: oldData.Items
            ? oldData.Items.map((item) => {
                if (item.Id === episodeData?.Id) {
                  return {
                    ...item,
                    UserData: {
                      ...item.UserData,
                      Played: !item.UserData?.Played,
                    },
                  };
                }
                return item;
              })
            : [],
        };
        return newData;
      }
    );
  };

  const goToMoreDetailsScreen = () => {
    const episodeData = episodesData.data?.Items?.find(
      (episode) =>
        episode.SeasonId === selectedSeasonID &&
        episode.IndexNumber === selectedEpisodeIndex
    );
    episodeData
      ? router.push({
          pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
          params: {
            context: JellyfinDetailScreenContext.EpisodeMoreDetail,
            itemId: seriesId,
            episodeId: episodeData?.Id,
          } as JellyfinDetailScreenProps,
        })
      : Alert.alert(t("jellyfin:error:episodeNotSelected"));
  };

  const goToDescriptionScreen = (seriesId: string) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: JellyfinDetailScreenContext.SeriesDescription,
        itemId: seriesId,
      } as JellyfinDetailScreenProps,
    });
  };

  const goToPlayScreen = () => {
    if (isTestflightBuild) {
      // selectedSeasonID
      const episodeData = episodesData.data?.Items?.find(
        (episode) =>
          episode.SeasonId === selectedSeasonID &&
          episode.IndexNumber === selectedEpisodeIndex
      );
      episodeData
        ? router.push({
            pathname: `/${Screens.ROOT_FS_MODAL_ROUTE}`,
            params: {
              context: JellyfinDetailScreenContext.SeriesDetail,
              itemId: episodeData?.Id,
              itemName:
                `${seriesName} - ` +
                `${
                  episodeData?.ParentIndexNumber
                    ? `S${episodeData?.ParentIndexNumber}:`
                    : ""
                }` +
                `E${episodeData?.IndexNumber} - ${episodeData?.Name}`,
            } as JellyfinDetailScreenProps,
          })
        : Alert.alert(t("jellyfin:error:episodeNotSelected"));
    } else {
      Alert.alert(
        t("jellyfin:alert:playbackNotAvailable"),
        t("jellyfin:alert:playbackNotAvailableReason") as string
      );
    }
  };

  const getSeriesWatchedStatus = () => seriesData?.data?.UserData?.Played;

  const setSeriesAsWatched = () => {
    if (!seriesData.data?.UserData?.Played) {
      Alert.alert(t("jellyfin:seriesDetail:markSeriesAsWatched"), undefined, [
        {
          text: "Cancel",
          style: "default",
        },
        {
          text: t("common:ok") as string,
          style: "default",
          onPress: () => {
            markPlayedItem.mutate(
              {
                userId: userId,
                itemId: seriesId as string,
              },
              {
                onSuccess: () => {
                  optimisticUpdateWatchedStatus();
                },
              }
            );
          },
        },
      ]);
    }

    seriesData.data?.UserData?.Played &&
      markUnplayedItem.mutate(
        {
          userId: userId,
          itemId: seriesId as string,
        },
        {
          onSuccess: () => {
            optimisticUpdateWatchedStatus();
          },
        }
      );
  };

  const optimisticUpdateWatchedStatus = () => {
    // Optimistically update cache before mutation
    queryClient.setQueryData<BaseItemDto>(
      getGetItemQueryKey(userId, seriesId),
      (oldData) => {
        if (!oldData) {
          return undefined;
        }
        const newData = {
          ...oldData,
          UserData: {
            ...oldData.UserData,
            Played: !oldData.UserData?.Played,
          },
        };
        return newData;
      }
    );
  };

  // Delay fetching until setSeriesAsWatched is effectively done
  React.useEffect(() => {
    seriesData.refetch();
    episodesData.refetch();
    seasonsData.refetch();
  }, [seriesData.data?.UserData?.Played]);

  // Filter episodes based on selected season
  const filteredEpisodeData = React.useMemo(
    () =>
      episodesData?.data?.Items?.filter(
        (data) => data.SeasonId === selectedSeasonID
      ) as BaseItemDto[],
    [selectedSeasonID, episodesData.data?.Items]
  );

  useFocusEffect(
    React.useCallback(() => {
      episodesData.isStale &&
        episodesData.refetch({
          cancelRefetch: false,
        });
      return () => {};
    }, [])
  );

  useLoadingSpinner(JellyfinSeriesDetail.name);
  useJellyfinDetailHeader(navigation, seriesName, headerOpacity);

  return (
    <>
      <Suspense>
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
            priority="high"
            source={
              {
                uri: `${baseURL}/Items/${seriesId}/Images/Backdrop`,
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
              setLoadingSpinner(JellyfinSeriesDetail.name, Actions.DONE);
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
              <YStack paddingHorizontal="$3">
                <H2 textAlign="center" marginTop="$3" numberOfLines={2}>
                  {seriesName}
                </H2>
                <YStack alignSelf="flex-start" marginTop="$3">
                  <ContextMenu
                    actions={[
                      {
                        title: `${t("jellyfin:selectSeason")}`,
                        inlineChildren: true,
                        actions: [
                          ...((seasonsData.data?.Items?.length ?? 0) > 0
                            ? (seasonsData.data?.Items || []).map((data) => ({
                                title: `${data.Name}`,
                              }))
                            : []),
                        ],
                      },
                    ]}
                    dropdownMenuMode
                    onPress={(event) => {
                      const { indexPath } = event.nativeEvent;
                      setSelectedSeasonID(
                        seasonsData.data?.Items?.[indexPath[1]].Id as string
                      );
                      setSelectedEpisodeIndex(
                        forwardedData.ParentIndexNumber ===
                          seasonsData.data?.Items?.[indexPath[1]].IndexNumber
                          ? (forwardedData.IndexNumber as number)
                          : (episodesData.data?.Items?.filter(
                              (data) =>
                                data.SeasonId ===
                                seasonsData.data?.Items?.[indexPath[1]].Id
                            )[0]?.IndexNumber as number)
                      );
                    }}
                  >
                    <XStack width="95%" alignItems="center">
                      <H3 color="$color" numberOfLines={2}>
                        {selectedSeasonID != null
                          ? getSeasonDataUsingSeasonID()?.Name
                          : `${t("jellyfin:season")}`}
                      </H3>
                      <Ionicons name="chevron-down" size={20} color="#8e4ec6" />
                    </XStack>
                  </ContextMenu>
                </YStack>
              </YStack>
              {/* WARN: Animate mount of this component; it will be a conditional mount */}
              <YStack height="$15" marginTop="$2">
                <Suspense>
                  {(episodesData.data?.Items?.length ?? 0) > 0 ? (
                    <JellyfinSeriesDetailEpisodeList
                      userId={userId}
                      episodesData={filteredEpisodeData}
                      selectedEpisodeIndex={selectedEpisodeIndex as number}
                      onSelectEpisode={onSelectEpisode}
                    />
                  ) : (
                    <FlashList
                      horizontal
                      data={[1, 2, 3]}
                      renderItem={() => (
                        <YStack width="$14" padding="$1">
                          <XStack
                            height="$10"
                            backgroundColor="$gray8"
                            borderRadius="$6"
                          />
                          <XStack
                            height="$2"
                            backgroundColor="$gray7"
                            borderRadius="$3"
                            marginTop="$2"
                          />
                          <XStack
                            height="$4"
                            backgroundColor="$gray7"
                            borderRadius="$3"
                            marginTop="$2"
                          />
                        </YStack>
                      )}
                      showsHorizontalScrollIndicator={false}
                      ListHeaderComponent={<XStack width="$0.75" />}
                      ListFooterComponent={<XStack width="$0.75" />}
                      estimatedItemSize={170}
                    />
                  )}
                </Suspense>
              </YStack>
              <YStack paddingHorizontal="$3">
                <JellyfinEpisodeActionPanel
                  parentIndexNumber={
                    getSeasonDataUsingSeasonID()?.IndexNumber as number
                  }
                  indexNumber={selectedEpisodeIndex as number}
                  hasBeenWatched={
                    filteredEpisodeData?.find(
                      (data) => data.IndexNumber === selectedEpisodeIndex
                    )?.UserData?.Played
                  }
                  setWatchedStatus={setWatchedStatus}
                  playEpisode={goToPlayScreen}
                  moreDetails={goToMoreDetailsScreen}
                />
                <JellyfinDetailSection header={t("jellyfin:description")}>
                  <Text
                    color="$gray11"
                    numberOfLines={readMore ? 0 : 4}
                    onTextLayout={(e) =>
                      setSummaryLines(e.nativeEvent.lines.length)
                    }
                  >
                    {seriesData.data?.Overview ??
                      t("jellyfin:noDescriptionAvailable")}
                  </Text>
                  <Text
                    display={!readMore && summaryLines >= 4 ? "flex" : "none"}
                    color="$blue10Dark"
                    onPress={() => {
                      goToDescriptionScreen(seriesId);
                    }}
                  >
                    {t("jellyfin:readMore")}
                  </Text>
                </JellyfinDetailSection>
              </YStack>
              {seriesData.data?.People &&
                seriesData.data?.People?.length > 0 && (
                  <JellyfinDetailSection
                    header={t("jellyfin:castAndCrew")}
                    headerPadding
                  >
                    <JellyfinCastAndCrew
                      people={seriesData.data?.People as BaseItemPerson[]}
                    />
                  </JellyfinDetailSection>
                )}
              <YStack paddingHorizontal="$3">
                <JellyfinDetailSection header={t("jellyfin:about")}>
                  <YStack>
                    <XStack
                      width="100%"
                      borderRadius="$6"
                      onPress={() => {
                        // router.push({
                        //   pathname: `/${Screens.HOME_SCREEN_DETAIL_ROUTE}${data.Type}`,
                        //   params: {},
                        // });
                      }}
                    >
                      <XStack height="$12" width="$9">
                        <Image
                          style={{
                            flex: 1,
                            overflow: "hidden",
                            borderRadius: 10,
                          }}
                          source={
                            {
                              uri: `${baseURL}/Items/${seriesId}/Images/Primary`,
                              headers: {
                                "X-Emby-Authorization": token,
                              },
                            } as ImageSource
                          }
                          placeholder={
                            forwardedData?.ImageBlurHashes?.Primary?.[
                              seriesImageHash
                            ] as string
                          }
                        />
                      </XStack>
                      <YStack flex={1} marginLeft="$4">
                        <H4 color="$color">{seriesName}</H4>
                        <H6 color="$gray11">
                          {seriesData.data?.ProductionYear}
                        </H6>
                        {seriesData.data?.CommunityRating && (
                          <XStack marginTop="$1.5" alignItems="center">
                            <Ionicons name="star" color="#9E9E9E" />
                            <Text marginLeft="$1.5" color="$gray11">
                              {seriesData.data?.CommunityRating}
                            </Text>
                          </XStack>
                        )}
                        <Text marginLeft="$3" color="$gray10">
                          {seriesData.data?.OfficialRating}
                        </Text>
                      </YStack>
                    </XStack>
                    <YStack marginTop="$2"></YStack>
                  </YStack>
                  <XStack>
                    <Button
                      height="$3"
                      width="$9"
                      backgroundColor={
                        getSeriesWatchedStatus() ? "$background" : "#8e4ec6"
                      }
                      borderWidth="$1"
                      borderColor="$purple9"
                      padding="$0"
                      onPress={setSeriesAsWatched}
                    >
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={23}
                        color={getSeriesWatchedStatus() ? "#8e4ec6" : "white"}
                      />
                    </Button>
                  </XStack>
                </JellyfinDetailSection>
              </YStack>
              <XStack height="$3" />
            </YStack>
          </YStack>
        </Animated.ScrollView>
      </Suspense>
    </>
  );
};

export default JellyfinSeriesDetail;
