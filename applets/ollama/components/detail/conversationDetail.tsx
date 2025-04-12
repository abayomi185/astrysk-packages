import React from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "expo-router";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import {
  Text,
  TextArea,
  XStack,
  YStack,
  getTokenValue,
  useTheme,
} from "tamagui";
import { useToastController } from "@tamagui/toast";
import { useOllamaDetailHeader, useOllamaFsDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { debouncedSetter, showToast } from "@astrysk/components";
import { Ionicons } from "@expo/vector-icons";
import ContextMenu from "react-native-context-menu-view";
import * as Clipboard from "expo-clipboard";
import * as Crypto from "expo-crypto";
import Axios from "axios";
import { GiftedChat } from "react-native-gifted-chat";
import {
  getIconColor,
  useColorScheme,
  useMutationLoadingSpinner,
} from "@astrysk/utils";
import { useOllamaStore } from "../../store";
import {
  ExtendedListLocalModels200ModelsItem,
  OllamaAdvancedOptions,
  OllamaConversation,
  OllamaDetailScreenContext,
  OllamaSearchFilterContext,
} from "../../types";
import OllamaConversationActionPanel from "./actionPanel";
import { Generate200 } from "../../api";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import a11yDark from "../styles/hljs-a11y-dark";
import a11yLight from "../styles/hljs-a11y-light";
import Markdown from "react-native-markdown-display";
import { goToOllamaModalScreen } from "../../utils";
import { DONE } from "@astrysk/constants/actions";
import { useChatWithReader } from "../../api/event";

const OllamaMarkdown = ({ content }: { content: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const colorScheme = useColorScheme();

  const syntaxHighlighterStyle = React.useMemo(() => {
    return colorScheme === "dark" ? a11yDark : a11yLight;
  }, [colorScheme]);

  const markdownStyle: StyleSheet.NamedStyles<any> = {
    body: {
      color: useTheme().color.get(),
      fontSize: 16,
      lineHeight: 24,
    },
    code_inline: {
      color: useTheme().color.get(),
      backgroundColor: useTheme().gray5.get(),
    },
    fence: {
      color: useTheme().color.get(),
      backgroundColor: useTheme().gray5.get(),
      borderRadius: 0,
      borderWidth: 0,
    },
  };

  const rules = {
    body: (node: any, children: any, parent: any, styles: any) => (
      <YStack
        key={node.key}
        style={{ ...styles._VIEW_SAFE_body, marginTop: -7 }}
      >
        {children}
      </YStack>
    ),
    fence: (node: any, children: any, parent: any, styles: any) => {
      return (
        <YStack key={node.key} marginLeft="$-8" marginRight="$-5">
          <ContextMenu
            key={node.key}
            actions={[
              {
                title: `${t("common:copy")}`,
                systemIcon: "clipboard",
              },
              {
                title: `${t("ollama:selectText")}`,
                systemIcon: "selection.pin.in.out",
              },
            ]}
            // dropdownMenuMode
            onPress={(event) => {
              const { indexPath } = event.nativeEvent;
              switch (indexPath[0]) {
                case 0:
                  // Copy
                  Clipboard.setStringAsync(node.content);
                  break;
                case 1:
                  // Select Text
                  useOllamaStore.setState({
                    ollamaSelectTextCache: [node.content],
                  });
                  goToOllamaModalScreen({
                    router,
                    itemId: "cache",
                    screenContext: OllamaDetailScreenContext.SelectText,
                    searchContext: OllamaSearchFilterContext.NONE,
                  });
                  break;
              }
            }}
          >
            <XStack
              flex={1}
              backgroundColor={syntaxHighlighterStyle.hljs.background}
            >
              <XStack width="$3.25" />
              <SyntaxHighlighter
                style={syntaxHighlighterStyle}
                // PreTag={OllamaMarkdownTagContainer}
                // CodeTag={OllamaMarkdownTagContainer}
              >
                {(node.content as string).trimEnd()}
              </SyntaxHighlighter>
              <XStack width="$3" />
            </XStack>
          </ContextMenu>
        </YStack>
      );
    },
  };

  return (
    <Markdown style={markdownStyle} rules={rules}>
      {content}
    </Markdown>
  );
};

const OllamaConversationSendButton: React.FC<{
  isLoading?: boolean;
  onPressHandler?: () => void;
}> = ({ isLoading, onPressHandler }) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-end",
      }}
      onPress={onPressHandler}
    >
      <XStack
        width="$4"
        height="$5"
        alignItems="center"
        justifyContent="center"
        marginRight="$0.5"
        paddingVertical="$1"
      >
        {isLoading ? (
          <Ionicons name="stop-circle" size={30} color={getIconColor()} />
        ) : (
          <Ionicons name="arrow-up-circle" size={30} color={getIconColor()} />
        )}
      </XStack>
    </TouchableOpacity>
  );
};

