import React from "react";
import { PixelRatio } from "react-native";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, Text, useTheme, XStack, H5, Button } from "tamagui";
import { CalendarProvider, AgendaList } from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import {
  MovieResource,
  useGetApiV3Calendar,
  useGetApiV3Language,
  useGetApiV3Qualityprofile,
  useGetApiV3Rootfolder,
  useGetApiV3Movie,
} from "../../api";
import { radarrColors } from "../../colors";
import {
  getStartAndEndOfWeek,
  onItemLayout,
  setLoadingSpinner,
  useColorScheme,
  useLoadingSpinner,
} from "@astrysk/utils";
import { EmptyList, SectionTitle } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { goToRadarrDetailScreen } from "../../utils";
import { useRadarrStore } from "../../store";
import {
  CalendarData,
  RadarrAgendaList,
  RadarrDetailScreenContext,
} from "../../types";
import { Actions } from "@astrysk/constants";
import { TabContext } from "@astrysk/types";
import { useSetLoadingSpinner } from "@astrysk/utils/utils/loading";

const getExpandableCalendarTheme = (darkMode: boolean): Theme => ({
  arrowColor: radarrColors.accentColor,
  monthTextColor: darkMode ? "#d1d1d1" : undefined,
  dayTextColor: darkMode ? "#808080" : undefined,
  calendarBackground: darkMode ? "#151515" : "#f9f9f9",
  // agendaKnobColor: "red",
});

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
  paddingLeft: 13,
  paddingRight: 13,
  paddingBottom: 3,
});

const RadarrCalendar: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useRadarrStore.getState().baseURL as string;
  const token = useRadarrStore.getState().token as string;

  const colorScheme = useColorScheme();

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

  useGetApiV3Movie(
    {},
    {
      query: {
        onSuccess: (data) => {
          // console.log(JSON.stringify(data, null, 2));
          useRadarrStore.setState((state) => ({
            radarrMovieCache: {
              ...state.radarrMovieCache,
              ...data.reduce((acc: { [key: number]: MovieResource }, item) => {
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
      // includeEpisodeImages: true,
      // unmonitored: true,
      // tags?: string;
    },
    {
      query: {
        onSettled: (_data) => {
          setLoadingSpinner(RadarrCalendar.name, Actions.DONE);
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
        useRadarrStore.setState({
          radarrQualityProfiles: data,
        });
      },
    },
  });
  useGetApiV3Language({
    query: {
      onSuccess: (data) => {
        useRadarrStore.setState({
          radarrLanguageProfiles: data,
        });
      },
    },
  });
  useGetApiV3Rootfolder({
    query: {
      onSuccess: (data) => {
        useRadarrStore.setState({
          radarrRootFolderCache: data.map((item) => item.path as string),
        });
      },
    },
  });

  const refetchCalendar = () => {
    setLoadingSpinner(RadarrCalendar.name, Actions.LOADING);
    calendarQuery.refetch();
  };

  const groupBy = (
    array: RadarrAgendaList[],
    key: keyof RadarrAgendaList
  ): { [key: string]: RadarrAgendaList[] } => {
    // Reduce the array to a map of keys and arrays of items
    // The key is the key of the item (title)
    return array.reduce(
      (
        result: { [key: string]: RadarrAgendaList[] },
        currentValue: RadarrAgendaList
      ) => {
        // Uses the key (title) from RadarrAgendaList to create a key in the result object
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

  useLoadingSpinner(RadarrCalendar.name);
  useSetLoadingSpinner(RadarrCalendar.name, calendarQuery.isSuccess);

  return (
    <YStack flex={1}>
      <CalendarProvider
        date={new Date().toISOString().split("T")[0]}
      // theme={calendarTheme.current}
      >
        <SectionTitle subtle>{t("radarr:upcomingMovies")}</SectionTitle>
        <XStack flexGrow={1}>
          <AgendaList
            sections={
              calendarQuery.data
                ? // Object.values are the values of the object only
                Object.values(
                  groupBy(
                    calendarQuery.data.map((calendarData) => {
                      const closestDate = [
                        calendarData.physicalRelease,
                        calendarData.digitalRelease,
                        calendarData.inCinemas,
                      ].reduce((closest: Date, date) => {
                        if (date) {
                          const movieDate = new Date(date);
                          if (
                            movieDate > weekRange[0] &&
                            movieDate < weekRange[1]
                          ) {
                            return movieDate;
                          }
                        }
                        return closest;
                      }, weekRange[0]);

                      return {
                        // Attempt to convert to local datetime
                        title: closestDate.toISOString(),
                        data: [
                          {
                            movieData:
                              useRadarrStore.getState().radarrMovieCache?.[
                              calendarData.id as number
                              ],
                            title: calendarData.title,
                            hasFile: calendarData.hasFile,
                            inCinemas: calendarData.inCinemas,
                          } as CalendarData,
                        ],
                      } as RadarrAgendaList;
                    }),
                    "title" // Group by title
                  )
                ).map((group: RadarrAgendaList[]) => ({
                  title: group[0].title,
                  data: group.map((item: RadarrAgendaList) => item.data[0]),
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
                    goToRadarrDetailScreen({
                      router,
                      searchItemId: item.movieData.id as number,
                      tabContext: TabContext.Home,
                      screenContext: RadarrDetailScreenContext.SearchItem,
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
                            uri: `${baseURL}/api/v3/MediaCover/${item.movieData?.id}/poster.jpg?apikey=${token}`,
                          } as ImageSource
                        }
                        transition={200}
                      // recyclingKey={`${item.movieData.id}`}
                      />
                    </XStack>
                    <YStack
                      flex={1}
                      marginLeft="$2"
                      marginRight="$3"
                      paddingVertical="$2"
                    >
                      <H5 color="$gray12" numberOfLines={2}>
                        {item.title}
                      </H5>
                      <Text marginTop="$1.5" color="$gray11">
                        {`${item.movieData?.year} • ${item.movieData?.studio}`}
                      </Text>
                      <Text marginTop="$1.5" color="$gray11">
                        {`${item.movieData?.runtime} ${t("radarr:mins")}`}
                      </Text>
                      <Text marginTop="$1.5" color="$gray11">
                        {
                          useRadarrStore
                            .getState()
                            ?.radarrQualityProfiles?.find(
                              (profile) =>
                                profile.id === item.movieData?.qualityProfileId
                            )?.name
                        }
                      </Text>
                      <Text
                        marginTop="$1.5"
                        color={item.hasFile ? "$green9" : "$red9"}
                      >
                        {item.hasFile
                          ? t("sonarr:available")
                          : t("sonarr:missing")}
                      </Text>
                    </YStack>
                  </XStack>
                </Button>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchCalendar}
                tintColor={radarrColors.accentColor}
              />
            }
            ListEmptyComponent={
              <EmptyList
                queryStatus={calendarQuery.status}
                text={t("sonarr:noCalendarDataFoundForThisWeek")}
                accentColor={radarrColors.accentColor}
              />
            }
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

export default RadarrCalendar;
