import React from "react";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, Text, useTheme, XStack, H5, Button } from "tamagui";
import {
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
} from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import {
  SeriesResource,
  useGetApiV3Calendar,
  useGetApiV3Languageprofile,
  useGetApiV3Qualityprofile,
  useGetApiV3Series,
} from "../../api";
import { sonarrColors } from "../../colors";
import {
  setLoadingSpinner,
  useColorScheme,
  useLoadingSpinner,
} from "@astrysk/utils";
import { SectionTitle } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import {
  MILLISECONDS_TO_MINUTES_MULTIPLIER,
  checkEpisodeHasAired,
  getStartAndEndOfWeek,
  goToSonarrDetailScreen,
} from "../../utils";
import { useSonarrStore } from "../../store";
import { CalendarData, SonarrDetailScreenContext } from "../../types";
import { Actions } from "@astrysk/constants";
import { TabContext } from "@astrysk/types";

const getExpandableCalendarTheme = (darkMode: boolean): Theme => ({
  arrowColor: sonarrColors.accentColor,
  monthTextColor: darkMode ? "#d1d1d1" : undefined,
  dayTextColor: darkMode ? "#808080" : undefined,
  calendarBackground: darkMode ? "#151515" : "#f9f9f9",
  // agendaKnobColor: "red",
});

const getAgendaListTheme = (
  darkMode: boolean,
  colors: { [key: string]: string }
): Theme => ({
  backgroundColor: darkMode ? "#000000" : "#f2f2f2",
  // @ts-ignore
  color: colors.textColor,
  paddingTop: 10,
  paddingLeft: 13,
  paddingRight: 13,
  paddingBottom: 3,
});

