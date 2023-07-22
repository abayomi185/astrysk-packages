import React from "react";
import { SafeAreaView } from "react-native";
import { activeApplet } from "@applet";

export default (() => {
  const [_, appletInstance] = activeApplet;
  return (
    <SafeAreaView>
      {React.createElement(appletInstance.searchView, {})}
    </SafeAreaView>
  );
}) satisfies React.FC;
