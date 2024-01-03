import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { YStack, Text, XStack, H3, H5, Button } from "tamagui";
import ContextMenu from "react-native-context-menu-view";

import {
  createOllamaActionAlert,
  getOllamaConversationHistoryDetailItems,
  goToOllamaFsDetailScreen,
  useOllamaConfigurator,
} from "../utils";

import { useOllamaHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useOllamaStore } from "../store";
import { FlashList } from "@shopify/flash-list";
import { SectionTitle } from "@astrysk/components";
import { TabContext } from "@astrysk/types";
import {
  OllamaConversationHistoryDetailItems,
  OllamaDetailScreenContext,
} from "../types";

const OllamaHomeItem: React.FC<{
  details: OllamaConversationHistoryDetailItems;
  deleteHistoryItem: (conversationId: string) => void;
}> = ({ details, deleteHistoryItem }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const ollamaConversationHistory =
    useOllamaStore((state) => state.ollamaConversationHistory) ?? {};

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

  return (
    <ContextMenu
      actions={[
        {
          title: `${t("ollama:editChatNameQuestion")}`,
          systemIcon: "square.and.pencil",
        },
        {
          title: `${t("common:delete")}`,
          systemIcon: "trash",
          destructive: true,
        },
      ]}
      // dropdownMenuMode
      onPress={(event) => {
        const { indexPath } = event.nativeEvent;
        switch (indexPath[0]) {
          case 0:
            editHistoryItem(details.conversationId);
            break;
          case 1:
            // Delete
            deleteHistoryItem(details.conversationId);
            break;
        }
      }}
      // WARN: Consider experimenting with this another time
      // preview={
      //   <OllamaConversationDetail
      //     forwardedData={{
      //       ollamaContext: OllamaDetailScreenContext.HomePreview,
      //       ollamaTabContext: TabContext.Home,
      //     }}
      //     conversationHistoryId={details.conversationId}
      //     historyMode
      //   />
      // }
    >
      <Button
        height="auto"
        padding="$0"
        paddingHorizontal="$2.5"
        marginHorizontal="$2"
        marginTop="$2"
        backgroundColor="$gray1"
        borderRadius="$5"
        onPress={() => {
          goToOllamaFsDetailScreen({
            router,
            searchItemId: details.model as string,
            tabContext: TabContext.Home,
            screenContext: OllamaDetailScreenContext.HistoryItem,
            conversationId: details.conversationId,
          });
        }}
      >
        <YStack flex={1} padding="$2">
          <H5 numberOfLines={1}>{details.name}</H5>
          <Text color="$gray10" marginTop="$1.5" numberOfLines={1}>
            {`${t("ollama:model")}: ` +
              (details.modelName ?? `${t("common:na")}`)}
          </Text>
          <Text color="$gray10" marginTop="$1.5">
            {`${t("ollama:conversationLength")}: ` +
              `${details.conversationLength}`}
          </Text>
          <Text color="$gray10" marginTop="$1.5">
            {`${t("ollama:lastUpdated")}: ` +
              new Date(details.lastUpdated ?? 0).toLocaleString().slice(0, -3)}
          </Text>
        </YStack>
      </Button>
    </ContextMenu>
  );
};

const OllamaHome: React.FC = () => {
  const { t } = useTranslation();
  useOllamaConfigurator();

  const navigation = useNavigation();

  const ollamaConversationHistory =
    useOllamaStore((state) => state.ollamaConversationHistory) ?? {};

  const ollamaConversationHistoryKeys = React.useMemo(
    () => Object.keys(ollamaConversationHistory),
    [ollamaConversationHistory]
  );

  const getChatHistory = React.useCallback(() => {
    return getOllamaConversationHistoryDetailItems(
      ollamaConversationHistory,
      ollamaConversationHistoryKeys
    ).slice(0, 20);
  }, [ollamaConversationHistoryKeys]);

  const deleteHistoryItem = (conversationId: string) => {
    createOllamaActionAlert(
      t,
      t("ollama:deleteChatHistoryItemQuestion"),
      undefined,
      () => {
        const newConversationHistory = { ...ollamaConversationHistory };
        delete newConversationHistory[conversationId];
        useOllamaStore.setState({
          ollamaConversationHistory: newConversationHistory,
        });
      }
    );
  };

  useOllamaHomeHeader(navigation);

  return (
    <YStack height="100%">
      <XStack flex={1}>
        <FlashList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={getChatHistory()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OllamaHomeItem
              details={item}
              deleteHistoryItem={deleteHistoryItem}
            />
          )}
          estimatedItemSize={70}
          ListHeaderComponent={
            <XStack flex={1} paddingHorizontal="$1.5">
              <SectionTitle subtle>
                {t("ollama:recentChatHistory")}
              </SectionTitle>
            </XStack>
          }
          ListEmptyComponent={
            <XStack flex={1} justifyContent="center" alignItems="center">
              <XStack padding="$8">
                <H3 textAlign="center" color="$gray9">
                  {t("ollama:selectModelFromSearchTab")}
                </H3>
              </XStack>
            </XStack>
          }
        />
      </XStack>
    </YStack>
  );
};

export default OllamaHome;
