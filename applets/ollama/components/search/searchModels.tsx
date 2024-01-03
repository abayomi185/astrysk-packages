import React from "react";
import { useRouter } from "expo-router";
import { Button, H3, XStack, YStack, Text } from "tamagui";
import { TFunction } from "i18next";
import { goToOllamaFsDetailScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import { OllamaDetailScreenContext } from "../../types";
import { ListLocalModels200ModelsItem } from "../../api";
import { storageUtils } from "@astrysk/utils";

export const ModelListItem: React.FC<{
  t: TFunction;
  data: ListLocalModels200ModelsItem;
}> = ({ t, data }) => {
  const router = useRouter();

  const getComponentBody = () => {
    return (
      <YStack flex={1}>
        <H3>{data.name}</H3>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:type`) + ": "}
          {t("ollama:model")}
        </Text>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:digest`) + ": "}
          {data.digest?.slice(0, 6)}
        </Text>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:size`) + ": "}
          {storageUtils.convertBytesToGB(data.size!) + t(`ollama:gb`)}
        </Text>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:modified`) + ": "}
          {new Date(data.modified_at ?? "").toLocaleDateString()}
        </Text>
      </YStack>
    );
  };

  return (
    <Button
      flex={1}
      height="auto"
      padding="$2"
      animation="delay"
      marginBottom="$2"
      borderRadius="$6"
      backgroundColor="$gray1"
      onPress={() =>
        goToOllamaFsDetailScreen({
          router,
          searchItemId: data.digest as string,
          tabContext: TabContext.Search,
          screenContext: OllamaDetailScreenContext.SearchItem,
        })
      }
    >
      <XStack
        flex={1}
        paddingHorizontal="$3"
        paddingVertical="$2"
        alignItems="center"
      >
        {getComponentBody()}
      </XStack>
    </Button>
  );
};
