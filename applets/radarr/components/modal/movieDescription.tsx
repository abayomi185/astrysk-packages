import React from "react";
import { H4, ScrollView, Text } from "tamagui";
import { MovieResource } from "../../api";

const SonarrSeriesDescription: React.FC<{
  data: MovieResource;
}> = ({ data }) => {
  return (
    <ScrollView height="100%" nestedScrollEnabled>
      <H4 paddingHorizontal="$4" paddingTop="$4">
        {data?.title}
      </H4>
      <Text
        color="$gray11"
        paddingHorizontal="$4"
        paddingVertical="$4"
        fontSize={18}
        lineHeight={24}
      >
        {data?.overview}
      </Text>
    </ScrollView>
  );
};

export default SonarrSeriesDescription;
