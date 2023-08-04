import React from "react";
import { useTranslation } from "react-i18next";
import { XStack, Button, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

export const JellyfinEpisodeActionPanel: React.FC<{
  parentIndexNumber?: number;
  indexNumber: number;
  hasBeenWatched?: boolean;
  setWatchedStatus: () => void;
  playEpisode: () => void;
  moreDetails: () => void;
}> = ({
  parentIndexNumber,
  indexNumber,
  hasBeenWatched,
  setWatchedStatus,
  playEpisode,
  moreDetails,
}) => {
  const { t } = useTranslation();

  return (
    <XStack justifyContent="center">
      <XStack flex={1} alignItems="stretch" marginTop="$3" maxWidth="$32">
        <Button
          width="$5"
          backgroundColor={hasBeenWatched ? "$background" : "$purple9"}
          borderWidth="$1"
          borderColor="$purple9"
          padding="$0"
          onPress={() => {
            setWatchedStatus();
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={23}
            color={hasBeenWatched ? "#8e4ec6" : "white"}
          />
        </Button>
        <Button
          flex={1}
          theme="purple_active"
          padding="$0"
          marginHorizontal="$2"
          backgroundColor="$purple9Dark"
          onPress={() => {
            playEpisode();
          }}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text color="white" fontSize={20}>
            {parentIndexNumber && indexNumber
              ? `${t("jellyfin:s")}${parentIndexNumber} : ${t(
                  "jellyfin:e"
                )}${indexNumber}`
              : !parentIndexNumber && indexNumber
              ? `${t("jellyfin:ep")}. ${indexNumber}`
              : t("jellyfin:play")}
          </Text>
        </Button>
        <Button
          width="$5"
          backgroundColor="$purple9Dark"
          padding="$0"
          theme="purple_active"
          onPress={() => moreDetails()}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={20} color="white" />
        </Button>
        {/* <Button width="$5" backgroundColor="$red9" padding="$0"> */}
        {/*   <Ionicons name="heart" size={20} color="white" /> */}
        {/* </Button> */}
      </XStack>
    </XStack>
  );
};

export const JellyfinMovieActionPanel: React.FC<{
  hasBeenWatched?: boolean;
  setWatchedStatus?: () => void;
  playMovie: () => void;
  moreDetails: () => void;
}> = ({ hasBeenWatched, playMovie, moreDetails }) => {
  const { t } = useTranslation();

  return (
    <XStack justifyContent="center">
      <XStack flex={1} alignItems="stretch" marginTop="$3" maxWidth="$32">
        <Button
          width="$5"
          backgroundColor={hasBeenWatched ? "$purple9" : "$background"}
          borderWidth="$1"
          borderColor="$purple9"
          padding="$0"
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={23}
            color={hasBeenWatched ? "white" : "#8e4ec6"}
          />
        </Button>
        <Button
          flex={1}
          theme="purple_active"
          padding="$0"
          marginHorizontal="$2"
          onPress={playMovie}
          backgroundColor="$purple9Dark"
        >
          <Ionicons name="play" size={20} color="white" />
          <Text color="white" fontSize={20}>
            {t("jellyfin:play")}
          </Text>
        </Button>
        <Button
          width="$5"
          padding="$0"
          theme="purple_active"
          backgroundColor="$purple9Dark"
          onPress={() => moreDetails()}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={20} color="white" />
        </Button>
        {/* <Button width="$5" backgroundColor="$red9" padding="$0"> */}
        {/*   <Ionicons name="heart" size={20} color="white" /> */}
        {/* </Button> */}
      </XStack>
    </XStack>
  );
};