const SonarrCalendar: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useSonarrStore.getState().baseURL as string;
  const token = useSonarrStore.getState().token as string;

  const colorScheme = useColorScheme();

  // const expandableCalendarTheme = React.useMemo(() => {
  //   return getExpandableCalendarTheme(colorScheme === "dark");
  // }, [colorScheme]);

  const backgroundColor = useTheme().background.get().val;
  const textColor = useTheme().gray11.get().val;

  const agendaListTheme = React.useMemo(() => {
    return getAgendaListTheme(colorScheme === "dark", {
      backgroundColor,
      textColor,
    });
  }, [colorScheme]);

  const weekRange = getStartAndEndOfWeek(new Date());
  // console.log(getStartAndEndOfWeek(new Date()));

  useGetApiV3Series(
    {},
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrCache: {
              ...state.sonarrCache,
              [baseURL]: {
                ...data.reduce(
                  (acc: { [key: number]: SeriesResource }, item) => {
                    if (item.id) acc[item.id as number] = item;
                    return acc;
                  },
                  {}
                ),
              },
            },
          }));
        },
      },
    }
  );

  const calendarQuery = useGetApiV3Calendar(
    {
      start: weekRange[0].toISOString(),
      end: weekRange[1].toISOString(),
      includeEpisodeImages: true,
      // unmonitored: true,
      // tags?: string;
    },
    {
      query: {
        onSuccess: (_data) => {
          setLoadingSpinner(SonarrCalendar.name, Actions.DONE);
        },
        staleTime: 60_000,
      },
    }
  );

  // const onVisibleMonthsChange = (months) => {
  //   console.log(months);
  //   if (months.length === 1) {
  //     const date = months[0];
  //     const startOfWeek = date.startOf("week");
  //     const endOfWeek = date.endOf("week");

  //     console.log("Start of week: ", startOfWeek.toString());
  //     console.log("End of week: ", endOfWeek.toString());
  //   }
  // };

  useGetApiV3Qualityprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrQualityProfiles: data,
        });
      },
    },
  });
  useGetApiV3Languageprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrLanguageProfiles: data,
        });
      },
    },
  });

  const refreshCalendar = () => {
    setLoadingSpinner(SonarrCalendar.name, Actions.LOADING);
    calendarQuery.refetch();
  };

  useLoadingSpinner(SonarrCalendar.name);

  return (
    <YStack flex={1}>
      <CalendarProvider
        date={new Date().toISOString().split("T")[0]}
        // theme={calendarTheme.current}
      >
        <SectionTitle subtle>{t("sonarr:upcomingEpisodes")}</SectionTitle>
        {/* <ExpandableCalendar */}
        {/*   key={colorScheme} */}
        {/*   firstDay={0} */}
        {/*   allowShadow={false} */}
        {/*   theme={expandableCalendarTheme} */}
        {/*   hideArrows */}
        {/*   disablePan */}
        {/*   hideKnob */}
        {/*   // onVisibleMonthsChange={onVisibleMonthsChange} */}
        {/* /> */}
        <AgendaList
          sections={
            calendarQuery.data
              ? calendarQuery.data.map((calendarData) => ({
                  // Attempt to convert to local datetime
                  title: new Date(
                    calendarData.airDateUtc as string
                  ).toISOString(),
                  data: [
                    {
                      seriesData:
                        useSonarrStore.getState().sonarrCache?.[baseURL]?.[
                          calendarData.seriesId as number
                        ],
                      title: calendarData.title,
                      seasonNumber: calendarData.seasonNumber,
                      episodeNumber: calendarData.episodeNumber,
                      hasFile: calendarData.hasFile,
                      timeUtc: calendarData.airDateUtc,
                      time: new Date(
                        calendarData.airDateUtc as string
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }),
                    } as CalendarData,
                  ],
                }))
              : []
          }
          renderItem={({ item }: { item: CalendarData }) => {
            return (
              <Button
                height="$11"
                padding="$0"
                marginHorizontal="$2"
                marginTop="$2"
                backgroundColor="$gray1"
                borderRadius="$5"
                onPress={() => {
                  goToSonarrDetailScreen({
                    router,
                    searchItemId: item.seriesData.id as number,
                    tabContext: TabContext.Home,
                    screenContext: SonarrDetailScreenContext.SearchItem,
                  });
                }}
              >
                <XStack flex={1}>
                  <XStack width="$8" height="$11" padding="$2">
                    <Image
                      style={{ flex: 1, overflow: "hidden", borderRadius: 6 }}
                      source={
                        {
                          uri: `${baseURL}/api/MediaCover/${item?.seriesData?.id}/poster.jpg?apikey=${token}`,
                        } as ImageSource
                      }
                      transition={200}
                      // recyclingKey={`${data.id}`}
                    />
                  </XStack>
                  <YStack flex={1} paddingHorizontal="$2" paddingVertical="$2">
                    <H5 color="$gray12">{item.seriesData?.title}</H5>
                    <Text marginTop="$2" color="$gray11">{`${t(
                      "sonarr:season"
                    )} ${item.seasonNumber} • ${t("sonarr:episode")} ${
                      item.episodeNumber
                    }`}</Text>
                    <Text marginTop="$1.5" color="$gray11">
                      {item.title}
                    </Text>
                    <Text
                      marginTop="$1.5"
                      color={
                        item.hasFile
                          ? "$green9"
                          : checkEpisodeHasAired(
                              item.timeUtc,
                              item.seriesData?.runtime ?? 1
                            )
                          ? "$red9"
                          : "$blue9"
                      }
                    >
                      {item.hasFile
                        ? t("sonarr:available")
                        : checkEpisodeHasAired(
                            item.timeUtc,
                            item.seriesData?.runtime ?? 1
                          )
                        ? t("sonarr:missing")
                        : t("sonarr:notAired")}
                    </Text>
                  </YStack>
                  <XStack marginHorizontal="$3" alignItems="center">
                    <Text color="$gray11">{item.time}</Text>
                  </XStack>
                </XStack>
              </Button>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refreshCalendar}
              tintColor={sonarrColors.accentColor}
            />
          }
          // For manual section header rendering
          // renderSectionHeader={(info) => {
          //   console.log(info);
          //   return <XStack height="$3" backgroundColor="red"></XStack>;
          // }}
          sectionStyle={agendaListTheme}
        />
      </CalendarProvider>
    </YStack>
  );
};

export default SonarrCalendar;
