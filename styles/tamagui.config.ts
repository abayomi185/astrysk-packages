import { createTamagui, createTokens } from "tamagui";

import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";

import { themes, color, radius, zIndex, space, size } from "@tamagui/themes";
// import { themes, tokens } from "@tamagui/theme-base";

import { createAnimations } from "@tamagui/animations-moti";
import { Easing } from "react-native-reanimated";

const animations = createAnimations({
  fast: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 1,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 10,
    mass: 1.2,
    stiffness: 0,
  },
  delay: {
    type: "timing",
    duration: 150,
    easing: Easing.inOut(Easing.poly(5)),
  },
});

const customTokenMerge = {
  ...size,
  "$1.25": 22,
  "$1.75": 26,
  "$3.25": 38,
  "$6.5": 69,
  "$7.5": 79,
  "$11.5": 134,
  "$12.5": 154,
  "$14.5": 194,
  "$18.5": 254,
  $21: 304,
  $22: 324,
  $23: 344,
  $24: 364,
  $25: 384,
  $26: 404,
  $27: 424,
  $28: 444,
  $29: 464,
  $30: 484,
  $31: 504,
  $32: 524,
  $33: 544,
  $34: 564,
  $35: 584,
  $36: 604,
  $37: 624,
  $38: 644,
  $39: 664,
  $40: 684,
  $41: 704,
  $42: 724,
  $43: 744,
  $44: 764,
  $45: 784,
  $46: 804,
  $47: 824,
  $48: 844,
  $49: 864,
  $50: 884,
};

export const customTokens = createTokens({
  color: color,
  radius: radius,
  zIndex: zIndex,
  space: space,
  size: customTokenMerge,
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
  animations,

  defaultTheme: "dark",

  shouldAddPrefersColorThemes: false,

  themeClassNameOnRoot: false,

  shorthands,

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  themes,

  // tokens,
  tokens: customTokens,

  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

export type ThemeConfig = typeof config;
declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends ThemeConfig {}
}
export default config;
