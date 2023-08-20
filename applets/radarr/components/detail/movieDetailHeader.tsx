import React from "react";
import { useRouter } from "expo-router";
import { YStack, XStack, H3, Text } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { MovieResource } from "../../api";
import { RadarrActionPanel } from "./actionPanel";
import { useRadarrStore } from "../../store";
import {
  RadarrDetailScreenContext,
  RadarrDetailScreenProps,
} from "../../types";
import { Screens } from "@astrysk/constants";
import { useTranslation } from "react-i18next";
import { getSizeOnDisk, goToRadarrDetailScreen } from "../../utils";
import { TabContext } from "@astrysk/types";

const RadarrMovieDetailHeader: React.FC<{
  forwardedData: MovieResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useRadarrStore.getState().baseURL as string;
  const token = useRadarrStore.getState().token as string;

  const [readMore, _] = React.useState(false);
  const [titleLines, setTitleLines] = React.useState(2);
  const [summaryLines, setSummaryLines] = React.useState(5);

  const goToDescriptionScreen = (movieId: number) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: RadarrDetailScreenContext.MovieDescription,
        itemId: movieId,
      } as RadarrDetailScreenProps,
    });
  };

  return (
    <YStack paddingHorizontal="$3" paddingVertical="$3">
      <XStack width="100%">
        <XStack height="$12" width="$9">
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
            source={
              {
                uri: `${baseURL}/api/v3/MediaCover/${forwardedData.id}/poster.jpg?apikey=${token}`,
              } as ImageSource
            }
            recyclingKey={`${forwardedData.id}`}
          />
        </XStack>
        <YStack flex={1} marginLeft="$3">
          <H3
            numberOfLines={2}
            onTextLayout={(e) => setTitleLines(e.nativeEvent.lines.length)}
          >
            {forwardedData.title}
          </H3>
          <Text
            color="$gray11"
            numberOfLines={readMore ? 0 : titleLines == 2 ? 5 : 7}
            onTextLayout={(e) => setSummaryLines(e.nativeEvent.lines.length)}
          >
            {forwardedData.overview ?? t("radarr:noDescriptionAvailable")}
          </Text>
          <Text
            display={
              !readMore &&
              ((titleLines == 1 && summaryLines > 6) ||
                (titleLines == 2 && summaryLines > 4))
                ? "flex"
                : "none"
            }
            color="$blue10Dark"
            onPress={() => {
              goToDescriptionScreen(forwardedData.id as number);
            }}
          >
            {t("common:readMore")}
          </Text>
        </YStack>
      </XStack>
      <XStack marginTop="$4" justifyContent="center">
        <RadarrActionPanel data={forwardedData} />
      </XStack>
    </YStack>
  );
};

export default RadarrMovieDetailHeader;
