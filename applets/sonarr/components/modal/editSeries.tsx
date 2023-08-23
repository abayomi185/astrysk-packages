import React from "react";
import { useNavigation } from "expo-router";
import { Alert, AlertButton } from "react-native";
import { Toasts, toast } from "@backpackapp-io/react-native-toast";
import {
  LanguageProfileResource,
  QualityProfileResource,
  SeriesResource,
  useGetApiV3SeriesLookup,
  usePostApiV3Series,
  usePutApiV3SeriesId,
} from "../../api";
import { useSonarrStore } from "../../store";
import { TFunction } from "i18next";
import { SettingsOptionProps } from "@astrysk/types";
import { SonarrDetailScreenContext, ToastModalProviderKey } from "../../types";
import { Button, XStack, YStack, Text, Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { SectionTitle, SettingsOption } from "@astrysk/components";
import { Plus, Pencil } from "@tamagui/lucide-icons";
import { TOAST_TOP_OFFSET } from "@astrysk/utils";

const getSonarrEditDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource,
  qualityProfiles: QualityProfileResource[],
  rootFolders: string[],
  setState: (value: Partial<SeriesResource>) => void
): SettingsOptionProps[] => {
  return [
    {
      key: "monitored",
      name: t("sonarr:monitoring") as string,
      type: "toggle",
      setState: setState,
      initialToggleState: seriesData?.monitored as boolean,
      firstItem: true,
    },
    {
      key: "seasonFolder",
      name: t("sonarr:seasonFolders") as string,
      type: "toggle",
      setState: setState,
      initialToggleState: seriesData?.seasonFolder as boolean,
    },
    {
      key: "sonarr:seriesType",
      type: "action",
      selectionHint: t(`sonarr:${seriesData?.seriesType}`) as string,
      onPress: () => {
        const selectSeriesType = (type: string) => {
          setState({
            seriesType: type as SeriesResource["seriesType"],
          });
        };
        Alert.alert(
          t("sonarr:seriesType"),
          t("sonarr:chooseTheSeriesType") as string,
          [
            {
              text: t("sonarr:anime") as string,
              style: "default",
              onPress: () => {
                selectSeriesType("anime");
              },
            },
            {
              text: t("sonarr:daily") as string,
              style: "default",
              onPress: () => {
                selectSeriesType("daily");
              },
            },
            {
              text: t("sonarr:standard") as string,
              style: "default",
              onPress: () => {
                selectSeriesType("standard");
              },
            },
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
          ]
        );
      },
    },
    {
      key: "common:quality",
      type: "action",
      selectionHint:
        (useSonarrStore
          .getState()
          ?.sonarrQualityProfiles?.find(
            (profile) => profile.id === seriesData?.qualityProfileId
          )?.name as string) ?? (qualityProfiles[0]?.name as string),
      onLoad: () => {
        setState({
          qualityProfileId: qualityProfiles[0]?.id as number,
        });
      },
      onPress: () => {
        const selectQuality = (id: number) => {
          setState({
            qualityProfileId: id,
          });
        };
        const getAlertButtons = () => {
          return (
            qualityProfiles.map(
              (profile) =>
                ({
                  text: profile.name as string,
                  style: "default",
                  onPress: () => {
                    selectQuality(profile.id as number);
                  },
                } as AlertButton)
            ) ?? []
          );
        };
        Alert.alert(
          t("sonarr:qualityProfile"),
          t("sonarr:chooseTheQualityProfile") as string,
          [
            ...getAlertButtons(),
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
          ]
        );
      },
    },
    {
      key: "common:path",
      type: "action",
      selectionHint: (seriesData?.path as string) ?? t("common:choosePath"),
      onPress: () => {
        const getPathOptions = () => {
          return rootFolders.map(
            (folder) =>
              ({
                text: `${folder}/${seriesData?.title}`,
                style: "default",
                onPress: () => {
                  setState({
                    path: `${folder}/${seriesData?.title}`,
                  });
                },
              } as AlertButton)
          );
        };
        Alert.prompt(
          t("sonarr:seriesPath"),
          undefined,
          [
            ...getPathOptions(),
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
            {
              text: t("common:ok") as string,
              onPress: (value?: string) => {
                if (value && value !== "") {
                  setState({
                    path: value,
                  });
                }
              },
              style: "default",
            },
          ],
          "plain-text",
          (seriesData?.path as string) ??
            `${rootFolders[0]}/${seriesData?.title}`
        );
      },
      lastItem: true,
    },
  ];
};

