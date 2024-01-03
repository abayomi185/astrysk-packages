import React from "react";
import { Appearance, ColorSchemeName } from "react-native";
import debounce from "lodash/debounce";
import { AppletColors } from "@astrysk/types";

// This hook is from https://github.com/facebook/react-native/issues/28525
export function useColorScheme(): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  );

  const initAppearanceListener = () => {
    const listener: Appearance.AppearanceListener = debounce(
      () => {
        setColorScheme(Appearance.getColorScheme());
      },
      250,
      { leading: false, trailing: true }
    );

    const changeListener = Appearance.addChangeListener(listener);
    return () => changeListener.remove();
  };

  React.useEffect(() => {
    initAppearanceListener();
  }, []);

  return colorScheme as NonNullable<ColorSchemeName>;
}

export const getIconColor = () => {
  return useColorScheme() === "dark" ? "#d9d9d9" : "#000000";
};

export const getColorSchemeBasedAppletColor = (
  appletColors: AppletColors,
  baseColorKey: keyof AppletColors
) => {
  const lightColorKey = `${baseColorKey}Light` as keyof AppletColors;
  const darkColorKey = `${baseColorKey}Dark` as keyof AppletColors;

  if (appletColors[lightColorKey] && appletColors[darkColorKey]) {
    return useColorScheme() === "dark"
      ? appletColors[darkColorKey]
      : appletColors[lightColorKey];
  }

  return appletColors[baseColorKey];
};
