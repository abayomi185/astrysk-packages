import { BaseItemDto } from "../../api";
import { setLoadingSpinner } from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
// import { customTokenMerge } from "@astrysk/styles/themeConfig";
import React, { Suspense } from "react";
import { FlashList } from "@shopify/flash-list";
import { XStack, YStack, Text, H6 } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useJellyfinStore } from "../../store";

const JellyfinSeriesDetailEpisodeItem: React.FC<{
  index?: number;
  data: BaseItemDto;
  selectedEpisode: number;
  onSelectEpisode: (indexNumber: number) => void;
}> = ({ data, selectedEpisode, onSelectEpisode }) => {
  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const indexNumber = data.IndexNumber as number;

  const episodeImageHash: string = data.ImageTags?.["Primary"] as string;

  const [headerLines, setHeaderLines] = React.useState<number>();

  return (
    <YStack
      width="$14"
      pressStyle={{ scale: 0.98 }}
      animation="delay"
      onPress={() => {
        onSelectEpisode(indexNumber);
      }}
    >
      <YStack
        padding="$1"
        borderColor={
          selectedEpisode === indexNumber
            ? "$purple10Dark"
            : "$colorTransparent"
        }
        // borderColor="$purple8Dark"
        borderStyle="solid"
        borderWidth="$1.5"
        borderRadius="$6"
      >
        <YStack height="$10" borderRadius="$5" overflow="hidden">
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 11 }}
            source={
              {
                uri: `${baseURL}/Items/${data.Id}/Images/Primary?quality=80`,
                headers: {
                  "X-Emby-Authorization": token,
                },
              } as ImageSource
            }
            placeholder={
              data.ImageBlurHashes?.Primary?.[episodeImageHash] as string
            }
            onLoadEnd={() => {
              setLoadingSpinner(
                JellyfinSeriesDetailEpisodeItem.name,
                Actions.DONE
              );
            }}
            recyclingKey={data.Id}
            placeholderContentFit="cover"
          />
          <YStack
            position="absolute"
            height="100%"
            width="100%"
            // justifyContent="center"
            alignItems="flex-start"
            // alignItems="center"
            overflow="hidden"
          >
            {!data.UserData?.Played && (
              <Ionicons
                name="square"
                size={30}
                color="#8e4ec6"
                style={{
                  transform: [
                    {
                      rotateZ: "45deg",
                    },
                    {
                      scaleX: 2,
                    },
                    {
                      scaleY: 2.5,
                    },
                    {
                      translateX: -10,
                    },
                  ],
                }}
              />
            )}
          </YStack>
        </YStack>
      </YStack>
      <YStack marginTop="$1" paddingHorizontal="$1">
        <XStack>
          {/* {!data.UserData?.Played && ( */}
          {/*   <Ionicons */}
          {/*     name="ellipse" */}
          {/*     size={12} */}
          {/*     color="#8e4ec6" */}
          {/*     style={{ paddingTop: 4.5, marginRight: 4 }} */}
          {/*   /> */}
          {/* )} */}
          <H6
            color="$color"
            flex={1}
            numberOfLines={2}
            onTextLayout={(e) => setHeaderLines(e.nativeEvent.lines.length)}
          >
            {`${data.IndexNumber}. ${data.Name}`}
          </H6>
        </XStack>
        <Text color="$gray10" numberOfLines={headerLines === 2 ? 3 : 4}>
          {data?.Overview}
        </Text>
      </YStack>
    </YStack>
  );
};

const JellyfinSeriesDetailEpisodeList: React.FC<{
  userId: string;
  episodesData: BaseItemDto[];
  selectedEpisodeIndex: number;
  onSelectEpisode: (indexNumber: number) => void;
}> = ({ episodesData, selectedEpisodeIndex, onSelectEpisode }) => {
  const flashListEpisodeIndex = episodesData.findIndex(
    (data) => data.IndexNumber === selectedEpisodeIndex
  );

  return (
    <XStack flex={1}>
      <Suspense>
        <FlashList
          horizontal
          data={episodesData}
          extraData={{ selectedEpisodeIndex }}
          renderItem={({ item }) => (
            <JellyfinSeriesDetailEpisodeItem
              data={item}
              selectedEpisode={selectedEpisodeIndex as number}
              onSelectEpisode={onSelectEpisode}
            />
          )}
          initialScrollIndex={flashListEpisodeIndex}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<XStack width="$0.75" />}
          ListFooterComponent={<XStack width="$0.75" />}
          // estimatedItemSize={customTokenMerge.$14}
          estimatedItemSize={184}
        />
      </Suspense>
    </XStack>
  );
};

export default JellyfinSeriesDetailEpisodeList;
