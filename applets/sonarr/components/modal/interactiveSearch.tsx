import React, { Suspense } from "react";
import { Animated } from "react-native";
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
import { EmptyList } from "@astrysk/components";
import { sonarrColors } from "../../colors";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import {
  ExtendedReleaseResource,
  SonarrInteractiveSearchContext,
} from "../../types";
import { customTokens } from "@astrysk/styles";
import {
  SonarrActionPanelButton,
  sonarrActionButtonColors,
} from "../detail/actionPanel";
import {
  getDateFromHours,
  getSizeOnDisk,
  getSonarrIconColor,
} from "../../utils";
import { Toasts, toast } from "@backpackapp-io/react-native-toast";
import { ToastModalProviderKey } from "../../types";

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
}> = ({ t, data, context }) => {
  const router = useRouter();

  const iconColor = getSonarrIconColor();

  const buttonDefaultHeight = customTokens.size[11].val;
  const buttonExpandedHeight = customTokens.size[16].val;

  const [buttonHeight] = React.useState(
    new Animated.Value(buttonDefaultHeight)
  );
  const [expanded, setExpanded] = React.useState(false);

  const release = usePostApiV3Release({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:requested"), {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
      onError: (error) => {
        toast.error(t("sonarr:error:requestFailed)"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
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
    <Animated.View style={{ height: buttonHeight }}>
      <Button
        flex={1}
        marginVertical="$1.5"
        paddingVertical="$2"
        paddingHorizontal="$2.5"
        backgroundColor="$gray1"
        onPress={() => {
          Animated.timing(buttonHeight, {
            toValue: expanded ? buttonDefaultHeight : buttonExpandedHeight, // Set to whatever height values you need
            duration: 200,
            useNativeDriver: false, // height is not supported by the native driver
          }).start();
          setExpanded(!expanded);
        }}
      >
        <XStack flex={1} height="100%">
          <YStack flex={1} marginLeft="$2.5" marginTop="$1">
            <XStack flex={1}>
              <YStack flex={1}>
                <H6 numberOfLines={expanded ? 2 : 1}>{data.title}</H6>
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
    </Animated.View>
  );
};

const SonarrInteractiveSearch: React.FC<{
  data: SeriesResource;
  seasonNumber?: number;
  episodeId?: number;
}> = ({ data, seasonNumber, episodeId }) => {
  const { t } = useTranslation();

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
              />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={() => (
              <EmptyList
                queryStatus={releaseQuery.status}
                text={t("sonarr:noDataFound")}
                accentColor={sonarrColors.accentColor}
              />
            )}
          />
        </XStack>
      </YStack>
      <Toasts
        providerKey={ToastModalProviderKey.Episode}
        extraInsets={{
          top: -50,
        }}
      />
    </Suspense>
  );
};

export default SonarrInteractiveSearch;
