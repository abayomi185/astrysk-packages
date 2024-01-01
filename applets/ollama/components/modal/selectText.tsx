import React from "react";
import { useNavigation } from "expo-router";
import { TextInput, KeyboardAvoidingView } from "react-native";
import { YStack, TextArea, Button, Text, XStack } from "tamagui";
import { useOllamaStore } from "../../store";
import { useOllamaModalHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { getIconColor } from "@astrysk/utils";

const OllamaSelectText: React.FC<{ text: string; edit: boolean }> = ({
  text,
  edit,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const textAreaRef = React.useRef<TextInput>(null);
  const changedTextRef = React.useRef<string>(text);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      textAreaRef.current?.focus();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const saveEditedText = () => {
    if (changedTextRef.current !== text) {
      useOllamaStore.setState({
        ollamaAfterEditTextCache: changedTextRef.current,
      });
    }
  };

  const [selectAllToggle, setSelectAllToggle] = React.useState<boolean>(false);

  const handleHeaderRight = () => {
    if (edit) {
      saveEditedText();
      navigation.goBack();
    } else {
      textAreaRef.current?.setNativeProps({
        selection: {
          start: 0,
          end: text.length,
        },
      });
    }
  };

  useOllamaModalHeader(
    navigation,
    edit ? `${t("ollama:editText")}` : `${t("ollama:selectText")}`,
    undefined,
    undefined,
    () => (
      <Button
        width="$4"
        backgroundColor="$transparent"
        padding="$0"
        onPress={handleHeaderRight}
        pressStyle={{
          backgroundColor: "$transparent",
        }}
      >
        {edit ? (
          <Text color="$blue10" fontSize="$7">
            {t("ollama:save")}
          </Text>
        ) : (
          <XStack flex={1} justifyContent="center">
            <Ionicons name="scan" size={24} color={getIconColor()} />
          </XStack>
        )}
      </Button>
    )
  );

  return (
    <KeyboardAvoidingView
      style={{
        height: "100%",
        width: "100%",
      }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <YStack flex={1} backgroundColor="$background">
        <TextArea
          ref={textAreaRef}
          flex={1}
          editable={edit}
          multiline
          selectTextOnFocus
          paddingBottom="$15"
          borderWidth="$0"
          borderTopLeftRadius="$0"
          borderTopRightRadius="$0"
          borderBottomLeftRadius="$0"
          borderBottomRightRadius="$0"
          onChangeText={(changedText) => {
            changedTextRef.current = changedText;
          }}
        >
          {text}
        </TextArea>
      </YStack>
    </KeyboardAvoidingView>
  );
};

export default OllamaSelectText;
