import React, { Suspense } from "react";
import { FlashList } from "@shopify/flash-list";
import { H6, XStack, YStack, Text } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { setLoadingSpinner, useLoadingSpinner } from "@astrysk/utils";
import { BaseItemPerson } from "../../api";
import { useJellyfinStore } from "../../store";
import { Actions } from "@astrysk/constants";
import { onItemLayout } from "@astrysk/utils";

const JellyfinCastAndCrewItem: React.FC<{
  index: number;
  person: BaseItemPerson;
}> = ({ index, person }) => {
  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const primaryBlurHash = person.PrimaryImageTag as string;

  useLoadingSpinner(JellyfinCastAndCrewItem.name);

  return (
    <YStack
      width="$8"
      marginLeft="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => {}}
    >
      <YStack height="$8" borderRadius="$6">
        <Image
          style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
          source={
            {
              uri: `${baseURL}/Items/${person.Id}/Images/Primary?quality=80`,
              headers: {
                "X-Emby-Authorization": token,
              },
            } as ImageSource
          }
          placeholder={
            person.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
          }
          onLoadEnd={() => {
            setLoadingSpinner(JellyfinCastAndCrewItem.name, Actions.DONE);
          }}
        />
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
          {person.Name}
        </H6>
        <Text color="$gray11" numberOfLines={2}>
          {person.Role}
        </Text>
      </YStack>
    </YStack>
  );
};

const JellyfinCastAndCrew: React.FC<{
  people: BaseItemPerson[];
}> = ({ people }) => {
  const [flashListHeight, setFlashListHeight] = React.useState(0);

  return (
    <Suspense>
      <YStack minHeight="$13">
        <XStack flex={1} height={flashListHeight}>
          <FlashList
            horizontal
            data={people}
            renderItem={({ item, index }) => (
              <YStack
                onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
              >
                <JellyfinCastAndCrewItem index={index} person={item} />
              </YStack>
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            ListHeaderComponent={() => <XStack marginLeft="$2" />}
            ListFooterComponent={() => <XStack marginLeft="$2" />}
            estimatedItemSize={112}
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default JellyfinCastAndCrew;
