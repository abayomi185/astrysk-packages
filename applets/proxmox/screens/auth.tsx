import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Form, Text, Input, YStack, XStack, Spinner } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AppletButtonBanner, showToast } from "@astrysk/components";
import { Applets } from "@astrysk/constants";

import { useProxmoxStore } from "../store";
import { configureAxiosForProxmox } from "../utils";
import { useAppStateStore } from "@astrysk/stores";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useGetVersion } from "../api";
import {
  UrlRegexPattern,
  getIconColor,
  promptUserForURLSchemaIfNotExists,
} from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";

interface Inputs {
  serverURL: string;
  apiKey: string;
  customHeaders?: { key: string; value: string }[];
}

const ProxmoxAuth = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const toast = useToastController();

  const iconColor = getIconColor();

  const {
    control,
    handleSubmit,
    setError,
    register,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [apikey, setApikey] = React.useState<string>();
  const [showApiKey, setShowApiKey] = React.useState(false);

  const auth = useGetVersion({
    query: {
      enabled: !!apikey,
      onSuccess: (_data) => {
        useProxmoxStore.setState({
          authenticated: true,
          token: apikey,
        });
        useAppStateStore.setState({
          activeApplet: Applets.PROXMOX,
        });
        navigation.goBack();
      },
      onError: (error) => {
        useAppStateStore.setState({ activeApplet: undefined });
        // WARN: Show error message or prompt
        if (error.response?.status) {
          showToast(toast, `${t("common:error")}`, {
            message: `${error.response.status}: ${error.code}`,
            type: "error",
          });
          // WARN: Make use of ReactHookForm to show error in fields
          setError("serverURL", {
            type: "manual",
          });
          setError("apiKey", {
            type: "manual",
          });
        }
      },
      onSettled: (data, error) => {
        if (!Array.isArray(data) || error) {
          useProxmoxStore.setState({ baseURL: undefined });
        }
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const serverURL = data.serverURL.replace(/\/$/, "");

    const urlInputFieldName = "serverURL";
    const hasUrlSchema = promptUserForURLSchemaIfNotExists(
      t,
      serverURL,
      urlInputFieldName,
      setValue
    );
    if (!hasUrlSchema) return;

    useProxmoxStore.setState({ baseURL: serverURL });
    configureAxiosForProxmox(serverURL, data.apiKey, undefined, () => {
      setApikey(data.apiKey);
      auth.refetch();
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
    useProxmoxStore.setState({
      customHeaders: Object.assign({}, ...customHeaders),
    });
  }, [customHeaders]);

  return (
    <YStack height="100%">
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <AppletButtonBanner applet={Applets.PROXMOX} />
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
                {t("common:apiKey")}
              </Text>
              <Text color="$red9" marginLeft="$2">
                {errors.apiKey && errors.apiKey.message}
              </Text>
            </XStack>
            <Controller
              name="apiKey"
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
                    borderColor={errors.apiKey ? "$red8" : "$gray6"}
                    placeholder={`${t("common:apiKey")}...`}
                    textContentType="password"
                    secureTextEntry={!showApiKey}
                    onChangeText={onChange}
                    value={value}
                    {...register("apiKey", {
                      required: t("common:required") as string,
                    })}
                  />
                  <Button
                    width="$4"
                    marginLeft="$1.5"
                    borderWidth={2}
                    borderColor="$gray6"
                    padding="$0"
                    backgroundColor={showApiKey ? "$gray8" : "$gray1"}
                    onPress={() => setShowApiKey(!showApiKey)}
                  >
                    <Ionicons
                      name={showApiKey ? "eye" : "eye-off"}
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
              <XStack flex={1} alignItems="center" justifyContent="center">
                <Text>
                  {auth.fetchStatus === "fetching" ? (
                    <Spinner />
                  ) : (
                    t("common:signIn")
                  )}
                </Text>
              </XStack>
            </Button>
          </Form.Trigger>
          <YStack>
            <Button
              theme="dark"
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
                            t(
                              "common:invalidCustomHeader_description"
                            ) as string
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
                theme="dark"
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
      </KeyboardAwareScrollView>
    </YStack>
  );
};

export default ProxmoxAuth;
