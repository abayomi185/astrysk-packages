import React from "react";
import { useNavigation } from "expo-router";
import { YStack, XStack } from "tamagui";
import { useTranslation } from "react-i18next";
import { useOllamaStore } from "../../store";
import { onItemLayout } from "@astrysk/utils";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { OllamaModelDetails } from "../../types";

const OllamaModelView: React.FC<{
  filterType: string;
}> = ({ filterType }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [flashListHeight, setFlashListHeight] = React.useState(0);

  const filterObject = useOllamaStore
    .getState()
    .filterBarOptions?.Conversation?.find((data) => data.id === filterType);

  const conversationId = filterObject?.conversationId ?? "";

  const forwarededModelDetails =
    filterObject?.otherParams as OllamaModelDetails;

  const modelDigest =
    useOllamaStore.getState().ollamaConversationHistory?.[conversationId]
      ?.model ?? forwarededModelDetails?.digest;

  const modelName =
    useOllamaStore.getState().ollamaConversationHistory?.[conversationId]
      ?.modelName ?? forwarededModelDetails?.name;

  const settingsOptions: SettingsOptionProps[] = React.useMemo(() => {
    return [
      {
        key: "ollama:model",
        type: "label",
        value: modelName,
        firstItem: true,
      },
      {
        key: "ollama:digest",
        type: "label",
        value: modelDigest,
        lastItem: true,
      },
    ];
  }, []);

  return (
    <YStack height="100%" paddingVertical="$4">
      <XStack flex={1} minHeight={flashListHeight}>
        <FlashList
          data={settingsOptions}
          renderItem={({ item }) => {
            return (
              <YStack
                onLayout={onItemLayout(flashListHeight, setFlashListHeight)}
              >
                <SettingsOption
                  t={t}
                  item={item}
                  style={{
                    marginHorizontal: "$3",
                    overflow: "hidden",
                  }}
                />
              </YStack>
            );
          }}
          estimatedItemSize={51}
          showsVerticalScrollIndicator={false}
        />
      </XStack>
    </YStack>
  );
};

export default OllamaModelView;
