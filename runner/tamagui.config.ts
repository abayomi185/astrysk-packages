import config from "@astrysk/styles";

export type ThemeConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends ThemeConfig {}
}

export default config;
