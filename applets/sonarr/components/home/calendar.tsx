import React from "react";
import { ScrollView, YStack, Text } from "tamagui";
import {
  ExpandableCalendar,
  CalendarProvider,
  Agenda,
  AgendaList,
  WeekCalendar,
} from "react-native-calendars";
import { useGetApiV3Calendar } from "../../api";

const calendarTheme = {
  // timelineContainer?: object;
  // contentStyle?: ViewStyle;
  // event?: object;
  // eventTitle?: object;
  // eventSummary?: object;
  // eventTimes?: object;
  // line?: object;
  // verticalLine?: object;
  // nowIndicatorLine?: object;
  // nowIndicatorKnob?: object;
  // timeLabel?: object;
  // todayTextColor?: string;
  // calendarBackground: "transparent",
  // indicatorColor?: string;
  // textSectionTitleColor?: string;
  // textSectionTitleDisabledColor?: string;
  // dayTextColor?: string;
  // selectedDayTextColor?: string;
  // monthTextColor?: string;
  // selectedDayBackgroundColor?: string;
  // arrowColor?: string;
  // textDisabledColor?: string;
  // textInactiveColor?: string;
  // backgroundColor?: string;
  // dotColor?: string;
  // selectedDotColor?: string;
  // disabledArrowColor?: string;
  // textDayFontFamily?: TextStyle['fontFamily'];
  // textMonthFontFamily?: TextStyle['fontFamily'];
  // textDayHeaderFontFamily?: TextStyle['fontFamily'];
  // textDayFontWeight?: TextStyle['fontWeight'];
  // textMonthFontWeight?: TextStyle['fontWeight'];
  // textDayHeaderFontWeight?: TextStyle['fontWeight'];
  // textDayFontSize?: number;
  // textMonthFontSize?: number;
  // textDayHeaderFontSize?: number;
  // agendaDayTextColor?: string;
  // agendaDayNumColor?: string;
  // agendaTodayColor?: string;
  // agendaKnobColor?: string;
  // todayButtonFontFamily?: TextStyle['fontFamily'];
  // todayButtonFontWeight?: TextStyle['fontWeight'];
  // todayButtonFontSize?: number;
  // textDayStyle?: TextStyle;
  // dotStyle?: object;
  // arrowStyle?: ViewStyle;
  // todayBackgroundColor?: string;
  // disabledDotColor?: string;
  // inactiveDotColor?: string;
  // todayDotColor?: string;
  // todayButtonTextColor?: string;
  // todayButtonPosition?: string;
  // arrowHeight?: number;
  // arrowWidth?: number;
  // weekVerticalMargin?: number;
  // stylesheet?: {
  //     calendar?: {
  //         main?: object;
  //         header?: object;
  //     };
  //     day?: {
  //         basic?: object;
  //         period?: object;
  //     };
  //     dot?: object;
  //     marking?: object;
  //     'calendar-list'?: {
  //         main?: object;
  //     };
  //     agenda?: {
  //         main?: object;
  //         list?: object;
  //     };
  //     expandable?: {
  //         main?: object;
  //     };
  // };
  backgroundColor: "red",
};

const weekCalendarTheme = {
  // reservationBackgroundColor: "blue",
  backgroundColor: "red",
  textDefaultColor: "red",
  selectedDayTextColor: "blue",
  todayBackgroundColor: "#e6ffe6",
  "stylesheet.week.main": {
    reservations: {
      backgroundColor: "#ff8080",
    },
  },
};

// const renderItem = React.useCallback(({ item }: any) => {
//   return (
//     <YStack>
//       <Text>{item}</Text>
//     </YStack>
//   );
// }, []);

const today = new Date().toISOString().split("T")[0];

const SonarrCalendar: React.FC = () => {
  const calendar = useGetApiV3Calendar({
    // start?: string;
    // end?: string;
    // unmonitored?: boolean;
    // includeSeries?: boolean;
    // includeEpisodeFile?: boolean;
    // includeEpisodeImages?: boolean;
    // tags?: string;
  });

  return (
    <YStack flex={1}>
      <CalendarProvider
        // date={new Date().toISOString().slice(0, 10)}
        date={new Date().toISOString().split("T")[0]}
        theme={calendarTheme}
      >
        <ExpandableCalendar allowShadow={false} />
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
          // sectionStyle={{
          //   backgroundColor: "transparent",
          // }}
        />
      </CalendarProvider>
    </YStack>
  );
};

export default SonarrCalendar;
