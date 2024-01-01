import React from "react";
import { PixelRatio } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, XStack, Text, ColorTokens } from "tamagui";
import { X, ChevronDown, Dot } from "@tamagui/lucide-icons";
import { AppletColors } from "@astrysk/types";
import {
  hasDarkAndLightAppletPrimaryColors,
  useColorScheme,
} from "@astrysk/utils";

const textColor = (
  colorScheme: string,
  active: boolean,
  invertTextColor: boolean
) => {
  if (active && invertTextColor) {
    return colorScheme === "dark" ? "black" : "white";
  }
  return "$color";
};

export const FilterButton: React.FC<{
  id: string;
  handlePress: (id: string, isToggle?: boolean) => void;
  active: boolean;
  activeBackgroundColor: ColorTokens | string;
  appletColors?: AppletColors;
  isToggle?: boolean; // Dropdown or toggle button
}> = ({
  id,
  handlePress,
  active,
  activeBackgroundColor,
  appletColors,
  isToggle,
}) => {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();

  const { buttonActiveBackgroundColor, invertTextColor } = React.useMemo(() => {
    let invertTextColor = false;
    let buttonActiveBackgroundColor = activeBackgroundColor;

    if (appletColors) {
      if (hasDarkAndLightAppletPrimaryColors(appletColors)) {
        invertTextColor = true;

        buttonActiveBackgroundColor =
          (colorScheme === "dark"
            ? appletColors.primaryColorDark
            : appletColors.primaryColorLight) ?? activeBackgroundColor;
      }
    }
    return { buttonActiveBackgroundColor, invertTextColor };
  }, [colorScheme]);

  return (
    <XStack flex={1} width="auto" marginLeft="$2" alignItems="center">
      <Button
        height="$2.5"
        borderRadius="$8"
        paddingHorizontal="$3"
        onPress={() => handlePress(id, isToggle)}
        backgroundColor={active ? buttonActiveBackgroundColor : "$gray5"}
      >
        <XStack alignItems="center" justifyContent="space-between">
          <Text
            color={textColor(colorScheme, active, invertTextColor)}
            numberOfLines={1}
            opacity={0.8}
          >
            {t(id)}
          </Text>
          {isToggle ? (
            <Dot
              opacity={0.8}
              color={textColor(colorScheme, active, invertTextColor)}
              style={{
                marginRight: -5,
              }}
            />
          ) : (
            <ChevronDown
              size={18}
              opacity={0.8}
              color={textColor(colorScheme, active, invertTextColor)}
              style={{
                marginLeft: 3,
                marginRight: -2,
              }}
            />
          )}
        </XStack>
      </Button>
    </XStack>
  );
};

export const CancelFilterButton: React.FC<{
  active: boolean;
  activeBackgroundColor: ColorTokens | string;
  appletColors?: AppletColors;
  clearFilter: () => void;
}> = ({ active, clearFilter, activeBackgroundColor, appletColors }) => {
  const colorScheme = useColorScheme();

  const { buttonActiveBackgroundColor, invertTextColor } = React.useMemo(() => {
    let invertTextColor = false;
    let buttonActiveBackgroundColor = activeBackgroundColor;

    if (appletColors) {
      if (hasDarkAndLightAppletPrimaryColors(appletColors)) {
        invertTextColor = true;

        buttonActiveBackgroundColor =
          (colorScheme === "dark"
            ? appletColors.primaryColorDark
            : appletColors.primaryColorLight) ?? activeBackgroundColor;
      }
    }
    return { buttonActiveBackgroundColor, invertTextColor };
  }, [colorScheme]);

  return (
    <XStack flex={1} width="$3" marginLeft="$3" alignItems="center">
      <Button
        flex={1}
        height="$2.5"
        borderRadius="$8"
        paddingHorizontal="$3"
        backgroundColor={!active ? buttonActiveBackgroundColor : "$gray5"}
        onPress={() => clearFilter()}
      >
        <X
          size={18}
          opacity={0.8}
          color={textColor(colorScheme, !active, invertTextColor)}
        />
      </Button>
    </XStack>
  );
};

export const ClearFilterButton: React.FC<{
  clearFilter: () => void;
}> = ({ clearFilter }) => {
  const { t } = useTranslation();

  return (
    <Button
      flex={1}
      marginBottom="$3"
      backgroundColor="$gray5"
      onPress={clearFilter}
    >
      <XStack alignItems="center">
        <Text>{t("common:clearFilter")}</Text>
        <XStack marginLeft="$1">
          <X size={20 * PixelRatio.getFontScale()} opacity={0.8} color="red" />
        </XStack>
      </XStack>
    </Button>
  );
};
