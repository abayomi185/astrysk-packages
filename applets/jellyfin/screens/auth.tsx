import React from "react";
import { ScrollView, Button, Form, Text, Input, YStack, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AppletButtonBanner } from "@astrysk/components";
import { Applets } from "@astrysk/constants";

import { useAuthenticateUserByName } from "../api";
import { useJellyfinStore } from "../store";
import { configureJellyfin } from "../utils";
import { useAppStateStore } from "@astrysk/stores";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";

interface Inputs {
  serverURL: string;
  username: string;
  password: string;
  customHeaders?: { key: string; value: string }[];
}

const JellyfinAuth = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const auth = useAuthenticateUserByName({
    mutation: {
      onSuccess: (data) => {
        useJellyfinStore.setState({
          token: data.AccessToken,
          userDetails: data.User,
        });
        useAppStateStore.setState({ activeApplet: Applets.JELLYFIN });
        navigation.goBack();
      },
      onError: (error) => {
        useAppStateStore.setState({ activeApplet: undefined });
        // WARN: Show error message or prompt
        if (error.response?.status) {
          error.response.status >= 400 &&
            error.response.status < 500 &&
            Alert.alert(
              `${t("common:error")}`,
              `${error.response.status}: ${error.code}`
            );
          // WARN: Make use of ReactHookForm to show error in fields
          setError("root.serverError", {
            type: error.response.status.toString(),
          });
        }
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    useJellyfinStore.setState({ baseURL: data.serverURL });
    if (configureJellyfin())
      auth.mutate({ data: { Username: data.username, Pw: data.password } });
  };

  const [customHeaders, setCustomHeaders] = React.useState<
    {
      [key: string]: string;
    }[]
  >([]);

  const validateCustomHeader = (value: string) => {
    return value.length > 0 && value.includes(":");
  };

  React.useEffect(() => {
    useJellyfinStore.setState({
      customHeaders: Object.assign({}, ...customHeaders),
    });
  }, [customHeaders]);

  return (
    <ScrollView
      height="100%"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={true}
    >
      <AppletButtonBanner applet={Applets.JELLYFIN} />
      <Form
        space
        width="100%"
        paddingHorizontal="$4"
        paddingVertical="$4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <YStack>
          <Text color="$color" fontSize={16} paddingBottom="$2" marginLeft="$1">
            {t("common:serverURL")}
          </Text>
          <Controller
            name="serverURL"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="$4"
                width="100%"
                borderWidth={2}
                borderColor="$gray6"
                placeholder={`${t("common:serverURL")}...`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </YStack>
        <YStack>
          <Text color="$color" fontSize={16} paddingBottom="$2" marginLeft="$1">
            {t("common:username")}
          </Text>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="$4"
                width="100%"
                borderWidth={2}
                borderColor="$gray6"
                placeholder={`${t("common:username")}...`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </YStack>
        <YStack>
          <Text color="$color" fontSize={16} paddingBottom="$2" marginLeft="$1">
            {t("common:password")}
          </Text>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="$4"
                width="100%"
                borderWidth={2}
                borderColor="$gray6"
                placeholder={`${t("common:password")}...`}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </YStack>
        <Form.Trigger asChild>
          <Button theme="blue" width="100%">
            {t("common:signIn")}
          </Button>
        </Form.Trigger>
        <YStack>
          <Button
            theme="dark_gray"
            backgroundColor="$gray6"
            onPress={() => {
              Alert.prompt(
                t("common:addCustomHeader"),
                t("common:addCustomHeader_description") as string,
                [
                  { text: t("common:cancel") as string, onPress: () => {} },
                  {
                    text: t("common:add") as string,
                    onPress: (value) => {
                      if (value && validateCustomHeader(value))
                        setCustomHeaders([
                          ...customHeaders,
                          {
                            [value.split(":", 1)[0]]: value
                              .split(":")
                              .slice(1)
                              .join(":"),
                          },
                        ]);
                      else
                        Alert.alert(
                          t("common:invalidCustomHeader"),
                          t("common:invalidCustomHeader_description") as string
                        );
                    },
                  },
                ],
                "plain-text"
              );
            }}
          >
            {t("common:addCustomHeaders")}
          </Button>
        </YStack>
      </Form>
      <XStack width="100%" height="$4">
        <FlashList
          horizontal
          data={customHeaders}
          renderItem={({ item, index }) => (
            <Button
              theme="dark_gray"
              backgroundColor="$gray6"
              width="$10"
              height="$2"
              marginRight="$2"
              justifyContent="space-between"
              paddingHorizontal="$3"
              alignItems="center"
              borderRadius="$6"
              onPress={() => {
                setCustomHeaders(
                  customHeaders.filter((_, idx) => idx !== index)
                );
              }}
            >
              <Text width="75%" ellipsizeMode="tail" numberOfLines={1}>
                {Object.keys(item)[0]}
              </Text>
              <Ionicons name="close" size={16} color="red" />
            </Button>
          )}
          ListHeaderComponent={() => <XStack marginLeft="$4" />}
          estimatedItemSize={74}
        />
      </XStack>
    </ScrollView>
  );
};

export default JellyfinAuth;
