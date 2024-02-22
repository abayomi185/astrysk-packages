import React, { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";
import {
  JellyfinDetailScreenProps,
  JellyfinDetailScreenContext,
} from "../types";

import { BaseItemDtoUserData, useGetItem, useGetPlaybackInfo } from "../api";
import { useJellyfinStore } from "../store";
import JellyfinVideoPlayer from "../components/video/videoPlayer";

const JellyfinFullScreenModal = () => {
  const userId = useJellyfinStore.getState().userDetails?.Id as string;

  // WARN: Set this up later to support multiple types of media

  const params = useLocalSearchParams() as JellyfinDetailScreenProps;

  const playbackInfo = useGetPlaybackInfo(params.itemId as string, {
    userId: userId,
  });

  const playbackUserData = useGetItem(userId, params.itemId as string).data
    ?.UserData as BaseItemDtoUserData;

  // SERIES
  if (params.context === JellyfinDetailScreenContext.SeriesDetail) {
    const episodeId = params?.itemId;
    const episodeName = params?.itemName;

    return (
      <YStack flex={1} backgroundColor="black">
        <Suspense>
          {playbackInfo.isSuccess && (
            <JellyfinVideoPlayer
              id={episodeId as string}
              mediaTitle={episodeName as string}
              playbackInfo={playbackInfo.data}
              playbackUserData={playbackUserData}
            />
          )}
        </Suspense>
      </YStack>
    );
  }

  // MOVIE
  if (params.context === JellyfinDetailScreenContext.MovieDetail) {
    const movieId = params?.itemId;
    const movieName = params?.itemName;

    return (
      <Suspense>
        {playbackInfo.isSuccess && (
          <JellyfinVideoPlayer
            id={movieId as string}
            mediaTitle={movieName as string}
            playbackInfo={playbackInfo.data}
            playbackUserData={playbackUserData}
          />
        )}
      </Suspense>
    );
  }

  return null;
};

export default JellyfinFullScreenModal;
