import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextArea, XStack, YStack, Text, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "@astrysk/components";
import { useOllamaModalHeader } from "../useHeader";
import { useOllamaStore } from "../../store";
import { getIconColor, isValidJSON } from "@astrysk/utils";

const OllamaAdvancedOptionsView: React.FC<{
  filterType: string;
}> = ({ filterType }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const conversationId =
    useOllamaStore
      .getState()
      .filterBarOptions?.Conversation?.find((data) => data.id === filterType)
      ?.conversationId ?? "";

  const template = React.useRef<string>(
    useOllamaStore.getState().ollamaConversationHistory?.[conversationId]
      ?.advancedOptions?.template ?? ""
  );

  const options = React.useRef<string>(
    JSON.stringify(
      useOllamaStore.getState().ollamaConversationHistory?.[conversationId]
        ?.advancedOptions?.options ?? {}
    )
  );

  const [isTemplateEmpty, setIsTemplateEmpty] = React.useState<boolean>(true);

  const saveOptions = (template: string, options: string): boolean => {
    const optionsWithGuard = options || "{}";

    if (isValidJSON(optionsWithGuard)) {
      useOllamaStore.setState((state) => ({
        ollamaConversationHistory: {
          ...state.ollamaConversationHistory,
          [conversationId]: {
            ...state.ollamaConversationHistory?.[conversationId]!,
            advancedOptions: {
              template,
              options: JSON.parse(optionsWithGuard),
            },
          },
        },
      }));
      return true;
    }

    Alert.alert(
      t("ollama:invalidOptionsJson"),
      t("ollama:pleaseCheckTheJsonString") as string,
      [],
      {}
    );
    return false;
  };

  const handleHeaderRight = () => {
    const valid = saveOptions(template.current, options.current);
    if (valid) navigation.goBack();
  };

  useOllamaModalHeader(
    navigation,
    t("ollama:options"),
    undefined,
    undefined,
    () => (
      <Button
        minWidth="$4"
        backgroundColor="$transparent"
        padding="$0"
        onPress={handleHeaderRight}
        pressStyle={{
          backgroundColor: "$transparent",
        }}
      >
        {
          <XStack flex={1} justifyContent="center">
            <Ionicons name="save-outline" size={24} color={getIconColor()} />
          </XStack>
        }
      </Button>
    )
  );

  return (
    <YStack height="100%">
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <YStack marginHorizontal="$2" marginVertical="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <SectionTitle>{t("ollama:template")}</SectionTitle>
            <Text color="$red9" marginRight="$3">
              {isTemplateEmpty ? null : t("ollama:templateNotEmpty")}
            </Text>
          </XStack>
          <XStack height="$7" marginHorizontal="$2.5">
            <TextArea
              editable
              width="100%"
              height="100%"
              multiline
              selectTextOnFocus
              paddingBottom="$15"
              borderWidth="$0"
              onChangeText={(changedText) => {
                if (changedText.length === 0) setIsTemplateEmpty(true);
                if (changedText.length > 0) setIsTemplateEmpty(false);
                template.current = changedText;
              }}
            >
              {template.current}
            </TextArea>
          </XStack>
          <YStack marginTop="$12">
            <SectionTitle>{t("ollama:options")}</SectionTitle>
          </YStack>
          <XStack height="$7" marginHorizontal="$2.5" paddingBottom="$20">
            <TextArea
              flex={1}
              editable
              multiline
              selectTextOnFocus
              paddingBottom="$15"
              borderWidth="$0"
              onChangeText={(changedText) => {
                options.current = changedText;
              }}
            >
              {options.current}
            </TextArea>
          </XStack>
        </YStack>
      </KeyboardAwareScrollView>
    </YStack>
  );
};

export default OllamaAdvancedOptionsView;
