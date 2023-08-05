import React from "react";
import { Button, GetProps, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

const SonarrSeriesActionPanelButton: React.FC<{
  children: React.ReactNode;
  style?: GetProps<typeof Button>;
  first?: boolean;
}> = ({ children, style, first }) => {
  return (
    <Button
      width="$5"
      marginLeft={first ? undefined : "$2"}
      padding="$0"
      // backgroundColor="$gray5"
      backgroundColor="$gray1"
      {...style}
    >
      {children}
    </Button>
  );
};

const SonarrSeriesActionPanel: React.FC<{
  // parentIndexNumber?: number;
  // indexNumber: number;
  // hasBeenWatched?: boolean;
  // setWatchedStatus: () => void;
  // playEpisode: () => void;
  // moreDetails: () => void;
}> = ({}) => {
  return (
    <XStack justifyContent="center">
      <XStack
        flex={1}
        height="$4"
        width="100%"
        marginTop="$5"
        justifyContent="center"
      >
        <SonarrSeriesActionPanelButton first>
          <Ionicons name="ios-bookmark" size={23} />
        </SonarrSeriesActionPanelButton>
        <SonarrSeriesActionPanelButton>
          <Ionicons name="brush" size={23} />
        </SonarrSeriesActionPanelButton>
        <SonarrSeriesActionPanelButton>
          <Ionicons name="ios-search" size={23} />
        </SonarrSeriesActionPanelButton>
        <SonarrSeriesActionPanelButton>
          <Ionicons name="person" size={23} />
        </SonarrSeriesActionPanelButton>
        <SonarrSeriesActionPanelButton>
          <Ionicons name="time" size={23} />
        </SonarrSeriesActionPanelButton>
        <SonarrSeriesActionPanelButton>
          <Ionicons name="trash-bin-sharp" size={23} />
        </SonarrSeriesActionPanelButton>
      </XStack>
    </XStack>
  );
};

export default SonarrSeriesActionPanel;