const getOllamaConversationMessageIcon = (
  key: string
): keyof typeof Ionicons.glyphMap => {
  switch (key) {
    case "ollama_user":
      return "square-outline";
    default:
      return "person-circle-outline";
  }
};

const OllamaConversationMessageIcon: React.FC<{ userId: string }> = ({
  userId,
}) => {
  return (
    <XStack
      width="$3"
      height="$3"
      alignItems="center"
      justifyContent="center"
      marginRight="$0.5"
      paddingVertical="$1"
    >
      <Ionicons
        name={getOllamaConversationMessageIcon(userId)}
        size={20}
        color={getIconColor()}
      />
    </XStack>
  );
};

const OllamaConversationMessage: React.FC<{
  props: OllamaConversation;
  deleteMessageHandler?: (messageId: string) => void;
}> = ({ props, deleteMessageHandler }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const userId = props.user._id as string;
  const userName = props.user.name;

  return (
    <ContextMenu
      actions={[
        {
          title: `${t("common:copy")}`,
          systemIcon: "clipboard",
        },
        {
          title: `${t("ollama:selectText")}`,
          systemIcon: "selection.pin.in.out",
        },
        {
          title: `${t("ollama:editText")}`,
          systemIcon: "square.and.pencil",
        },
        {
          title: `${t("ollama:delete")}`,
          systemIcon: "trash",
          destructive: true,
        },
      ]}
      // dropdownMenuMode
      onPress={(event) => {
        const { indexPath } = event.nativeEvent;
        switch (indexPath[0]) {
          case 0:
            // Copy
            Clipboard.setStringAsync(props.text!);
            break;
          case 1:
            // Select Text
            useOllamaStore.setState((state) => ({
              ollamaSelectTextCache: [
                ...(state.ollamaSelectTextCache ?? []),
                props.text!,
              ],
            }));
            goToOllamaModalScreen({
              router,
              itemId: "cache",
              screenContext: OllamaDetailScreenContext.SelectText,
              searchContext: OllamaSearchFilterContext.NONE,
            });
            break;
          case 2:
            useOllamaStore.setState({
              ollamaEditTextCache: props.text!,
              ollamaAfterEditTextCache: props.text!, // For state comparison
              editTextId: props._id as string,
            });
            goToOllamaModalScreen({
              router,
              itemId: "cache",
              screenContext: OllamaDetailScreenContext.EditText,
              searchContext: OllamaSearchFilterContext.NONE,
            });
            break;
          case 3:
            deleteMessageHandler?.(props._id as string);
            break;
        }
      }}
    >
      <YStack>
        <XStack
          paddingTop="$1"
          paddingBottom="$3"
          // WARN:
          marginLeft="$2"
          marginRight="$5"
        >
          <OllamaConversationMessageIcon userId={userId} />
          <YStack flex={1}>
            <XStack height="$3" alignItems="center">
              <Text fontWeight="700" color="$color">
                {userName}
              </Text>
            </XStack>
            <OllamaMarkdown content={props.text!} />
          </YStack>
        </XStack>
      </YStack>
    </ContextMenu>
  );
};

const OllamaConversationComposer: React.FC<{
  resetCount: number;
  setText: (newSearchTerm: string | string[]) => void;
}> = ({ resetCount, setText }) => {
  const { t } = useTranslation();
  const paddingVertical = getTokenValue("$1.5");

  const textAreaRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (resetCount > 0) {
      textAreaRef.current?.clear();
      setText("");
    }
  }, [resetCount]);

  return (
    <XStack flex={1} paddingLeft="$2.5" paddingVertical="$2">
      <TextArea
        ref={textAreaRef}
        flex={1}
        paddingVertical={paddingVertical + 2}
        paddingHorizontal="$3"
        borderTopLeftRadius="$6"
        borderBottomLeftRadius="$6"
        borderTopRightRadius="$6"
        borderBottomRightRadius="$6"
        placeholder={`${t("ollama:typeAMessage")}`}
        onChangeText={(text) => {
          setText(text);
        }}
      />
    </XStack>
  );
};

