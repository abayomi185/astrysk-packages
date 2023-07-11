import React from "react";
import { SafeAreaView } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next";
// import Video, {
//   OnProgressData,
//   OnPlaybackRateData,
//   OnSeekData,
//   LoadError,
// } from "react-native-video";
import {
  Audio,
  Video,
  ResizeMode,
  InterruptionModeIOS,
  VideoFullscreenUpdateEvent,
  VideoFullscreenUpdate,
} from "expo-av";
import * as ISO639 from "iso-language-codes";
import * as DeviceInfo from "expo-device";
import { getLocales } from "expo-localization";
// import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "expo-router";
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

  // useRef is the solution here and not state. State seemingly does not
  // live long enough such that it causes out of date values on dismiss
  const playbackPositionTicks = React.useRef<number>(
    playbackUserData?.PlaybackPositionTicks ?? 0
  );

  const markPlayedItem = useMarkPlayedItem();
  const playbackProgress = useOnPlaybackProgress();
  const playbackStart = useOnPlaybackStart();
  // const playbackStop = useOnPlaybackStopped();

  console.log(JSON.stringify(playbackInfo, null, 4));

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

  const handleLoad = () => {
    setVideoLoaded(true);
    // Set video to fullscreen
    videoRef.current?.presentFullscreenPlayer();
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
    // WARN: Continue playing video if it was playing before - Use isPaused state
    if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
      if (!isPaused) videoRef.current?.playAsync();
    }
  };

  // const handleProgress = (progressData: OnProgressData | OnSeekData) => {
  //   const positionTicks = Math.floor(
  //     progressData.currentTime * TICK_TO_SECOND_MULTIPLIER
  //   );

  //   if (
  //     progressData.currentTime !== playbackUserData?.PlaybackPositionTicks &&
  //     progressData.currentTime !== 0
  //   ) {
  //     playbackProgress.mutate({
  //       userId: userId,
  //       itemId: id,
  //       params: {
  //         mediaSourceId: playbackInfo?.MediaSources?.[0].Id as string,
  //         positionTicks: positionTicks,
  //         playSessionId: playbackInfo?.PlaySessionId as string,
  //         isPaused: isPaused,
  //       },
  //     });
  //     playbackPositionTicks.current = positionTicks;
  //   }
  // };

  // const handlePlaybackRateChange = (playbackRate: OnPlaybackRateData) => {
  //   if (playbackRate.playbackRate === 0) {
  //     setIsPaused(true);
  //     return;
  //   }
  //   setIsPaused(false);
  // };

  // const handleEnd = () => {
  //   markPlayedItem.mutate({
  //     userId: userId,
  //     itemId: id,
  //   });
  //   navigation.goBack();
  // };

  // const handleDismiss = () => {
  //   // This causes playback status to be a few seconds behind
  //   // and is intended - it is a result of the progress interval
  //   playbackProgress.mutate({
  //     userId: userId,
  //     itemId: id,
  //     params: {
  //       mediaSourceId: playbackInfo?.MediaSources?.[0].Id as string,
  //       playSessionId: playbackInfo?.PlaySessionId as string,
  //       positionTicks: playbackPositionTicks.current,
  //       isPaused: true,
  //     },
  //   });
  // };

  // const handleError = (error: LoadError) => {
  //   setHasErrored(true);
  // };

  // WARN: Add player options to settings

  // Alternative to using the `Video` dismissed event - doesn't work at the moment
  // See here: https://github.com/react-native-video/react-native-video/issues/3085#issuecomment-1557293391
  // React.useEffect(() => {
  //   const screenDismissed = navigation.addListener("beforeRemove", () => {
  //     handleDismiss();
  //   });
  //   return screenDismissed;
  // }, [navigation]);

  // WARN: Yare yare, Back to using Expo-av video
  React.useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
    });
    // videoRef.current?.presentFullscreenPlayer();
  }, []);

  return (
    <YStack flex={1}>
      {/* <Video */}
      {/*   ref={videoRef} */}
      {/*   source={{ */}
      {/*     uri: videoURL, */}
      {/*     type: "m3u8", */}
      {/*   }} */}
      {/*   style={{ flex: 1, backgroundColor: "black" }} */}
      {/*   ignoreSilentSwitch="ignore" */}
      {/*   poster={`${baseURL}/Items/${id}/Images/Backdrop?quality=80`} */}
      {/*   resizeMode="contain" */}
      {/*   selectedTextTrack={{ */}
      {/*     type: "language", */}
      {/*     value: getSubtitleLanguage(), */}
      {/*   }} */}
      {/*   onLoad={() => handleLoad()} */}
      {/*   onProgress={(progressData) => handleProgress(progressData)} */}
      {/*   onSeek={(seekData) => handleProgress(seekData)} */}
      {/*   progressUpdateInterval={2000} */}
      {/*   onPlaybackRateChange={(playbackRate) => */}
      {/*     handlePlaybackRateChange(playbackRate) */}
      {/*   } */}
      {/*   onEnd={() => handleEnd()} */}
      {/*   onError={(error) => handleError(error)} */}
      {/*   // onFullscreenPlayerWillDismiss={() => handleDismiss()} */}
      {/*   fullscreenOrientation="landscape" */}
      {/*   fullscreenAutorotate={false} */}
      {/*   playWhenInactive */}
      {/*   pictureInPicture */}
      {/*   playInBackground */}
      {/*   fullscreen */}
      {/*   controls // Native controls */}
      {/* /> */}
      <Video
        ref={videoRef}
        source={{
          uri: videoURL,
        }}
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
        posterSource={{
          uri: `${baseURL}/Items/${id}/Images/Primary?quality=80`,
        }}
        posterStyle={{
          resizeMode: "contain",
        }}
        resizeMode={ResizeMode.CONTAIN}
        onLoad={() => handleLoad()}
        onFullscreenUpdate={(event) => handleFullScreenUpdate(event)}
        // useNativeControls // Always shown in fullscreen
      />
      {/* {(hasErrored || !videoLoaded) && ( */}
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
              <YStack
                flex={1}
                marginVertical="$18"
                onPress={() => presentFullscreenPlayer()}
              />
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
