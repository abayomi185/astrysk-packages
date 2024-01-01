import React from "react";
import { useRouter } from "expo-router";
import { Button, H3, XStack, YStack, Text } from "tamagui";
import { TFunction } from "i18next";
import { goToOllamaFsDetailScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import {
  OllamaConversationHistoryDetailItems,
  OllamaDetailScreenContext,
} from "../../types";

export const ChatHistoryListItem: React.FC<{
  t: TFunction;
  data: OllamaConversationHistoryDetailItems;
}> = ({ t, data }) => {
  const router = useRouter();

  const getComponentBody = () => {
    return (
      <YStack flex={1}>
        <H3 numberOfLines={1}>{data.name}</H3>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:model`) + ": "}
          {data.modelName}
        </Text>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:conversationLength`) + ": "}
          {data.conversationLength}
        </Text>
        <Text color="$gray10" marginTop="$1">
          {t(`ollama:modified`) + ": "}
          {new Date(data.lastUpdated ?? 0).toLocaleString().slice(0, -3)}
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
          searchItemId: data.model as string,
          tabContext: TabContext.Search,
          screenContext: OllamaDetailScreenContext.SearchItem,
          conversationId: data.conversationId,
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
