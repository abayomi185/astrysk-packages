process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      // [
      //   "module-resolver",
      //   {
      //     alias: {
      //       "@applets": "../applets",
      //       "@styles": "../styles",
      //       "@components": "../components",
      //       "@utils": "../utils",
      //     },
      //   },
      // ],
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === "development",
        },
      ],
      [
        "transform-inline-environment-variables",
        {
          include: ["TAMAGUI_TARGET"],
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
