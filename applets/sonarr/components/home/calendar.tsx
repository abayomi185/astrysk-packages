import React from "react";
import { PixelRatio } from "react-native";
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
  useGetApiV3Rootfolder,
  useGetApiV3Series,
} from "../../api";
import { sonarrColors } from "../../colors";
import {
  getStartAndEndOfWeek,
  onItemLayout,
  setLoadingSpinner,
  useColorScheme,
  useLoadingSpinner,
} from "@astrysk/utils";
import { EmptyList, SectionTitle } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { checkEpisodeHasAired, goToSonarrDetailScreen } from "../../utils";
import { useSonarrStore } from "../../store";
import {
  CalendarData,
  SonarrAgendaList,
  SonarrDetailScreenContext,
} from "../../types";
import { Actions } from "@astrysk/constants";
import { TabContext } from "@astrysk/types";

const getAgendaListTheme = (
  darkMode: boolean,
  colors: { [key: string]: string },
  fontScale: number
): Theme => ({
  backgroundColor: darkMode ? "#000000" : "#f2f2f2",
  // @ts-ignore
  color: colors.textColor,
  fontSize: 15 * fontScale,
  paddingTop: 10,
  // weekVerticalMargin: 10,
  paddingLeft: 18,
  paddingRight: 18,
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

  const backgroundColor = useTheme().background.get();
  const textColor = useTheme().gray11.get();

  const fontScale = PixelRatio.getFontScale();

  const agendaListTheme = React.useMemo(() => {
    return getAgendaListTheme(
      colorScheme === "dark",
      {
        backgroundColor,
        textColor,
      },
      fontScale
    );
  }, [colorScheme, fontScale]);

  const weekRange = getStartAndEndOfWeek(new Date());

  useGetApiV3Series(
    {},
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrSeriesCache: {
              ...state.sonarrSeriesCache,
              ...data.reduce((acc: { [key: number]: SeriesResource }, item) => {
                if (item.id) acc[item.id as number] = item;
                return acc;
              }, {}),
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
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrQualityProfiles: data,
        });
      },
    },
  });
  useGetApiV3Languageprofile({
    query: {
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrLanguageProfiles: data,
        });
      },
    },
  });
  useGetApiV3Rootfolder({
    query: {
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrRootFolderCache: data.map((item) => item.path as string),
        });
      },
    },
  });

  const refetchCalendar = () => {
    setLoadingSpinner(SonarrCalendar.name, Actions.LOADING);
    calendarQuery.refetch();
  };

  const groupBy = (
    array: SonarrAgendaList[],
    key: keyof SonarrAgendaList
  ): { [key: string]: SonarrAgendaList[] } => {
    // Reduce the array to a map of keys and arrays of items
    // The key is the key of the item (title)
    return array.reduce(
      (
        result: { [key: string]: SonarrAgendaList[] },
        currentValue: SonarrAgendaList
      ) => {
        // Uses the key (title) from SonarrAgendaList to create a key in the result object
        // It gets the value of the key (title) on the current item (currentValue)
        // If an array already exists for that key, it uses that array, otherwise it creates a new one
        // It then pushes the current item to that array and returns the result
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      },
      {}
    );
  };

  useLoadingSpinner(SonarrCalendar.name);

  return (
    <YStack flex={1}>
      <CalendarProvider
        date={new Date().toISOString().split("T")[0]}
        // theme={calendarTheme.current}
      >
        <XStack paddingHorizontal="$1.5">
          <SectionTitle subtle>{t("sonarr:upcomingEpisodes")}</SectionTitle>
        </XStack>
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
        <XStack flexGrow={1}>
          <AgendaList
            sections={
              calendarQuery.data
                ? // Object.values are the values of the object only
                  Object.values(
                    groupBy(
                      calendarQuery.data.map((calendarData) => {
                        return {
                          // Attempt to convert to local datetime
                          title: new Date(calendarData.airDateUtc as string)
                            .toISOString()
                            .split("T")[0],
                          data: [
                            {
                              seriesData:
                                useSonarrStore.getState().sonarrSeriesCache?.[
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
                        } as SonarrAgendaList;
                      }),
                      "title" // Group by title
                    )
                  ).map((group: SonarrAgendaList[]) => ({
                    title: group[0].title,
                    data: group.map((item: SonarrAgendaList) => item.data[0]),
                  }))
                : []
            }
            renderItem={({ item }: { item: CalendarData }) => {
              return (
                <Button
                  height="auto"
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
                        style={{
                          flex: 1,
                          overflow: "hidden",
                          borderRadius: 6,
                        }}
                        source={
                          {
                            uri: `${baseURL}/api/MediaCover/${item?.seriesData?.id}/poster.jpg?apikey=${token}`,
                          } as ImageSource
                        }
                        transition={200}
                        // recyclingKey={`${data.id}`}
                      />
                    </XStack>
                    <YStack flex={1} marginLeft="$2" paddingVertical="$2">
                      <H5 color="$gray12" numberOfLines={2}>
                        {item.seriesData?.title}
                      </H5>
                      <Text marginTop="$2" color="$gray11">{`${t(
                        "sonarr:season"
                      )} ${item.seasonNumber} • ${t("sonarr:episode")} ${
                        item.episodeNumber
                      }`}</Text>
                      <Text marginTop="$1.5" color="$gray11" numberOfLines={1}>
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
                    <XStack
                      marginLeft="$2"
                      marginRight="$3"
                      alignItems="center"
                    >
                      <Text color="$gray11">{item.time}</Text>
                    </XStack>
                  </XStack>
                </Button>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchCalendar}
                tintColor={sonarrColors.accentColor}
              />
            }
            ListEmptyComponent={
              <EmptyList
                queryStatus={calendarQuery.status}
                text={t("sonarr:noCalendarDataFoundForThisWeek")}
                accentColor={sonarrColors.accentColor}
              />
            }
            ListFooterComponent={<XStack height="$8" />}
            // For manual section header rendering
            // renderSectionHeader={(info) => {
            //   console.log(info);
            //   return <XStack height="$3" backgroundColor="red"></XStack>;
            // }}
            sectionStyle={agendaListTheme}
          />
        </XStack>
      </CalendarProvider>
    </YStack>
  );
};

export default SonarrCalendar;
