import React from "react";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, Text, useTheme, XStack, H5 } from "tamagui";
import {
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
} from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import {
  SeriesResource,
  useGetApiV3Calendar,
  useGetApiV3Series,
} from "../../api";
import { sonarrColors } from "../../colors";
import {
  setLoadingSpinner,
  useColorScheme,
  useLoadingSpinner,
} from "@astrysk/utils";
import { SectionTitle } from "../../../jellyfin/components/styles";
import { useTranslation } from "react-i18next";
import { getStartAndEndOfWeek } from "../../utils";
import { useSonarrStore } from "../../store";
import { CalendarData } from "../../types";
import { Actions } from "@astrysk/constants";

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
});

// NOTE: Could consider putting date here
const today = new Date().toISOString().split("T")[0];

const SonarrCalendar: React.FC = () => {
  const { t } = useTranslation();

  const baseURL = useSonarrStore.getState().baseURL as string;
  const token = useSonarrStore.getState().token as string;

  const colorScheme = useColorScheme();

  const expandableCalendarTheme = React.useMemo(() => {
    return getExpandableCalendarTheme(colorScheme === "dark");
  }, [colorScheme]);

  const backgroundColor = useTheme().background.get().val;
  const textColor = useTheme().gray11.get().val;

  const agendaListTheme = React.useMemo(() => {
    return getAgendaListTheme(colorScheme === "dark", {
      backgroundColor,
      textColor,
    });
  }, [colorScheme]);

  // const weekRange = getStartAndEndOfWeek(new Date());
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
      // start: weekRange[0].toISOString(),
      // end: weekRange[1].toISOString(),
      // unmonitored?: boolean;
      includeEpisodeImages: true,
      // tags?: string;
    },
    {
      query: {
        onSuccess: (data) => {
          console.log(JSON.stringify(data, null, 2));
          setLoadingSpinner(SonarrCalendar.name, Actions.DONE);
        },
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
              <XStack
                height="$11"
                marginHorizontal="$2"
                marginTop="$2"
                backgroundColor="$gray1"
                borderRadius="$5"
              >
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
                <YStack flex={1} paddingHorizontal="$2" paddingVertical="$1.5">
                  <H5 color="$gray12">{item.seriesData?.title}</H5>
                  <Text marginTop="$2" color="$gray11">{`${t(
                    "sonarr:season"
                  )} ${item.seasonNumber} - ${t("sonarr:episode")} ${
                    item.episodeNumber
                  }`}</Text>
                  <Text marginTop="$1.5" color="$gray11">
                    {item.title}
                  </Text>
                </YStack>
                <XStack marginHorizontal="$3" alignItems="center">
                  <Text color="$gray11">{item.time}</Text>
                </XStack>
              </XStack>
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
