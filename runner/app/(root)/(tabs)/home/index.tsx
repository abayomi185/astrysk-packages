import React from "react";
import { SafeAreaView } from "react-native";
import { activeApplet } from "@applet";

export default (() => {
  const [_, appletInstance] = activeApplet;
  return (
    <SafeAreaView>
      {React.createElement(appletInstance.homeView, {})}
    </SafeAreaView>
  );
}) satisfies React.FC;
