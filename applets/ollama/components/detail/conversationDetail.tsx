import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { H3, Input, Text, TextArea, XStack, YStack, useTheme } from "tamagui";
import { useOllamaDetailHeader, useOllamaFsDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { TFunction } from "i18next";
import { SettingsOption } from "@astrysk/components";
import { Ionicons } from "@expo/vector-icons";
import ContextMenu from "react-native-context-menu-view";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Composer,
  ComposerProps,
  Send,
  SendProps,
  MessageProps,
} from "react-native-gifted-chat";
import { getIconColor, useColorScheme } from "@astrysk/utils";
import { useOllamaStore } from "../../store";
import {
  ExtendedListLocalModels200ModelsItem,
  OllamaConversation,
} from "../../types";
import OllamaConversationActionPanel from "./actionPanel";
import { useChatWithEventSource } from "../../api/event";

const OllamaConversationSendButton = () => {
  return (
    <XStack
      width="$4"
      height="100%"
      alignItems="center"
      justifyContent="center"
      marginRight="$0.5"
      paddingVertical="$1"
      pointerEvents="box-none"
    >
      <Ionicons name="arrow-up-circle" size={28} color={getIconColor()} />
    </XStack>
  );
};

const OllamaConversationSend: React.FC<SendProps<IMessage>> = (props) => {
  return (
    <Send {...props}>
      <OllamaConversationSendButton />
    </Send>
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

const OllamaConversationMessage: React.FC<MessageProps<OllamaConversation>> = (
  props
) => {
  const { t } = useTranslation();
  const userId = props.currentMessage?.user._id as string;
  const userName = props.currentMessage?.user.name;

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
      ]}
      // dropdownMenuMode
      onPress={(event) => {
        const { indexPath } = event.nativeEvent;
        if (indexPath[0] === 0)
          switch (indexPath[1]) {
            case 0:
              break;
          }
      }}
    >
      <XStack
        paddingHorizontal="$2"
        paddingTop="$1"
        paddingBottom="$3"
        backgroundColor={userId === "ollama_user" ? "$background" : undefined}
      >
        <OllamaConversationMessageIcon userId={userId} />
        <YStack flex={1}>
          <YStack flex={1}>
            <XStack height="$3" alignItems="center">
              <Text fontWeight="700">{userName}</Text>
            </XStack>
            <Text>{props.currentMessage?.text}</Text>
          </YStack>
        </YStack>
      </XStack>
    </ContextMenu>
  );
};

const OllamaConversationComposer: React.FC<ComposerProps> = (props) => {
  const colorScheme = useColorScheme();

  const textColor = React.useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const accentColor = useTheme().gray6.get();

  return (
    <Composer
      {...props}
      textInputStyle={{
        ...(props.textInputStyle as object),
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        color: textColor,
        minHeight: 35,
        borderLeftWidth: 1.5,
        borderLeftColor: accentColor,
        borderRightWidth: 1.5,
        borderRightColor: accentColor,
        borderTopWidth: 1.5,
        borderTopColor: accentColor,
        borderBottomWidth: 1.5,
        borderBottomColor: accentColor,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    />
  );
};

const OllamaConversationInputToolbar: React.FC<InputToolbarProps<IMessage>> = (
  props
) => {
  const backgroundColor = useTheme().backgroundTransparent.get();

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        ...(props.containerStyle as object),
        backgroundColor: backgroundColor,
        borderTopWidth: 0,
      }}
      renderComposer={(props) => <OllamaConversationComposer {...props} />}
      renderSend={(props) => <OllamaConversationSend {...props} />}
    />
  );
};

const OllamaConversationDetail: React.FC<{
  forwardedData: ExtendedListLocalModels200ModelsItem; // WARN: Change to specific type
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const baseUrl = useOllamaStore.getState().baseURL;

  // const actionPanelCallback = (action?: string) => {
  //   resource.refetch();
  // };

  const [conversation, setConversation] = React.useState<OllamaConversation[]>([
    {
      _id: "2",
      text: "Hello this is a long message",
      createdAt: new Date(new Date().getTime() + 100000),
      user: { _id: "ollama_user", name: "Ollama" },
    },
    {
      _id: "1",
      text: "Hello",
      createdAt: new Date(),
      user: { _id: "active_user", name: "You" },
    },
  ]);

  const onSend = React.useCallback((messages: OllamaConversation[] = []) => {
    setConversation((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    requestChatStream(); // Temporary
  }, []);

  const chatStream = useChatWithEventSource(
    {
      baseUrl: baseUrl!,
    },
    {
      onSuccess: (data) => {
        console.log("Stream finished", data);
      },
      onError: (error) => {
        console.log("Stream error", error);
      },
    }
  );

  const requestChatStream = () => {
    chatStream.mutation.mutate({
      model: forwardedData.name,
      messages: [
        { content: "Hello, write a hello world program in Go", role: "user" },
      ],
    });
  };

  useOllamaFsDetailHeader(navigation, t("ollama:conversation"));

  return (
    <SafeAreaView>
      <YStack height="100%" width="100%">
        <OllamaConversationActionPanel data={[]} />
        <GiftedChat
          messages={conversation}
          onSend={(messages) => onSend(messages)}
          bottomOffset={33}
          alwaysShowSend
          renderMessage={(props) => <OllamaConversationMessage {...props} />}
          // Most modifications live in inputToolbar
          renderInputToolbar={(props) => (
            <OllamaConversationInputToolbar {...props} />
          )}
          minInputToolbarHeight={50}
          alignTop={false}
          listViewProps={{
            contentContainerStyle: { flexGrow: 1, justifyContent: "flex-end" },
          }}
          user={{
            _id: "active_user",
            name: "You",
          }}
        />
      </YStack>
    </SafeAreaView>
  );
};

export default OllamaConversationDetail;
