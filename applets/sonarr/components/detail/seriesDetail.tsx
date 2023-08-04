import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { SeriesResource } from "../../api";
import { XStack, YStack, Text, H6, H3, Button, H4 } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Image, ImageSource } from "expo-image";
import { useSonarrStore } from "../../store";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { Screens } from "@astrysk/constants";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
} from "../../types";
import { FlashList } from "@shopify/flash-list";
import SonarrSeriesActionPanel from "./seriesActionPanel";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { TFunction } from "i18next";

const getSonarrSeriesDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "label",
      value: seriesData.monitored ? `${t("common:yes")}` : `${t("common:no")}`,
      firstItem: true,
    },
    {
      key: "sonarr:seriesType",
      type: "label",
      value: seriesData.seriesType,
    },
    {
      key: "common:path",
      type: "label",
      value: seriesData.path as string,
    },
    {
      key: "common:quality",
      type: "label",
      // value: seriesData.qualityProfileId,
    },
    {
      key: "common:language",
      type: "label",
      // value: seriesData.languageProfileId,
    },
    {
      key: "common:status",
      type: "label",
      value: seriesData.status,
    },
    {
      key: "sonarr:nextAiring",
      type: "label",
      value: seriesData.nextAiring?.toLocaleString() ?? `${t("sonarr:na")}`,
    },
    {
      key: "common:year",
      type: "label",
      value: `${seriesData.year}`,
    },
    {
      key: "sonarr:network",
      type: "label",
      value: seriesData.network as string,
    },
    {
      key: "sonarr:runtime",
      type: "label",
      value: `${seriesData.runtime}`,
    },
    {
      key: "sonarr:rating",
      type: "label",
      value: `${seriesData.certification}`,
    },
    {
      key: "sonarr:genres",
      type: "label",
      value: seriesData.genres as string[],
    },
    {
      key: "sonarr:alternateTitles",
      type: "label",
      value: seriesData.alternateTitles as string[],
      lastItem: true,
    },
  ];
};

