import React from "react";
import { AppState, SafeAreaView } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next";
import {
  Audio,
  Video,
  ResizeMode,
  InterruptionModeIOS,
  VideoFullscreenUpdateEvent,
  VideoFullscreenUpdate,
  AVPlaybackStatus,
  PitchCorrectionQuality,
} from "expo-av";
import * as ISO639 from "iso-language-codes";
import * as DeviceInfo from "expo-device";
import { getLocales } from "expo-localization";
// import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  BaseItemDtoUserData,
  MediaStreamType,
  PlaybackInfoResponse,
  useMarkPlayedItem,
  useOnPlaybackProgress,
  useOnPlaybackStart,
  useOnPlaybackStopped,
} from "../../api";
import { useJellyfinStore } from "../../store";
import { Button, XStack, YStack, Spinner, H3 } from "tamagui";
import { TICK_TO_MILLISECOND_MULTIPLIER } from "../../utils";
// import { Dimensions } from "react-native";

const JellyfinVideoPlayer: React.FC<{
  id: string;
  mediaTitle: string;
  playbackInfo: PlaybackInfoResponse;
  playbackUserData: BaseItemDtoUserData;
}> = ({ id, mediaTitle, playbackInfo, playbackUserData }) => {
  // const { t } = useTranslation();
  const navigation = useNavigation();

  const appState = React.useRef(AppState.currentState);

  // const insets = useSafeAreaInsets();
  // const { width, height } = Dimensions.get("window");
  // console.log("width:", width, "height:", height);
  // const getPlayerDimensions = () => {}

  const videoRef = React.useRef<Video>(null);

  const baseURL = useJellyfinStore.getState().baseURL;
  const token = useJellyfinStore.getState().token as string;
  const userId = useJellyfinStore.getState().userDetails?.Id as string;

  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [hasErrored, setHasErrored] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const [videoIsFullScreen, setVideoIsFullScreen] = React.useState(true);

  // useRef is the solution here and not state. State seemingly does not
  // live long enough such that it causes out of date values on dismiss
  const playbackPositionTicks = React.useRef<number>(
    playbackUserData?.PlaybackPositionTicks ?? 0
  );

  const markPlayedItem = useMarkPlayedItem();
  const playbackProgress = useOnPlaybackProgress();
  const playbackStart = useOnPlaybackStart();
  // const playbackStop = useOnPlaybackStopped();

  // console.log(JSON.stringify(playbackInfo, null, 4));

  const preferredAudioLanguage =
    useJellyfinStore.getState().mediaItemSettings?.[id]?.audio;
  // const playDefaultAudioTrack =
  //   useJellyfinStore.getState().userDetails?.Configuration
  //     ?.PlayDefaultAudioTrack;
  const audioLanguagePreference =
    useJellyfinStore.getState().userDetails?.Configuration
      ?.AudioLanguagePreference;

  const defaultVideoStreamLanguage =
    playbackInfo.MediaSources?.[0].MediaStreams?.find(
      (stream) => stream.Type === MediaStreamType.Video && stream.IsDefault
    )?.Language;

  // Use default audio track if user has configured it to do so
  const audioStreamIndex = preferredAudioLanguage
    ? playbackInfo.MediaSources?.[0].MediaStreams?.find(
        (stream) =>
          stream.Type === MediaStreamType.Audio &&
          stream.Language === preferredAudioLanguage
      )?.Index
    : defaultVideoStreamLanguage
    ? playbackInfo.MediaSources?.[0].MediaStreams?.find(
        (stream) => stream.Language === defaultVideoStreamLanguage
      )?.Index
    : audioLanguagePreference
    ? playbackInfo.MediaSources?.[0].MediaStreams?.find(
        (stream) => stream.Language === audioLanguagePreference
      )?.Index
    : playbackInfo.MediaSources?.[0].MediaStreams?.find(
        (stream) => stream.Type === MediaStreamType.Audio && stream.IsDefault
      )?.Index;

  const videoURL =
    `${baseURL}/Videos/${id}/master.m3u8?` +
    `playSessionId=${playbackInfo?.PlaySessionId}&` +
    `mediaSourceId=${playbackInfo?.MediaSources?.[0].Id}&` +
    `videoCodec=h264&` + // WARN: Make this configurable in future
    `videoBitRate=55000000&` + // Specify bitrate to seemingly make things work
    `audioCodec=aac&` +
    `maxAudioChannels=6&` +
    (audioStreamIndex !== undefined
      ? `audioStreamIndex=${audioStreamIndex}&`
      : "") +
    `subtitleMethod=Hls&` +
    `subtitleCodec=vtt&` +
    `requireAvc=true&` +
    `deviceId=${DeviceInfo.modelId}&` +
    `api_key=${token}&` +
    `static=false`;

  const getSubtitleLanguage = () => {
    const subtitleLanguage =
      useJellyfinStore.getState().mediaItemSettings?.[id]?.subtitle ??
      // No need to set subtitles automatically based on device language
      // ISO639.by639_1[getLocales()[0]?.languageCode]?.iso639_2B ??
      "";
    return subtitleLanguage;
  };

  const presentFullscreenPlayer = () => {
    videoRef.current?.presentFullscreenPlayer();
  };

  const dismissFullscreenPlayer = () => {
    videoRef.current?.dismissFullscreenPlayer();
  };

  const handleLoad = () => {
    setVideoLoaded(true);

    // NOTE: May consider adding this back in later
    // Set video to fullscreen
    // videoRef.current?.presentFullscreenPlayer();

    // Correct audio pitch
    videoRef.current?.setStatusAsync({
      shouldCorrectPitch: true,
      pitchCorrectionQuality: PitchCorrectionQuality.High,
    });

    // Tell server that playback has started
    playbackStart.mutate({
      userId: userId,
      itemId: id,
      params: {
        mediaSourceId: playbackInfo?.MediaSources?.[0].Id as string,
        playSessionId: playbackInfo?.PlaySessionId as string,
      },
    });
    // Seek to last position
    if (playbackUserData)
      if (playbackUserData.PlaybackPositionTicks !== 0)
        videoRef.current?.setPositionAsync(
          (playbackUserData?.PlaybackPositionTicks as number) /
            TICK_TO_MILLISECOND_MULTIPLIER
        );
    // Play Video
    videoRef.current?.playAsync();
  };

  const handleFullScreenUpdate = (event: VideoFullscreenUpdateEvent) => {
    // WARN: When video is put back from PIP, this is called - not good
    // if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
    //   navigation.goBack();
    // }
    if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
      videoRef.current?.playAsync();
    }
    if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
      if (videoIsFullScreen) {
        navigation.goBack();
      }
      setVideoIsFullScreen(false);
    }
    // WARN: Continue playing video if it was playing before - Use isPaused state
    if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
    }
  };

  const handlePlaybackStatus = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Playback error
      if (playbackStatus.error) {
        setHasErrored(true);
      }
    } else {
      // NOTE: Is playing
      if (playbackStatus.isPlaying) {
        const positionTicks = Math.floor(
          playbackStatus.positionMillis * TICK_TO_MILLISECOND_MULTIPLIER
        );
        if (
          positionTicks !== playbackUserData?.PlaybackPositionTicks &&
          playbackStatus.positionMillis !== 0
        ) {
          playbackProgress.mutate({
            userId: userId,
            itemId: id,
            params: {
              mediaSourceId: playbackInfo?.MediaSources?.[0].Id as string,
              positionTicks: positionTicks,
              playSessionId: playbackInfo?.PlaySessionId as string,
              isPaused: isPaused,
            },
          });
          playbackPositionTicks.current = positionTicks;
        }
      }
      // NOTE: Playback rate
      if (playbackStatus.rate !== 0) {
        // Playing
        isPaused && setIsPaused(false);
      } else {
        // Paused
        !isPaused && setIsPaused(true);
      }
      // NOTE: Did just finish
      if (playbackStatus.didJustFinish) {
        markPlayedItem.mutate({
          userId: userId,
          itemId: id,
        });
        dismissFullscreenPlayer();
        // navigation.goBack();
      }
    }
  };

  const handleDismiss = () => {
    // This causes playback status to be a few seconds behind
    // and is intended - it is a result of the progress interval
    playbackProgress.mutate({
      userId: userId,
      itemId: id,
      params: {
        mediaSourceId: playbackInfo?.MediaSources?.[0].Id as string,
        playSessionId: playbackInfo?.PlaySessionId as string,
        positionTicks: playbackPositionTicks.current,
        isPaused: true,
      },
    });
  };

  // WARN: Add player options to settings

  // Yare yare, Back to using Expo-av video
  React.useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
    });

    // NOTE: Part of logic for handling video (PiP) when app is in background
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (!videoIsFullScreen) presentFullscreenPlayer();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  // Alternative to using the `Video` dismissed event - doesn't work at the moment
  // See here: https://github.com/react-native-video/react-native-video/issues/3085#issuecomment-1557293391
  React.useEffect(() => {
    const screenDismissed = navigation.addListener("beforeRemove", () => {
      handleDismiss();
    });
    return screenDismissed;
  }, [navigation]);

  return (
    <YStack flex={1}>
      <Video
        ref={videoRef}
        source={{
          uri: videoURL,
        }}
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
        usePoster
        posterSource={{
          uri: `${baseURL}/Items/${id}/Images/Primary?quality=80`,
        }}
        posterStyle={{
          resizeMode: "contain",
        }}
        resizeMode={ResizeMode.CONTAIN}
        onLoad={() => handleLoad()}
        onPlaybackStatusUpdate={(playbackStatus) =>
          handlePlaybackStatus(playbackStatus)
        }
        progressUpdateIntervalMillis={1000}
        onFullscreenUpdate={(event) => handleFullScreenUpdate(event)}
        shouldCorrectPitch
      />
      {
        <YStack position="absolute" width="100%" height="100%">
          <SafeAreaView
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 12,
            }}
          >
            <YStack
              flex={1}
              paddingVertical="$3"
              justifyContent="space-between"
            >
              <XStack paddingHorizontal="$3">
                <Button
                  width="$5"
                  height="$5"
                  theme="purple_active"
                  backgroundColor="$purple7Dark"
                  padding="$0"
                  borderRadius="$7"
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="close" size={28} color="white" />
                </Button>
              </XStack>
              <YStack flex={1} alignItems="center" justifyContent="center">
                <YStack
                  height="90%"
                  width="80%"
                  onPress={() => presentFullscreenPlayer()}
                />
              </YStack>
              <YStack
                height="$6"
                marginBottom="$2"
                justifyContent="flex-end"
                paddingHorizontal="$3"
              >
                <H3 color="white" numberOfLines={2}>
                  {mediaTitle}
                </H3>
              </YStack>
            </YStack>
          </SafeAreaView>
          <SafeAreaView
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 11,
            }}
          >
            <YStack flex={1} justifyContent="center" alignItems="center">
              {(hasErrored || !videoLoaded) && <Spinner size="large" />}
            </YStack>
          </SafeAreaView>
        </YStack>
      }
    </YStack>
  );
};

export default JellyfinVideoPlayer;
