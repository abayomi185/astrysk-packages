import React, { Suspense } from "react";
import { useRouter } from "expo-router";
import {
  ReleaseResource,
  SeriesResource,
  useGetApiV3Release,
  usePostApiV3Release,
} from "../../api";
import { XStack, YStack, Text, Button, H6 } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { EmptyList, showToast } from "@astrysk/components";
import { sonarrColors } from "../../colors";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import {
  ExtendedReleaseResource,
  SonarrInteractiveSearchContext,
} from "../../types";
import { SonarrActionPanelButton } from "../detail/actionPanel";
import { getSizeOnDisk } from "../../utils";
import {
  expandableItemAnimationHandler,
  getDateFromHours,
} from "@astrysk/utils";
import { getIconColor } from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";

const SonarrInteractiveSearchItemExpanded: React.FC<{
  t: TFunction;
  data: ExtendedReleaseResource;
}> = ({ t, data }) => {
  return (
    <XStack flex={1} marginTop="$1">
      <YStack flex={1}>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("sonarr:indexer")}
          </Text>
          <Text color="$gray11">{data?.indexer}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("sonarr:quality")}
          </Text>
          <Text color="$gray11">{data?.quality?.quality?.name}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("sonarr:size")}
          </Text>
          <Text color="$gray11">{`${getSizeOnDisk(data?.size as number)} ${t(
            "sonarr:gb"
          )}`}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("sonarr:language")}
          </Text>
          <Text color="$gray11">{data?.language?.name}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {`${t("sonarr:seeders")}`}
          </Text>
          <Text flex={1} color="$gray11" numberOfLines={5}>
            {data?.seeders}
          </Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {`${t("sonarr:leechers")}`}
          </Text>
          <Text flex={1} color="$gray11" numberOfLines={5}>
            {data?.leechers}
          </Text>
        </XStack>
      </YStack>
    </XStack>
  );
};

const SonarrInteractiveSearchItem: React.FC<{
  t: TFunction;
  data: ExtendedReleaseResource;
  context: SonarrInteractiveSearchContext;
  pressHandler: () => void;
}> = ({ t, data, context, pressHandler }) => {
  const router = useRouter();
  const toast = useToastController();

  const iconColor = getIconColor();

  const [expanded, setExpanded] = React.useState(false);

  const release = usePostApiV3Release({
    mutation: {
      onSuccess: () => {
        showToast(toast, t("sonarr:success:requested"), {
          type: "success",
        });
      },
      onError: (error) => {
        showToast(toast, t("sonarr:error:requestFailed"), {
          message: error.message,
          type: "error",
        });
      },
    },
  });
  const postRelease = () => {
    release.mutate({
      data: {
        guid: data.guid,
        indexerId: data.indexerId,
      },
    });
  };

  return (
    <Button
      height="auto"
      marginVertical="$1.5"
      paddingVertical="$2"
      paddingHorizontal="$2.5"
      backgroundColor="$gray1"
      onPress={() => {
        pressHandler();
        setExpanded(!expanded);
      }}
      overflow="hidden"
    >
      <XStack flex={1} height="100%">
        <YStack flex={1} marginLeft="$2.5" marginTop="$1">
          <XStack flex={1}>
            <YStack flex={1}>
              <H6 numberOfLines={expanded ? undefined : 1}>{data.title}</H6>
              {expanded ? (
                <SonarrInteractiveSearchItemExpanded t={t} data={data} />
              ) : (
                <YStack flex={1} overflow="hidden">
                  <XStack>
                    <Text
                      color={
                        (data?.seeders as number) > (data?.leechers as number)
                          ? "$green9"
                          : "$gray11"
                      }
                      marginTop="$2"
                      numberOfLines={1}
                    >
                      {`${t(`sonarr:${data.protocol}`)} (${data.seeders}/${
                        data.leechers
                      })`}
                    </Text>
                    <Text color="$gray11" marginTop="$2" numberOfLines={1}>
                      {` • ${data.indexer}`}
                    </Text>
                  </XStack>
                  <Text color="$gray11" marginTop="$2" numberOfLines={1}>
                    {`${getDateFromHours(data.ageHours as number)} ${t(
                      "sonarr:days"
                    )} • ${data.seriesTitle}`}
                  </Text>
                  <H6 color="$gray11" marginTop="$2" numberOfLines={1}>
                    {`${data?.quality?.quality?.name} • ${
                      data?.language?.name
                    } • ${getSizeOnDisk(data.size as number)} ${t(
                      "sonarr:gb"
                    )}`}
                  </H6>
                  <XStack alignItems="center" marginTop="$2.5"></XStack>
                </YStack>
              )}
            </YStack>
            <XStack
              width="$5"
              marginLeft="$1.5"
              justifyContent="center"
              alignItems="center"
            >
              <SonarrActionPanelButton first vertical onPress={postRelease}>
                <Ionicons name="download" size={23} color={iconColor} />
              </SonarrActionPanelButton>
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const SonarrInteractiveSearch: React.FC<{
  data: SeriesResource;
  seasonNumber?: number;
  episodeId?: number;
}> = ({ data, seasonNumber, episodeId }) => {
  const { t } = useTranslation();

  const flashListRef = React.useRef<FlashList<ReleaseResource>>(null);

  const releaseQuery = useGetApiV3Release({
    seriesId: data.id,
    ...(seasonNumber ? { seasonNumber: seasonNumber } : {}),
    ...(episodeId ? { episodeId: episodeId } : {}),
  });

  const interactiveSearchContext = seasonNumber
    ? SonarrInteractiveSearchContext.Season
    : episodeId
    ? SonarrInteractiveSearchContext.Episode
    : SonarrInteractiveSearchContext.Series;

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1} marginTop="$1">
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: "12",
            }}
            data={releaseQuery.data}
            renderItem={({ item }: { item: ReleaseResource }) => (
              <SonarrInteractiveSearchItem
                t={t}
                data={item}
                context={interactiveSearchContext}
                pressHandler={() =>
                  expandableItemAnimationHandler(flashListRef)
                }
              />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={
              <EmptyList
                queryStatus={releaseQuery.status}
                text={t("sonarr:noDataFound")}
                accentColor={sonarrColors.accentColor}
              />
            }
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default SonarrInteractiveSearch;
