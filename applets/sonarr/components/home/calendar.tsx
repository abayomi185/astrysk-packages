import React from "react";
import { YStack, Text, useTheme, XStack } from "tamagui";
import {
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
} from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import { useGetApiV3Calendar } from "../../api";

const getExpandableCalendarTheme = (): Theme => ({
  arrowColor: "red",
  monthTextColor: "#d1d1d1",
  dayTextColor: "#808080",
  calendarBackground: "#151515",
  // calendarBackground: variableToString(),
  // calendarBackground: useTheme().background.get().val,
});

const getAgendaListTheme = (): Theme => ({
  dayTextColor: "#808080",
  // textSectionTitleColor: "#d1d1d1",
  stylesheet: {
    agenda: {
      list: {
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#d1d1d1",
      },
    },
  },
});

// const renderItem = React.useCallback(({ item }: any) => {
//   return (
//     <YStack>
//       <Text>{item}</Text>
//     </YStack>
//   );
// }, []);

const today = new Date().toISOString().split("T")[0];

const SonarrCalendar: React.FC = () => {
  const expandableCalendarTheme = React.useRef(getExpandableCalendarTheme());
  const agendaListTheme = React.useRef(getAgendaListTheme());

  const calendar = useGetApiV3Calendar({
    // start?: string;
    // end?: string;
    // unmonitored?: boolean;
    // includeSeries?: boolean;
    // includeEpisodeFile?: boolean;
    // includeEpisodeImages?: boolean;
    // tags?: string;
  });

  // console.log(useTheme().background.get().val); // To get the background color from tamagui

  return (
    <YStack flex={1}>
      <CalendarProvider
        // date={new Date().toISOString().slice(0, 10)}
        date={new Date().toISOString().split("T")[0]}
        // theme={calendarTheme.current}
      >
        <ExpandableCalendar
          firstDay={1}
          allowShadow={false}
          theme={expandableCalendarTheme.current}
        />
        <AgendaList
          sections={[
            {
              title: today,
              data: [
                { hour: "4pm", duration: "1h", title: "Pilates ABC" },
                { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
              ],
            },
            {
              title: today,
              data: [
                { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
                { hour: "2pm", duration: "1h", title: "Deep Stretches" },
                { hour: "3pm", duration: "1h", title: "Private Yoga" },
              ],
            },
            {
              title: today,
              data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
            },
            {
              title: today,
              data: [{}],
            },
            {
              title: today,
              data: [
                { hour: "9pm", duration: "1h", title: "Middle Yoga" },
                { hour: "10pm", duration: "1h", title: "Ashtanga" },
                { hour: "11pm", duration: "1h", title: "TRX" },
                { hour: "12pm", duration: "1h", title: "Running Group" },
              ],
            },
            {
              title: today,
              data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
            },
            {
              title: today,
              data: [{}],
            },
            {
              title: today,
              data: [
                { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
                { hour: "10pm", duration: "1h", title: "Ashtanga" },
                { hour: "11pm", duration: "1h", title: "TRX" },
                { hour: "12pm", duration: "1h", title: "Running Group" },
              ],
            },
            {
              title: today,
              data: [
                { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
                { hour: "2pm", duration: "1h", title: "Deep Stretches" },
                { hour: "3pm", duration: "1h", title: "Private Yoga" },
              ],
            },
            {
              title: today,
              data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
            },
            {
              title: today,
              data: [
                { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
                { hour: "2pm", duration: "1h", title: "Deep Stretches" },
                { hour: "3pm", duration: "1h", title: "Private Yoga" },
              ],
            },
            {
              title: today,
              data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
            },
            {
              title: today,
              data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
            },
          ]}
          renderItem={({ item }: any) => {
            return (
              <YStack height="$3">
                <Text>{item.title}</Text>
              </YStack>
            );
          }}
          // For manual section header rendering
          // renderSectionHeader={(info) => {
          //   console.log(info);
          //   return <XStack height="$3" backgroundColor="red"></XStack>;
          // }}
          theme={agendaListTheme.current}
          sectionStyle={{
            backgroundColor: useTheme().background.get().val,
            // @ts-ignore
            color: useTheme().gray11.get().val,
          }}
        />
      </CalendarProvider>
    </YStack>
  );
};

export default SonarrCalendar;
