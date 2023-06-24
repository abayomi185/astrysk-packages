import React, { Suspense } from "react";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { Text, YStack, XStack, H6 } from "tamagui";
import { BaseItemDto } from "../../api";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/styles";

const JellyfinLatestMediaItem: React.FC<{
  index: number;
  resumeItem: BaseItemDto;
}> = ({ resumeItem }) => {
  const router = useRouter();

  // console.log(JSON.stringify(resumeItem, null, 4));
  const primaryBlurHash: string = resumeItem.ImageTags?.["Primary"] as string;

  return (
    <YStack
      width="$9"
      marginLeft="$3"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
    >
      <YStack height="$12" borderRadius="$6" backgroundColor="$gray6">
        {/* <Blurhash */}
        {/*   blurhash={ */}
        {/*     resumeItem.ImageBlurHashes?.Primary?.[primaryBlurHash] as string */}
        {/*   } */}
        {/*   style={{ flex: 1, overflow: "hidden", borderRadius: 15 }} */}
        {/* /> */}
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        <H6 color="$color" ellipsizeMode="tail" numberOfLines={1}>
          {resumeItem.SeriesName}
        </H6>
        <XStack>
          <Text color="$color"></Text>
          <Text color="$color" ellipsizeMode="tail" numberOfLines={1}>
            {resumeItem.Name}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

const JellyfinLatestMedia: React.FC<{
  resumeItems: BaseItemDto[];
}> = ({ resumeItems }) => {
  const { t } = useTranslation();

  return (
    <YStack height="$18">
      <SectionTitle>{t("jellyfin:latestMedia")}</SectionTitle>
      <Suspense>
        <FlatList
          horizontal
          data={resumeItems}
          renderItem={({ item, index }) => (
            <JellyfinLatestMediaItem index={index} resumeItem={item} />
          )}
          // keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          // disableIntervalMomentum
          // snapToInterval={325}
          ListFooterComponent={() => <XStack marginLeft="$3" />}
        />
      </Suspense>
    </YStack>
  );
};

// export default JellyfinLatestMedia;
