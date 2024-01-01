import { AppletColors, ExtendedAppletColors } from "@astrysk/types";

export const hasDarkAndLightAppletPrimaryColors = (
  colors: AppletColors
): colors is ExtendedAppletColors => {
  return "primaryColorDark" in colors && "primaryColorDark" in colors;
};

export const hasDarkAndLightAppletAccentColors = (
  colors: AppletColors
): colors is ExtendedAppletColors => {
  return "accentColorDark" in colors && "accentColorLight" in colors;
};
