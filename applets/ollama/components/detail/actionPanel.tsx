import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, GetProps, Stack, XStack } from "tamagui";
import { Plus, Trash2 } from "@tamagui/lucide-icons";
import { useTranslation } from "react-i18next";
import { checkActiveStatus, handleFilterPress, isEmpty } from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";
import { FilterButton, showToast } from "@astrysk/components";
import {
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaFilter,
  OllamaSearchFilterContext,
} from "../../types";
import { FlashList } from "@shopify/flash-list";
import { ollamaColors } from "../../colors";
import { useOllamaStore } from "../../store";

const getOllamaConversationFilterBarOptions = (
  context: OllamaSearchFilterContext
): OllamaFilter[] => {
  return [
    {
      id: "ollama:conversation_history",
      context: OllamaDetailScreenContext.History,
      options: [], // Not needed in this context
    },
    // {
    //   id: "ollama:options",
    //   context: OllamaDetailScreenContext.AdvancedOptions,
    //   options: [],
    // },
  ];
};

const OllamaNewConversationButton: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  return (
    <Button
      flex={1}
      height="$2.5"
      paddingHorizontal="$1"
      backgroundColor="$gray5"
      borderRadius="$8"
      onPress={onPress}
    >
      <Plus size="$1" />
    </Button>
  );
};

const OllamaConversationActionPanel: React.FC<{
  onNewConversationPress: () => void;
  callback?: (action?: string) => void;
}> = ({ onNewConversationPress, callback }) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const router = useRouter();

  const context = OllamaSearchFilterContext.Conversation;

  const searchFilters = useOllamaStore((state) => state.searchFilters);

  const useMutationOnSuccess = (
    toastMessage: string = t("ollama:success:actionComplete") as string
  ) => {
    showToast(toast, toastMessage, {
      type: "done",
    });
    callback && callback();
  };
  const useMutationOnError = (
    toastMessage: string = t("ollama:error:actionFailed") as string
  ) => {
    showToast(toast, toastMessage, {
      type: "error",
    });
    callback && callback();
  };

  const conversationFilterBarOptions = React.useMemo(() => {
    const filterBarOptions = getOllamaConversationFilterBarOptions(context);
    useOllamaStore.setState((state) => ({
      filterBarOptions: {
        ...state.filterBarOptions,
        [context]: filterBarOptions,
      },
    }));
    return filterBarOptions;
  }, [context]);

  return (
    <XStack
      height="$4"
      backgroundColor="$background"
      borderBottomWidth="$0.75"
      borderBottomColor="$gray7"
    >
      <XStack flex={1}>
        <FlashList
          horizontal
          data={conversationFilterBarOptions}
          extraData={searchFilters?.[context]}
          renderItem={({ item }) => (
            <FilterButton
              id={item.id}
              handlePress={(id: string, isToggle?: boolean) => {
                handleFilterPress<
                  OllamaDetailScreenProps,
                  OllamaDetailScreenContext,
                  OllamaSearchFilterContext
                >(router, item.context!, context, id, isToggle);
              }}
              active={checkActiveStatus<OllamaSearchFilterContext>(
                searchFilters,
                context,
                item.id
              )}
              activeBackgroundColor={ollamaColors.primary}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<XStack width="$0.75" />}
          ListFooterComponent={() => <XStack marginLeft="$3" />}
          estimatedItemSize={69}
        />
      </XStack>
      <XStack
        width="$2.5"
        marginLeft="$2.5"
        marginRight="$3"
        alignItems="center"
      >
        <OllamaNewConversationButton onPress={onNewConversationPress} />
      </XStack>
    </XStack>
  );
};

export default OllamaConversationActionPanel;
