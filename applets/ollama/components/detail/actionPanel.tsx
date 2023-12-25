import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, GetProps, Stack, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Plus, Trash2 } from "@tamagui/lucide-icons";
import { useTranslation } from "react-i18next";
import {
  checkActiveStatus,
  getIconColor,
  handleFilterPress,
  isEmpty,
} from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";
import { FilterButton, showToast } from "@astrysk/components";
import { TFunction } from "i18next";
import { goToOllamaModalScreen } from "../../utils";
import {
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaFilter,
  OllamaSearchFilterContext,
} from "../../types";
import { FlashList } from "@shopify/flash-list";
import { ollamaColors } from "../../colors";
import { useOllamaStore } from "../../store";

const createOllamaActionAlert = (
  t: TFunction,
  title: string,
  message: string,
  onPress: () => void
) => {
  return Alert.alert(
    title,
    message,
    [
      {
        text: `${t("common:cancel")}`,
        style: "default",
      },
      {
        text: `${t("common:ok")}`,
        onPress: onPress,
        style: "destructive",
      },
    ],
    {}
  );
};

const getOllamaActionAlertMessage = (id: string, name: string) =>
  `${id} • ${name}`;

const OllamaActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: GetProps<typeof Button>;
  first?: boolean;
  vertical?: boolean;
}> = ({ children, onPress, onLongPress, disabled, style, first, vertical }) => {
  return (
    <Button
      width="auto"
      minWidth="$5"
      marginLeft={first || vertical ? undefined : "$2"}
      marginTop={!first && vertical ? "$3" : undefined}
      padding="$0"
      backgroundColor="$gray1"
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      {...style}
    >
      {children}
    </Button>
  );
};

const getOllamaConversationFilterBarOptions = (
  context: OllamaSearchFilterContext
): OllamaFilter[] => {
  return [
    {
      id: "ollama:conversation_history",
      options: [
        { value: "ollama:alphabetical", supportsOrderBy: true },
        { value: "ollama:size", supportsOrderBy: true },
        { value: "ollama:modified_date", supportsOrderBy: true },
      ],
    },
    // {
    //   id: "ollama:settings",
    //   options: [
    //     { value: "ollama:alphabetical", supportsOrderBy: true },
    //     { value: "ollama:size", supportsOrderBy: true },
    //     { value: "ollama:modified_date", supportsOrderBy: true },
    //   ],
    // },
  ];
};

const OllamaNewConversationButton: React.FC<{}> = () => {
  return (
    <Button
      flex={1}
      height="$2.5"
      paddingHorizontal="$1"
      backgroundColor="$gray5"
      borderRadius="$8"
      // onPress={onPressHandler}
    >
      <Plus size="$1" />
    </Button>
  );
};

const OllamaDeleteConversationButton: React.FC<{}> = () => {
  return (
    <Button
      flex={1}
      height="$2.5"
      paddingHorizontal="$1"
      backgroundColor="$gray5"
      borderRadius="$8"
      // onPress={onPressHandler}
    >
      <Trash2 size="$1" />
    </Button>
  );
};

const OllamaConversationActionPanel: React.FC<{
  data: any;
  callback?: (action?: string) => void;
}> = ({ data, callback }) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const router = useRouter();

  const iconColor = getIconColor();

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
                >(
                  router,
                  OllamaDetailScreenContext.SearchFilter,
                  context,
                  id,
                  isToggle
                );
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
          ListFooterComponent={() => (
            <>
              <XStack marginLeft="$3" />
            </>
          )}
          estimatedItemSize={69}
        />
      </XStack>
      <XStack width="$3" marginLeft="$2.5" marginRight="$3" alignItems="center">
        <OllamaNewConversationButton />
      </XStack>
    </XStack>
  );
};

export default OllamaConversationActionPanel;
