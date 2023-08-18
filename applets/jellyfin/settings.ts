import { Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { Router, SettingsOptionProps } from "@astrysk/types";
import { Applets, Screens } from "@astrysk/constants";
import * as ISO639 from "iso-language-codes";

import {
  faUser,
  faServer,
  faDatabase,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useJellyfinStore } from "./store";
import i18next from "i18next";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
  JellyfinMediaItemSettingsProps,
  JellyfinMediaItemSettingsType,
  JellyfinSettingsKeys,
} from "./types";

export const JellyfinSettingsOptions = (
  router: Router
): (string | SettingsOptionProps)[] => [
  Applets.JELLYFIN,
  {
    key: JellyfinSettingsKeys.User,
    type: "label",
    icon: faUser,
    iconSize: 22,
    value: useJellyfinStore.getState().userDetails?.Name as string,
    firstItem: true,
  },
  {
    key: JellyfinSettingsKeys.Server,
    type: "action",
    icon: faServer,
    iconSize: 22,
    selectionHint: useJellyfinStore.getState().userDetails
      ?.ServerName as string,
    onPress: () => {
      router.push({
        pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
        params: {
          context: JellyfinDetailScreenContext.SettingsOption,
          itemId: JellyfinSettingsKeys.Server,
        } as JellyfinDetailScreenProps,
      });
    },
  },
  // WARN: Not currently used
  // {
  //   key: JellyfinSettingsKeys.PlayerOptions,
  //   type: "action",
  //   icon: faCirclePlay,
  //   iconSize: 22,
  //   onPress: () => {
  //     router.push({
  //       pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
  //       params: {
  //         context: JellyfinDetailScreenContext.SettingsOption,
  //         itemId: JellyfinSettingsKeys.PlayerOptions,
  //       } as JellyfinDetailScreenProps,
  //     });
  //   },
  // },
  {
    key: JellyfinSettingsKeys.DeleteCache,
    type: "action",
    icon: faDatabase,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("jellyfin:deleteCache");
      const alertMessage = i18next.t("jellyfin:deleteCacheMessage");
      const alertOkText = i18next.t("common:ok");
      const alertCancelText = i18next.t("common:cancel");

      Alert.alert(alertTitle, alertMessage, [
        {
          text: alertCancelText,
          style: "default",
        },
        {
          text: alertOkText,
          onPress: () => {
            Image.clearDiskCache();
            useJellyfinStore.setState({ mediaCache: {} });
          },
          style: "destructive",
        },
      ]);
    },
    // lastItem: true,
  },
  {
    key: JellyfinSettingsKeys.DeleteMediaSettings,
    type: "action",
    icon: faGear,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("jellyfin:deleteMediaSettings");
      const alertMessage = i18next.t("jellyfin:deleteMediaSettingsMessage");
      const alertOkText = i18next.t("common:ok");
      const alertCancelText = i18next.t("common:cancel");

      Alert.alert(alertTitle, alertMessage, [
        {
          text: alertCancelText,
          style: "default",
        },
        {
          text: alertOkText,
          onPress: () => {
            useJellyfinStore.setState({ mediaItemSettings: {} });
          },
          style: "destructive",
        },
      ]);
    },
    lastItem: true,
  },
];

const getLanguageSettingsOptions = (
  id: string,
  audioLanguages: boolean,
  subtitleLanguages: boolean,
  showBottomSheet: () => void
): SettingsOptionProps[] => {
  const navigation = useNavigation();

  const audioLanguageCode =
    useJellyfinStore.getState().mediaItemSettings?.[id]?.audio;
  const audioLanguage =
    audioLanguageCode && ISO639.by639_2B[audioLanguageCode]?.name;

  const subtitleLanguageCode =
    useJellyfinStore.getState().mediaItemSettings?.[id]?.subtitle;
  const subtitleLanguage =
    subtitleLanguageCode && ISO639.by639_2B[subtitleLanguageCode]?.name;

  const languageSettingsOptions = [
    ...(audioLanguages
      ? [
          {
            key: JellyfinSettingsKeys.AudioLanguage,
            type: "action",
            selectionHint: audioLanguage ?? audioLanguageCode,
            onPress: () => {
              navigation.setParams({
                settingsOptionId: id,
                settingsOptionType: JellyfinMediaItemSettingsType.Audio,
              } as any);
              showBottomSheet();
            },
          } as SettingsOptionProps,
        ]
      : []),
    ...(subtitleLanguages
      ? [
          {
            key: JellyfinSettingsKeys.SubtitleLanguage,
            type: "action",
            selectionHint: subtitleLanguage ?? subtitleLanguageCode,
            onPress: () => {
              navigation.setParams({
                settingsOptionId: id,
                settingsOptionType: JellyfinMediaItemSettingsType.Subtitle,
              } as any);
              showBottomSheet();
            },
          } as SettingsOptionProps,
        ]
      : []),
  ];

  if (languageSettingsOptions.length > 0)
    languageSettingsOptions[languageSettingsOptions.length - 1].lastItem = true;

  return languageSettingsOptions;
};

export const JellyfinMediaItemSettingsOptions = (
  itemId: string,
  audioLanguages: boolean,
  subtitleLanguages: boolean,
  showBottomSheet: () => void
): SettingsOptionProps[] =>
  getLanguageSettingsOptions(
    itemId,
    audioLanguages,
    subtitleLanguages,
    showBottomSheet
  );
