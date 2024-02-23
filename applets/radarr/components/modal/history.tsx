import React, { Suspense } from "react";
import {
  HistoryResource,
  MovieHistoryEventType,
  MovieResource,
  useGetApiV3HistoryMovie,
} from "../../api";
import { XStack, YStack, Text, Button, H6, ColorTokens } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { radarrColors } from "../../colors";
import { EmptyList } from "@astrysk/components";
import { expandableItemAnimationHandler } from "@astrysk/utils";

const RadarrHistoryItemExpanded: React.FC<{
  t: TFunction;
  data: HistoryResource;
}> = ({ t, data }) => {
  return (
    <XStack flex={1}>
      <YStack flex={1}>
        {data.eventType === "grabbed" && (
          <XStack marginTop="$3">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("radarr:quality")}
            </Text>
            <Text color="$gray11">{data.quality?.quality?.name}</Text>
          </XStack>
        )}
        <XStack marginTop="$3">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("radarr:languages")}
          </Text>
          <Text color="$gray11">
            {data.languages?.map((language) => language.name).join(", ")}
          </Text>
        </XStack>
        {(data.eventType === "downloadFolderImported" ||
          data.eventType === "grabbed") && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("radarr:client")}
            </Text>
            <Text color="$gray11">{data.data?.downloadClient}</Text>
          </XStack>
        )}
        {data.eventType === "grabbed" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("radarr:indexer")}
            </Text>
            <Text color="$gray11">{data.data?.indexer}</Text>
          </XStack>
        )}
        {data.eventType === "grabbed" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("radarr:releaseGroup")}
            </Text>
            <Text color="$gray11">{data.data?.releaseGroup}</Text>
          </XStack>
        )}
        {data.eventType === "downloadFolderImported" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {`${t("radarr:importedTo")}`}
            </Text>
            <Text flex={1} color="$gray11" numberOfLines={5}>
              {data.data?.importedPath}
            </Text>
          </XStack>
        )}
        {/* {data.eventType === "grabbed" && ( */}
        {/*   <XStack marginTop="$2.5"> */}
        {/*     <Text */}
        {/*       color="$gray11" */}
        {/*       width="30%" */}
        {/*       textAlign="right" */}
        {/*       marginRight="$3" */}
        {/*     > */}
        {/*       {t("radarr:age")} */}
        {/*     </Text> */}
        {/*     <Text color="$gray11">{`${parseInt( */}
        {/*       data.data?.ageHours as string */}
        {/*     )} ${t("radarr:hours")} ${parseInt( */}
        {/*       data.data?.ageMinutes as string */}
        {/*     )} ${t("radarr:minutes")}`}</Text> */}
        {/*   </XStack> */}
        {/* )} */}
        {data.eventType === "movieFileDeleted" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {`${t("radarr:reason")}`}
            </Text>
            <Text flex={1} color="$gray11" numberOfLines={5}>
              {data.data?.reason}
            </Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  );
};

export const RadarrHistoryItem: React.FC<{
  t: TFunction;
  data: HistoryResource;
  pressHandler: () => void;
}> = ({ t, data, pressHandler }) => {
  const textColorMap: { [key in MovieHistoryEventType]: ColorTokens } = {
    unknown: "$gray11",
    grabbed: "$green9",
    movieFolderImported: "$green9",
    downloadFolderImported: "$green9",
    downloadFailed: "$red9",
    movieFileDeleted: "$red9",
    movieFileRenamed: "$orange9",
    downloadIgnored: "$orange9",
  };

  const [expanded, setExpanded] = React.useState(false);

  return (
    <Button
      height="auto"
      marginVertical="$1.5"
      paddingTop="$2"
      paddingBottom="$2.5"
      paddingHorizontal="$2.5"
      backgroundColor="$gray1"
      onPress={() => {
        pressHandler();
        setExpanded(!expanded);
      }}
      overflow="hidden"
    >
      <YStack flex={1} marginTop="$1.5">
        <H6 numberOfLines={expanded ? undefined : 1}>{data.sourceTitle}</H6>
        {expanded ? (
          <RadarrHistoryItemExpanded t={t} data={data} />
        ) : (
          <YStack flex={1} overflow="hidden">
            <Text
              color="$gray11"
              marginTop="$2"
              numberOfLines={1}
            >{`${data.movie?.title}`}</Text>
            <Text color="$gray11" marginTop="$2">
              {`${new Date(data.date as string).toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: "short",
              })}`}
            </Text>
            <XStack alignItems="center" marginTop="$2.5">
              <H6
                color={textColorMap[data.eventType as MovieHistoryEventType]}
                lineHeight={0}
              >
                {t(`radarr:${data.eventType}`)}
              </H6>
              {data.eventType === "grabbed" && (
                <>
                  <Text color="$gray11">{" • "}</Text>
                  <H6 color={textColorMap[data.eventType]} lineHeight={0}>
                    {`${data.quality?.quality?.name}`}
                  </H6>
                </>
              )}
            </XStack>
          </YStack>
        )}
      </YStack>
    </Button>
  );
};

const RadarrHistory: React.FC<{
  data: MovieResource;
}> = ({ data }) => {
  const { t } = useTranslation();

  const flashListRef = React.useRef<FlashList<HistoryResource>>(null);

  const movieHistory = useGetApiV3HistoryMovie(
    {
      movieId: data.id,
      includeMovie: true,
    },
    {
      query: {
        onSuccess: () => {},
      },
    }
  );

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1} marginTop="$1">
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: 12,
            }}
            data={movieHistory.data}
            renderItem={({ item }: { item: HistoryResource }) => (
              <RadarrHistoryItem
                t={t}
                data={item}
                pressHandler={() =>
                  expandableItemAnimationHandler<HistoryResource>(flashListRef)
                }
              />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={
              <EmptyList
                queryStatus={movieHistory.status}
                text={t("radarr:noHistoryFound")}
                accentColor={radarrColors.accentColor}
              />
            }
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default RadarrHistory;
