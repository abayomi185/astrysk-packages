import React from "react";
import { YStack } from "tamagui";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const SonarrCalendar: React.FC = () => {
  return (
    <YStack flex={1}>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markedDates={{}}
      />
    </YStack>
  );
};

export default SonarrCalendar;
