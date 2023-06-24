import React from "react";
import { ScrollView } from "tamagui";
import { useNavigation } from "expo-router";
import { Applet } from "@astrysk/types";
import { AppletButton } from "../common/appletButton";
import { AppletVoteCard } from "../common/appletVoteCard";
import { resetLoadingComponent } from "../common/loadingIndicator";
import { useLandingPageHeader } from "./landingPageHeader";

const LandingPage: React.FC<{
  applets: { [key: string]: Applet };
  otherApplets: string[];
}> = ({ applets, otherApplets }) => {
  const navigation = useNavigation();

  React.useEffect(() => {
    resetLoadingComponent();
  }, []);

  useLandingPageHeader(navigation);

  // WARN: Optimise by using @Shopify/flash-list
  return (
    <ScrollView showsVerticalScrollIndicator={false} height="100%">
      {Object.keys(applets).map((applet, index) => (
        <AppletButton key={index} applet={applet} />
      ))}
      {/* Put divider here */}
      <AppletVoteCard otherApplets={otherApplets} />
    </ScrollView>
  );
};

export default LandingPage;
