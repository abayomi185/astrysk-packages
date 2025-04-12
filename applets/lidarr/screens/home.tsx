import React from "react";
import { YStack } from "tamagui";

import { useLidarrConfigurator } from "../utils";

import { useLidarrHomeHeader } from "../components/useHeader";
// import LidarrCalendar from "../components/home/calendar";

const RadarrHome: React.FC = () => {
  useLidarrConfigurator();

  useLidarrHomeHeader();

  return <YStack height="100%">{/* <RadarrCalendar /> */}</YStack>;
};

export default RadarrHome;
