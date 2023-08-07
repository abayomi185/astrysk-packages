import React, { Suspense } from "react";
import {
  HistoryResource,
  SeriesResource,
  useGetApiV3HistorySeries,
} from "../../api";
import { XStack, YStack, H3, Text, H4, Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";

const SonarrHistory: React.FC<{
  data: SeriesResource;
  seasonNumber?: number;
}> = ({ data, seasonNumber }) => {
  const { t } = useTranslation();
  const seriesHistory = useGetApiV3HistorySeries(
    {
      seriesId: data.id,
      ...(seasonNumber ? { seasonNumber: seasonNumber } : {}),
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
        <XStack flex={1}>
          <FlashList
            data={seriesHistory.data}
            renderItem={({ item }: { item: HistoryResource }) => (
              <YStack height="$11.5">
                <H3>{item.sourceTitle}</H3>
                <XStack flex={1} marginTop="$2.5" justifyContent="center">
                  {/* <SonarrActionPanel */}
                  {/*   data={forwardedData} */}
                  {/*   seasonNumber={item.seasonNumber as number} */}
                  {/* /> */}
                </XStack>
              </YStack>
            )}
            estimatedItemSize={64}
            ListEmptyComponent={() => (
              <XStack justifyContent="center" marginTop="$5">
                {seriesHistory.status === "loading" ? (
                  <Spinner />
                ) : (
                  <H4 color="$gray11">{t("sonarr:noHistoryFound")}</H4>
                )}
              </XStack>
            )}
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default SonarrHistory;
