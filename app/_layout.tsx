import { Stack } from "expo-router";
import { SystemUIManager } from "expo-system-ui";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    SystemUIManager.setHideHomeBarIndicator(true);
  }, []);

  return <Stack />;
}