export const SonarrSeriesDetail: React.FC<{
  forwardedData: SeriesResource;
}> = ({ forwardedData }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();

  const baseURL = useSonarrStore.getState().baseURL as string;
  const token = useSonarrStore.getState().token as string;

  const [readMore, _] = React.useState(false);
  const [titleLines, setTitleLines] = React.useState(2);
  const [summaryLines, setSummaryLines] = React.useState(7);

  const goToDescriptionScreen = (seriesId: number) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: SonarrDetailScreenContext.SeriesDescription,
        itemId: seriesId,
      } as SonarrDetailScreenProps,
    });
  };

  const getSizeOnDisk = (size: number) => {
    const sizeInGB = size / 1073741824;
    return sizeInGB.toFixed(2);
  };

  useSonarrDetailHeader(navigation, forwardedData.title as string);

  // React.useEffect(() => {
  //   console.log(JSON.stringify(forwardedData, null, 2));
  // }, []);

  return (
    <YStack flex={1}>
      <FlashList
        data={getSonarrSeriesDetailOptions(t, forwardedData)}
        renderItem={({ item }) => {
          return (
            <SettingsOption
              t={t}
              item={item}
              style={{
                marginHorizontal: "$3",
                overflow: "hidden",
              }}
            />
          );
        }}
        estimatedItemSize={76}
        // showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <YStack paddingHorizontal="$3" paddingVertical="$3">
            <XStack width="100%">
              <XStack height="$12" width="$9">
                <Image
                  style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
                  source={
                    {
                      uri: `${baseURL}/api/MediaCover/${forwardedData.id}/poster.jpg?apikey=${token}`,
                    } as ImageSource
                  }
                  transition={200}
                  recyclingKey={`${forwardedData.id}`}
                />
              </XStack>
              <YStack flex={1} marginLeft="$3">
                <H3
                  numberOfLines={2}
                  onTextLayout={(e) =>
                    setTitleLines(e.nativeEvent.lines.length)
                  }
                >
                  {forwardedData.title}
                </H3>
                <Text
                  color="$gray11"
                  numberOfLines={readMore ? 0 : titleLines == 2 ? 5 : 7}
                  onTextLayout={(e) =>
                    setSummaryLines(e.nativeEvent.lines.length)
                  }
                >
                  {forwardedData.overview ?? t("sonarr:noDescriptionAvailable")}
                </Text>
                <Text
                  display={!readMore && summaryLines > 5 ? "flex" : "none"}
                  color="$blue10Dark"
                  onPress={() => {
                    goToDescriptionScreen(forwardedData.id as number);
                  }}
                >
                  {t("jellyfin:readMore")}
                </Text>
              </YStack>
            </XStack>
            <SonarrSeriesActionPanel
            // data={forwardedData}
            />
            <Button
              height="$8"
              marginTop="$4"
              marginBottom="$2"
              paddingHorizontal="$3"
              paddingVertical="$0"
              backgroundColor="$gray1"
              onPress={() => {}}
            >
              <XStack flex={1}>
                <YStack flex={1}>
                  <H4 color="$gray12">{t("sonarr:allSeasons")}</H4>
                  <Text color="$gray11" marginTop="$1">
                    {`${getSizeOnDisk(
                      forwardedData.statistics?.sizeOnDisk as number
                    )} ${t("sonarr:gb")}`}
                  </Text>
                  <Text color="$gray11" marginTop="$1">
                    {`${forwardedData.statistics?.percentOfEpisodes}${t(
                      "sonarr:percent"
                    )} - ${forwardedData.statistics?.episodeFileCount}/${
                      forwardedData.statistics?.episodeCount
                    } ${t("sonarr:episodes")}`}
                  </Text>
                </YStack>
                <XStack alignItems="center">
                  <ChevronRight size={20} opacity={0.6} />
                </XStack>
              </XStack>
            </Button>
          </YStack>
        )}
        ListFooterComponent={() => <XStack height="$5"></XStack>}
      />
      {/* <YStack> */}
      {/*   <XStack */}
      {/*     width="100%" */}
      {/*     borderRadius="$6" */}
      {/*     onPress={() => { */}
      {/*       // router.push({ */}
      {/*       //   pathname: `/${Screens.HOME_SCREEN_DETAIL_ROUTE}${data.Type}`, */}
      {/*       //   params: {}, */}
      {/*       // }); */}
      {/*     }} */}
      {/*   > */}
      {/*     <XStack height="$12" width="$9"> */}
      {/*       <Image */}
      {/*         style={{ */}
      {/*           flex: 1, */}
      {/*           overflow: "hidden", */}
      {/*           borderRadius: 10, */}
      {/*         }} */}
      {/*         source={ */}
      {/*           { */}
      {/*             uri: `${baseURL}/Items/${seriesId}/Images/Primary`, */}
      {/*             headers: { */}
      {/*               "X-Emby-Authorization": token, */}
      {/*             }, */}
      {/*           } as ImageSource */}
      {/*         } */}
      {/*         placeholder={ */}
      {/*           forwardedData?.ImageBlurHashes?.Primary?.[ */}
      {/*             seriesImageHash */}
      {/*           ] as string */}
      {/*         } */}
      {/*       /> */}
      {/*     </XStack> */}
      {/*     <YStack flex={1} marginLeft="$4"> */}
      {/*       <H4 color="$color">{seriesName}</H4> */}
      {/*       <H6 color="$gray11"> */}
      {/*         {seriesData.data?.ProductionYear} */}
      {/*       </H6> */}
      {/*       {seriesData.data?.CommunityRating && ( */}
      {/*         <XStack marginTop="$1.5" alignItems="center"> */}
      {/*           <Ionicons name="star" color="#9E9E9E" /> */}
      {/*           <Text marginLeft="$1.5" color="$gray11"> */}
      {/*             {seriesData.data?.CommunityRating} */}
      {/*           </Text> */}
      {/*         </XStack> */}
      {/*       )} */}
      {/*       <Text marginLeft="$3" color="$gray10"> */}
      {/*         {seriesData.data?.OfficialRating} */}
      {/*       </Text> */}
      {/*     </YStack> */}
      {/*   </XStack> */}
      {/*   <YStack marginTop="$2"></YStack> */}
      {/* </YStack> */}
    </YStack>
  );
};

export default SonarrSeriesDetail;
