import React from "react";
import { Alert, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { YStack, XStack, Text, H3, Button } from "tamagui";
import { useOllamaStore } from "../../store";
import { FlashList } from "@shopify/flash-list";
import {
  createSettingsOptionsObject,
  getIconColor,
  onItemLayout,
} from "@astrysk/utils";
import { SettingsOption } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import OllamaConversationDetail from "../detail/conversationDetail";
import { OllamaDetailScreenContext } from "../../types";
import { TabContext } from "@astrysk/types";
import {
  createOllamaActionAlert,
  getOllamaConversationHistoryDetailItems,
} from "../../utils";

const OllamaChatHistory: React.FC<{
  filterType: string;
}> = ({ filterType }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const width = Dimensions.get("window").width;

  const iconColor = getIconColor();

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const conversationId =
    useOllamaStore
      .getState()
      .filterBarOptions?.Conversation?.find((data) => data.id === filterType)
      ?.conversationId ?? "";

  const ollamaConversationHistory =
    useOllamaStore((state) => state.ollamaConversationHistory) ?? {};

  const ollamaConversationHistoryKeys = React.useMemo(
    () => Object.keys(ollamaConversationHistory),
    [ollamaConversationHistory]
  );

  const getChatHistory = React.useCallback(() => {
    const historyDetailItems = getOllamaConversationHistoryDetailItems(
      ollamaConversationHistory,
      ollamaConversationHistoryKeys
    );
    if (conversationId) {
      return historyDetailItems.filter(
        (item) => item.conversationId !== conversationId
      );
    }
    return historyDetailItems;
  }, [ollamaConversationHistoryKeys]);

  const editHistoryItem = (key: string) => {
    Alert.prompt(
      t("ollama:editChatNameQuestion"),
      undefined,
      [
        {
          text: t("common:cancel") as string,
          style: "cancel",
        },
        {
          text: t("common:ok") as string,
          onPress: (value?: string) => {
            const newConversationHistory = {
              ...ollamaConversationHistory,
              [key]: { ...ollamaConversationHistory[key], name: value },
            };

            useOllamaStore.setState({
              ollamaConversationHistory: newConversationHistory,
            });
          },
          style: "default",
        },
      ],
      "plain-text"
    );
  };

  const loadHistoryItem = (key: string) => {
    useOllamaStore.setState({
      ollamaConversationIdOverride: key,
    });
    navigation.goBack();
  };

  const deleteHistoryItem = (key: string) => {
    createOllamaActionAlert(
      t,
      t("ollama:deleteChatHistoryItemQuestion"),
      undefined,
      () => {
        const newConversationHistory = { ...ollamaConversationHistory };
        delete newConversationHistory[key];
        useOllamaStore.setState({
          ollamaConversationHistory: newConversationHistory,
        });
      }
    );
  };

  return (
    <YStack height="100%" width="100%">
      <Carousel
        // mode="parallax"
        width={width}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          marginLeft: width * 0.05,
          marginTop: 20,
          justifyContent: "center",
        }}
        pagingEnabled
        windowSize={2}
        data={getChatHistory()}
        renderItem={({ item, index }) => (
          <YStack width="90%" height="65%">
            <YStack width="100%" justifyContent="center" marginBottom="$3">
              <H3 textAlign="center" numberOfLines={1}>
                {item.name}
              </H3>
              <XStack marginTop="$1.5" justifyContent="space-between">
                <Text color="$gray9">{`${t("ollama:lastUpdated")}: ${
                  item.lastUpdated
                    ? new Date(item.lastUpdated ?? 0)
                        .toLocaleString()
                        .slice(0, -3)
                    : t("common:na")
                }`}</Text>
                <Text color="$gray9">{index + 1}</Text>
              </XStack>
            </YStack>
            <YStack
              borderWidth="$0.5"
              borderColor="$gray9"
              borderBottomLeftRadius="$3"
              borderBottomRightRadius="$3"
              borderTopLeftRadius="$3"
              borderTopRightRadius="$3"
              overflow="hidden"
              pointerEvents="box-none"
            >
              <OllamaConversationDetail
                forwardedData={{
                  ollamaContext: OllamaDetailScreenContext.History,
                  ollamaTabContext: TabContext.Search,
                }}
                conversationHistoryId={item.conversationId}
                historyMode
              />
            </YStack>
            <XStack
              // flex={1}
              width="100%"
              height="$6"
              justifyContent="center"
              marginTop="$3.5"
            >
              <Button
                height="$6"
                width="$6"
                marginLeft="$2"
                borderRadius="$12"
                backgroundColor="$gray1"
                onPress={() => {
                  editHistoryItem(item.conversationId);
                }}
              >
                <Ionicons name="pencil" size={24} color={iconColor} />
              </Button>
              <Button
                height="$6"
                width="$6"
                marginLeft="$3"
                borderRadius="$12"
                backgroundColor="$gray1"
                onPress={() => {
                  loadHistoryItem(item.conversationId);
                }}
              >
                <Ionicons
                  name="arrow-down-outline"
                  size={28}
                  color={iconColor}
                />
              </Button>
              <Button
                height="$6"
                width="$6"
                marginLeft="$3"
                borderRadius="$12"
                backgroundColor="$gray1"
                onPress={() => {
                  deleteHistoryItem(item.conversationId);
                }}
              >
                <Ionicons name="trash-bin-sharp" size={24} color={"red"} />
              </Button>
            </XStack>
          </YStack>
        )}
      />
    </YStack>
  );
};

export default OllamaChatHistory;