const SonarrEditSeries: React.FC<{
  data: SeriesResource;
  tvdbId: number;
  context: SonarrDetailScreenContext;
}> = ({ data, tvdbId, context }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const newSeriesData = useGetApiV3SeriesLookup(
    {
      term: `tvdb:${tvdbId}`,
    },
    {
      query: {
        select: (data: any) => data[0] as SeriesResource,
        onSuccess: (data) => {
          setDataState({ ...data, seasonFolder: true });
        },
        enabled: !!tvdbId,
      },
    }
  );

  const addSeries = usePostApiV3Series({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:seriesAdded"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        navigation.goBack();
      },
      onError: (error) => {
        toast.error(t("sonarr:error:addingSeriesFailed"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
    },
  });
  const updateSeries = usePutApiV3SeriesId({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:seriesUpdated"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        navigation.goBack();
      },
      onError: (error) => {
        toast.error(t("sonarr:error:seriesUpdateFailed"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
    },
  });
  const saveSeries = () => {
    if (!dataState.path) {
      Alert.alert(t("common:pleaseChooseAPath"));
      return;
    }
    if (context === SonarrDetailScreenContext.AddSeries) {
      addSeries.mutate({
        data: {
          ...dataState,
          // Sonarr API requires language profile id to be set
          languageProfileId: languageProfiles[0]?.id as number,
        },
      });
    }
    if (context === SonarrDetailScreenContext.EditSeries) {
      updateSeries.mutate({
        id: (data.id as number).toString(),
        data: dataState,
      });
    }
  };

  const qualityProfiles = useSonarrStore.getState()
    .sonarrQualityProfiles as QualityProfileResource[];
  const languageProfiles = useSonarrStore.getState()
    .sonarrLanguageProfiles as LanguageProfileResource[];
  const rootFolders = useSonarrStore.getState()
    .sonarrRootFolderCache as string[];

  const [dataState, setDataState] = React.useState<SeriesResource>(data);
  const setStateHelper = (value: Partial<SeriesResource>) => {
    setDataState({ ...dataState, ...value });
  };

  const getEditSeriesOptions = React.useCallback(() => {
    return getSonarrEditDetailOptions(
      t,
      dataState,
      qualityProfiles,
      rootFolders,
      setStateHelper
    );
  }, [dataState]);

  return (
    <YStack height="100%" width="100%">
      <XStack flex={1}>
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: "13",
            paddingTop: "10",
          }}
          data={getEditSeriesOptions()}
          renderItem={({ item }) => (
            <SettingsOption
              t={t}
              item={item}
              style={{
                overflow: "hidden",
              }}
            />
          )}
          ListHeaderComponent={
            <XStack flex={1}>
              {context === SonarrDetailScreenContext.AddSeries && (
                <XStack
                  flex={1}
                  height="$4"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SectionTitle>{dataState?.title}</SectionTitle>
                  {newSeriesData.status === "loading" && (
                    <Spinner marginRight="$3" />
                  )}
                </XStack>
              )}
            </XStack>
          }
          ListFooterComponent={() => (
            <Button
              flex={1}
              marginTop="$3"
              backgroundColor="$blue7"
              onPress={saveSeries}
            >
              <XStack flex={1} alignItems="center" justifyContent="center">
                {context === SonarrDetailScreenContext.AddSeries ? (
                  <>
                    <Plus size="$1" />
                    <Text color="$color" marginLeft="$1">
                      {t("common:save")}
                    </Text>
                  </>
                ) : (
                  <>
                    <Pencil size="$1" />
                    <Text color="$color" marginLeft="$1.5">
                      {t("common:update")}
                    </Text>
                  </>
                )}
              </XStack>
            </Button>
          )}
          estimatedItemSize={43}
        />
      </XStack>
      <Toasts
        extraInsets={{
          top: TOAST_TOP_OFFSET,
        }}
      />
    </YStack>
  );
};

export default SonarrEditSeries;
