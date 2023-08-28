import React from "react";
import {
  ScrollView,
  Button,
  Form,
  Text,
  Input,
  YStack,
  XStack,
  Spinner,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AppletButtonBanner } from "@astrysk/components";
import { Applets } from "@astrysk/constants";

import { useAuthenticateUserByName } from "../api";
import { useJellyfinStore } from "../store";
import { configureAxiosForJellyfin, configureJellyfin } from "../utils";
import { useAppStateStore } from "@astrysk/stores";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { UrlRegexPattern, getIconColor } from "@astrysk/utils";

interface Inputs {
  serverURL: string;
  username: string;
  password: string;
  customHeaders?: { key: string; value: string }[];
}

const JellyfinAuth = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const iconColor = getIconColor();

  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = React.useState(false);

  const auth = useAuthenticateUserByName({
    mutation: {
      onSuccess: (data) => {
        if (typeof data === "object") {
          useJellyfinStore.setState({
            authenticated: true,
            token: data.AccessToken,
            userDetails: data.User,
          });
          useAppStateStore.setState({
            activeApplet: Applets.JELLYFIN,
          });
          navigation.goBack();
        } else {
          Alert.alert(
            `${t("common:error")}`,
            `${t("common:unexpectedResponseFormat_message")}`
          );
        }
      },
      onError: (error) => {
        useAppStateStore.setState({ activeApplet: undefined });
        useJellyfinStore.setState({ baseURL: undefined });
        // WARN: Show error message or prompt
        if (error.response?.status) {
          // error.response.status >= 400 &&
          //   error.response.status < 500 &&
          Alert.alert(
            `${t("common:error")}`,
            `${error.response.status}: ${error.code}`
          );
          // WARN: Make use of ReactHookForm to show error in fields
          setError("serverURL", {
            type: "manual",
          });
          setError("username", {
            type: "manual",
          });
          setError("password", {
            type: "manual",
          });
        }
      },
      onSettled: (data, error) => {
        if (typeof data !== "object" || error) {
          useJellyfinStore.setState({ baseURL: undefined });
        }
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const serverURL = data.serverURL.replace(/\/$/, "");
    // WARN: This implementation for authentication is terrible. Needs a proper rework
    // From this onSubmit to the mutation

    // Essentially setting up axios without token and headers such that it has the
    // correct structure when configureJellyfin is called on each tab
    // The error handling in the case is done within the mutation
    // which is less than ideal
    useJellyfinStore.setState({ baseURL: serverURL });
    configureAxiosForJellyfin(serverURL, undefined, undefined, () => {
      auth.mutate({ data: { Username: data.username, Pw: data.password } });
    });
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
      // keyboardDismissMode="on-drag"
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
          <XStack paddingBottom="$2" marginLeft="$1" alignItems="flex-end">
            <Text color="$color" fontSize={16}>
              {t("common:serverURL")}
            </Text>
            <Text color="$red9" marginLeft="$2">
              {errors.serverURL && errors.serverURL.message}
            </Text>
          </XStack>
          <Controller
            name="serverURL"
            control={control}
            rules={{
              required: true,
              validate: (value) =>
                !!UrlRegexPattern.test(value) ||
                (t("common:invalidURL") as string),
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                size="$4"
                width="100%"
                borderWidth={2}
                borderColor={errors.serverURL ? "$red8" : "$gray6"}
                placeholder={`${t("common:serverURL")}...`}
                onChangeText={onChange}
                value={value}
                {...register("serverURL", {
                  required: t("common:required") as string,
                })}
              />
            )}
          />
        </YStack>
        <YStack>
          <XStack paddingBottom="$2" marginLeft="$1" alignItems="flex-end">
            <Text color="$color" fontSize={16}>
              {t("common:username")}
            </Text>
            <Text color="$red9" marginLeft="$2">
              {errors.username && errors.username.message}
            </Text>
          </XStack>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                size="$4"
                width="100%"
                borderWidth={2}
                borderColor={errors.username ? "$red8" : "$gray6"}
                placeholder={`${t("common:username")}...`}
                onChangeText={onChange}
                value={value}
                {...register("username", {
                  required: t("common:required") as string,
                })}
              />
            )}
          />
        </YStack>
        <YStack>
          <XStack paddingBottom="$2" marginLeft="$1" alignItems="flex-end">
            <Text color="$color" fontSize={16}>
              {t("common:password")}
            </Text>
            <Text color="$red9" marginLeft="$2">
              {errors.password && errors.password.message}
            </Text>
          </XStack>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <XStack width="100%">
                <Input
                  flex={1}
                  size="$4"
                  borderWidth={2}
                  borderColor={errors.password ? "$red8" : "$gray6"}
                  placeholder={`${t("common:password")}...`}
                  textContentType="password"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  value={value}
                  {...register("password", {
                    required: t("common:required") as string,
                  })}
                />
                <Button
                  width="$4"
                  marginLeft="$1.5"
                  borderWidth={2}
                  borderColor="$gray6"
                  padding="$0"
                  backgroundColor={showPassword ? "$gray8" : "$gray1"}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color={iconColor}
                  />
                </Button>
              </XStack>
            )}
          />
        </YStack>
        <Form.Trigger asChild>
          <Button theme="blue" width="100%">
            {auth.status === "loading" ? <Spinner /> : t("common:signIn")}
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
          ListHeaderComponent={<XStack marginLeft="$4" />}
          estimatedItemSize={74}
        />
      </XStack>
    </ScrollView>
  );
};

export default JellyfinAuth;