const OllamaConversationToolBar: React.FC<{
  onSend: (text: string) => void;
  onCancel?: () => void;
}> = ({ onSend, onCancel }) => {
  const [text, setText] = React.useState<string | string[]>("");
  const [resetCount, setResetCount] = React.useState<number>(0);

  const debouncedSetText = debouncedSetter(setText, 50);

  const conversationIsRequesting = useOllamaStore(
    (state) => state.ollamaConversationIsRequesting
  );

  const sendPressHandler = React.useCallback(
    (text: string) => {
      if (conversationIsRequesting) {
        onCancel?.();
      } else if (text) {
        onSend?.(text.trim());
        setResetCount((previousCount) => previousCount + 1);
      }
    },
    [conversationIsRequesting]
  );

  return (
    <XStack minHeight="$5" maxHeight="$13">
      <OllamaConversationComposer
        resetCount={resetCount}
        setText={debouncedSetText}
      />
      <OllamaConversationSendButton
        isLoading={conversationIsRequesting}
        onPressHandler={() => sendPressHandler(text as string)}
      />
    </XStack>
  );
};

const OllamaConversationDetail: React.FC<{
  forwardedData: ExtendedListLocalModels200ModelsItem; // WARN: Change to specific type
  conversationHistoryId?: string;
  historyMode?: boolean;
}> = ({ forwardedData, conversationHistoryId, historyMode }) => {
  const { t } = useTranslation();

  const toast = useToastController();

  const axiosCancelTokenSource = React.useRef(Axios.CancelToken.source());

  const ollamaConversationHistory =
    useOllamaStore((state) => state.ollamaConversationHistory) ?? {};

  const ollamaConversationIdOverride = useOllamaStore(
    (state) => state.ollamaConversationIdOverride
  );
  const ollamaEditTextId = useOllamaStore((state) => state.editTextId);

  const ollamaAfterEditTextCache = useOllamaStore(
    (state) => state.ollamaAfterEditTextCache
  );

  const [conversationId, setConversationId] = React.useState(
    conversationHistoryId
  );
  const [conversation, setConversation] = React.useState<OllamaConversation[]>(
    []
  );
  const [conversationAdvancedOptions, setConversationAdvancedOptions] =
    React.useState<OllamaAdvancedOptions>({});

  const [initialMessageCount, setInitialMessageCount] =
    React.useState<number>(0);

  const [sendCount, setSendCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (conversationId) {
      setConversation(ollamaConversationHistory[conversationId]?.conversation);
      setInitialMessageCount(
        ollamaConversationHistory[conversationId]?.conversation?.length ?? 0
      );
      setConversationAdvancedOptions(
        ollamaConversationHistory[conversationId]?.advancedOptions ?? {}
      );
    }
  }, [conversationId]);

  React.useEffect(() => {
    if (!historyMode && ollamaConversationIdOverride) {
      setConversationId(ollamaConversationIdOverride);
    }
    return () => {
      useOllamaStore.setState({
        ollamaSelectTextCache: undefined,
        ollamaConversationIdOverride: undefined,
        ollamaConversationIsRequesting: false,
      });
    };
  }, [ollamaConversationIdOverride]);

  const consistentUUID = React.useMemo(() => {
    if (conversationId) {
      return conversationId;
    } else {
      return Crypto.randomUUID();
    }
  }, [conversationId]);

  const convertConversationToOllamaRequestMessage = (
    conversation: OllamaConversation[]
  ) => {
    return conversation
      .map((ollamaMessage) => ({
        content: ollamaMessage.text,
        role: "user",
      }))
      .reverse();
  };

  const convertResponseToOllamaConversation = (
    message: Generate200
  ): OllamaConversation[] => {
    return [
      {
        _id: message.created_at!,
        text: message.message?.content!.trimStart()!,
        createdAt: new Date(message.created_at!),
        user: { _id: "ollama_user", name: "Ollama" },
      },
    ];
  };

  const chatNoStream = useChatWithReader(
    {
      baseUrl: useOllamaStore.getState().baseURL!,
      token: useOllamaStore.getState().token!,
    },
    {
      onSuccess: (data) => {
        setConversation((previousMessages) => [
          ...convertResponseToOllamaConversation(data),
          ...previousMessages,
        ]);
        useOllamaStore.setState({ ollamaConversationIsRequesting: false });
      },
      onError: (error) => {
        useOllamaStore.setState({ ollamaConversationIsRequesting: false });
        showToast(toast, t("ollama:requestError"), {
          message: error.message,
          type: "error",
        });
      },
    }
  );

  const saveConversation = () => {
    useOllamaStore.setState((state) => ({
      ollamaConversationHistory: {
        ...state.ollamaConversationHistory,
        [consistentUUID]: {
          ...state.ollamaConversationHistory?.[consistentUUID],
          conversation: conversation,
          conversationLength: conversation.length,
          model: forwardedData.digest,
          modelName: forwardedData.name,
          lastUpdated: new Date().toISOString(),
        },
      },
    }));
  };

  // Save current conversation when new message is received
  // or when a message is edited
  React.useEffect(() => {
    if (!historyMode && conversation.length > 0) {
      if (
        (conversationHistoryId && conversation.length != initialMessageCount) ||
        !conversationHistoryId
      ) {
        saveConversation();
      } else if (
        useOllamaStore.getState().ollamaEditTextCache !==
        useOllamaStore.getState().ollamaAfterEditTextCache
      ) {
        saveConversation();
      }
    }
  }, [conversation]);

  const requestChatNoStream = () => {
    chatNoStream.mutate({
      data: {
        model: forwardedData.name,
        messages: convertConversationToOllamaRequestMessage(conversation),
        stream: false,
        ...conversationAdvancedOptions, // Advanced options
      },
      cancelSource: axiosCancelTokenSource.current,
    });
    useOllamaStore.setState({ ollamaConversationIsRequesting: true });
  };

  const onSend = React.useCallback((newMessage: string) => {
    setConversation((previousMessages) => [
      {
        _id: new Date().toISOString(),
        text: newMessage,
        createdAt: new Date(),
        user: { _id: "active_user", name: "You" },
      },
      ...previousMessages,
    ]);
    setSendCount((previousCount) => previousCount + 1);
  }, []);

  const cancelRequest = () => {
    axiosCancelTokenSource.current?.cancel();
    // Cancel token has be reset after cancel
    axiosCancelTokenSource.current = Axios.CancelToken.source();
    chatNoStream.reset();
  };

  const newConversationHandler = () => {
    // Save current conversation
    useOllamaStore.setState({
      ollamaConversationIdOverride: undefined,
    });
    saveConversation();

    // Reset conversation
    setConversation([]);
    setConversationId(undefined);
    setSendCount(0);
  };

  const deleteMessage = (messageId: string) => {
    setConversation((previousMessages) =>
      previousMessages.filter((message) => message._id !== messageId)
    );
  };

  // Request response when sendCount changes
  React.useEffect(() => {
    if (sendCount > 0) {
      requestChatNoStream();
    }
  }, [sendCount]);

  // Save edited text
  React.useEffect(() => {
    if (
      useOllamaStore.getState().ollamaEditTextCache !==
      useOllamaStore.getState().ollamaAfterEditTextCache
    ) {
      const messageIndex = conversation.findIndex(
        (message) => (message._id as string) === ollamaEditTextId
      );

      setConversation((previousMessages) => {
        const newMessages = [...previousMessages];
        newMessages[messageIndex] = {
          ...newMessages[messageIndex],
          text: useOllamaStore.getState().ollamaAfterEditTextCache!,
        };
        return newMessages;
      });
    }
  }, [ollamaEditTextId, ollamaAfterEditTextCache]);

  if (!historyMode) {
    useOllamaFsDetailHeader(
      ollamaConversationHistory[conversationId!]?.name ??
        t("ollama:conversation"),
      undefined,
      [conversationId]
    );
  }

  useMutationLoadingSpinner(chatNoStream, "requestingChatResponse");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{
          height: "100%",
          width: "100%",
        }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        {!historyMode && (
          <OllamaConversationActionPanel
            conversationId={consistentUUID}
            modelDetails={{
              name: forwardedData.name,
              digest: forwardedData.digest,
            }}
            onNewConversationPress={newConversationHandler}
          />
        )}
        <YStack flex={1}>
          <FlashList
            inverted
            data={conversation}
            renderItem={({ item }) => (
              <OllamaConversationMessage
                props={item}
                deleteMessageHandler={deleteMessage}
              />
            )}
            keyboardShouldPersistTaps="handled"
            estimatedItemSize={247}
          />
        </YStack>
        {!historyMode && (
          <OllamaConversationToolBar onSend={onSend} onCancel={cancelRequest} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OllamaConversationDetail;
