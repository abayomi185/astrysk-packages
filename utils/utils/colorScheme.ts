import React from "react";
import { Appearance, ColorSchemeName } from "react-native";
import debounce from "lodash/debounce";

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
      100,
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
