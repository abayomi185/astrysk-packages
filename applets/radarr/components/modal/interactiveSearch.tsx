import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import {
  ReleaseResource,
  MovieResource,
  useGetApiV3Release,
  usePostApiV3Release,
} from "../../api";
import { XStack, YStack, Text, Button, H6 } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { EmptyList, showToast } from "@astrysk/components";
import { radarrColors } from "../../colors";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import {
  ExtendedReleaseResource,
  RadarrInteractiveSearchContext,
} from "../../types";
import { RadarrActionPanelButton } from "../detail/actionPanel";
import { getSizeOnDisk } from "../../utils";
import {
  expandableItemAnimationHandler,
  getDateFromHours,
} from "@astrysk/utils";
import { getIconColor, setLoadingSpinner } from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";

const RadarrInteractiveSearchItemExpanded: React.FC<{
  t: TFunction;
  data: ExtendedReleaseResource;
}> = ({ t, data }) => {
  return (
    <XStack flex={1} marginTop="$1">
      <YStack flex={1}>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("radarr:indexer")}
          </Text>
          <Text color="$gray11">{data?.indexer}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("radarr:quality")}
          </Text>
          <Text color="$gray11">{data?.quality?.quality?.name}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("radarr:size")}
          </Text>
          <Text color="$gray11">{`${getSizeOnDisk(data?.size as number)} ${t(
            "radarr:gb"
          )}`}</Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {t("radarr:languages")}
          </Text>
          <Text color="$gray11">
            {data?.languages?.map((language) => language.name).join(", ")}
          </Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {`${t("radarr:seeders")}`}
          </Text>
          <Text flex={1} color="$gray11" numberOfLines={5}>
            {data?.seeders}
          </Text>
        </XStack>
        <XStack marginTop="$2.5">
          <Text color="$gray11" width="30%" textAlign="right" marginRight="$3">
            {`${t("radarr:leechers")}`}
          </Text>
          <Text flex={1} color="$gray11" numberOfLines={5}>
            {data?.leechers}
          </Text>
        </XStack>
      </YStack>
    </XStack>
  );
};

const RadarrInteractiveSearchItem: React.FC<{
  t: TFunction;
  data: ExtendedReleaseResource;
  context: RadarrInteractiveSearchContext;
  pressHandler: () => void;
}> = ({ t, data, context, pressHandler }) => {
  const router = useRouter();
  const toast = useToastController();

  const iconColor = getIconColor();

  const [expanded, setExpanded] = React.useState(false);

  const release = usePostApiV3Release({
    mutation: {
      onSuccess: () => {
        showToast(toast, t("radarr:success:requested"), {
          type: "done",
        });
      },
      onError: (error) => {
        showToast(toast, t("radarr:error:requestFailed"), {
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
                <RadarrInteractiveSearchItemExpanded t={t} data={data} />
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
                      {`${t(`radarr:${data.protocol}`)} (${data.seeders}/${
                        data.leechers
                      })`}
                    </Text>
                    <Text color="$gray11" marginTop="$2" numberOfLines={1}>
                      {` • ${data.indexer}`}
                    </Text>
                  </XStack>
                  <Text color="$gray11" marginTop="$2" numberOfLines={1}>
                    {`${getDateFromHours(data.ageHours as number)} ${t(
                      "radarr:days"
                    )} • ${data.title}`}
                  </Text>
                  <H6 color="$gray11" marginTop="$2" numberOfLines={1}>
                    {`${data?.quality?.quality?.name} • ${
                      data.languages?.[0]?.name
                    } • ${getSizeOnDisk(data.size as number)} ${t(
                      "radarr:gb"
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
              <RadarrActionPanelButton first vertical onPress={postRelease}>
                <Ionicons name="download" size={23} color={iconColor} />
              </RadarrActionPanelButton>
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const RadarrInteractiveSearch: React.FC<{
  data: MovieResource;
}> = ({ data }) => {
  const { t } = useTranslation();
  const toast = useToastController();

  const flashListRef = React.useRef<FlashList<ReleaseResource>>(null);

  const releaseQuery = useGetApiV3Release(
    {
      movieId: data.id,
    },
    {
      query: {
        onError: (error) => {
          showToast(toast, t("radarr:error:interactiveSearchFailed"), {
            message: error.message,
            type: "error",
          });
        },
      },
    }
  );

  const interactiveSearchContext = RadarrInteractiveSearchContext.Movie;

  // const refetchRelease = () => {
  // setLoadingSpinner(RadarrInteractiveSearch.name, Actions.LOADING);
  // releaseQuery.refetch();
  // };

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
              <RadarrInteractiveSearchItem
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
                text={t("radarr:noDataFound")}
                accentColor={radarrColors.accentColor}
              />
            }
            // refreshControl={
            //   <RefreshControl
            //     refreshing={false}
            //     onRefresh={refetchRelease}
            //     tintColor={radarrColors.accentColor}
            //   />
            // }
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default RadarrInteractiveSearch;
