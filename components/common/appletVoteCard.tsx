import React from "react";
import { Alert } from "react-native";
import {
  styled,
  Card,
  Button,
  H2,
  Paragraph,
  Text,
  YStack,
  XStack,
  YStackProps,
  XStackProps,
} from "tamagui";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import * as Assets from "@astrysk/assets";
import { Applets } from "@astrysk/constants";
import { useAppStateStore } from "@astrysk/stores";

const appletMessage: { [applet: string]: string } = {
  [Applets.SONARR]: "TV collection manager",
  [Applets.RADARR]: "Movie collection manager",
  [Applets.PLEX]: "Stream Movies and Shows",
};

const getAppletLogo = (applet: string) => {
  switch (applet) {
    case Applets.JELLYFIN:
      return Assets.JellyfinAssets.Logo;
    case Applets.SONARR:
      return Assets.SonarrAssets.Logo;
    case Applets.RADARR:
      return Assets.RadarrAssets.LogoDark;
    case Applets.LIDARR:
      return Assets.LidarrAssets.Logo;
    case Applets.PLEX:
      return Assets.PlexAssets.Logo;
    case Applets.PROXMOX:
      return Assets.ProxmoxAssets.Logo;
    case Applets.DOCKER:
      return Assets.DockerAssets.Logo;
    case Applets.PHOTOPRISM:
      return Assets.PhotoprismAssets.Logo;
    case Applets.ADGUARD_HOME:
      return Assets.AdguardHomeAssets.Logo;
    case Applets.FIREFLY_III:
      return Assets.FireflyIIIAssets.Logo;
    default:
      return Assets.RadarrAssets.LogoDark;
  }
};

interface AppletVoteCardItemProps extends XStackProps {
  applet: string;
}
const AppletVoteCardItem = ({ applet }: AppletVoteCardItemProps) => {
  const { t } = useTranslation();

  const AppletButtonLogo = getAppletLogo(applet as string);

  const voteStatus = useAppStateStore((state) => state.votedApplets);

  const discordVoteAlert = () => {
    Alert.alert(
      "Make Your Vote Count!",
      "The vote button does nothing yet. Join our Discord and vote there!"
    );
  };

  return (
    <YStack animation="delay" pressStyle={{ scale: 0.97 }}>
      <XStack marginTop="$5">
        <XStack width="$5" height="$5" marginRight="$4">
          <AppletButtonLogo
            width="100%"
            height="100%"
            // preserveAspectRatio="xMidYMid meet"
          />
        </XStack>
        <YStack flex={1}>
          <Text color="$color" fontSize={25} fontWeight="300">
            {applet}
          </Text>
          <Text color="$color">{appletMessage[applet]}</Text>
        </YStack>
        <Button
          theme="blue_alt1"
          width="$6"
          padding="$0"
          borderRadius="$8"
          color="$blue10"
          alignItems="center"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            useAppStateStore.setState({
              votedApplets: { ...voteStatus, [applet]: !voteStatus?.[applet] },
            });
            discordVoteAlert();
          }}
        >
          {voteStatus?.[applet] ? (
            <Ionicons name="checkmark-sharp" size={20} color="green" />
          ) : (
            t("common:vote")
          )}
        </Button>
      </XStack>
      <XStack
        height={1}
        backgroundColor="$gray8"
        marginLeft="$10"
        marginTop="$2"
      />
    </YStack>
  );
};

export const AppletVoteCard: React.FC<{ otherApplets: string[] }> = ({
  otherApplets,
}) => {
  const { t } = useTranslation();
  return (
    <SCAppletVoteCard>
      <YStack marginTop="$4" marginLeft="$4" marginBottom="$1">
        <Paragraph color="$color">{t("common:makeYourVote")}</Paragraph>
        <H2>{t("common:moreApplets")}</H2>
      </YStack>
      <YStack marginHorizontal="$5" marginBottom="$5">
        {otherApplets.map((applet, index) => (
          <AppletVoteCardItem key={index} applet={applet} />
        ))}
      </YStack>
    </SCAppletVoteCard>
  );
};

const SCAppletVoteCard = styled(YStack, {
  minHeight: "$16",
  marginTop: "$3",
  marginHorizontal: "$3",
  marginBottom: "$3",
  backgroundColor: "$gray1",
  borderRadius: "$8",
  borderWidth: "$0",
  elevation: "$2",
  // padding: "$0",
  // overflow: "hidden",
  // pressStyle: { scale: 0.97 },
});
