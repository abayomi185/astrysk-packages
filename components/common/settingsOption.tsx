import React from "react";
import {
  YStack,
  XStack,
  Button,
  H6,
  Text,
  SizeTokens,
  GetProps,
} from "tamagui";
import { FilterOrder, SettingsOptionProps } from "@astrysk/types";
import {
  CircleDot,
  Check,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "@tamagui/lucide-icons";
import { TFunction } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useColorScheme } from "react-native";

export const SettingsOptionHeader: React.FC<{
  t: TFunction;
  headerTitle: string;
  style?: GetProps<typeof XStack>;
  size?: SizeTokens;
}> = ({ t, headerTitle, style, size }) => {
  return (
    <XStack
      flex={1}
      marginTop="$5"
      paddingVertical="$2"
      paddingHorizontal="$4"
      {...style}
    >
      <Text color="$color" marginVertical="$1" fontSize={size ?? "$8"}>
        {t(headerTitle)}
      </Text>
    </XStack>
  );
};

export const SettingsOption: React.FC<{
  t: TFunction;
  item: SettingsOptionProps;
  alignCenter?: boolean;
  style?: GetProps<typeof Button>;
}> = ({ t, item, alignCenter, style }) => {
  const colorScheme = useColorScheme();

  if (item.type === "label") {
    return (
      <Button
        flex={1}
        minHeight="$5"
        height="auto"
        paddingVertical="$2"
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="flex-start"
        borderWidth="$0"
        borderTopWidth="$0"
        borderBottomWidth={item.lastItem ? "$0" : "$0.25"}
        borderBottomColor="$gray6"
        borderRadius="$0"
        theme="dark_gray"
        backgroundColor="$gray1"
        borderTopLeftRadius={item.firstItem ? "$5" : "$0"}
        borderTopRightRadius={item.firstItem ? "$5" : "$0"}
        borderBottomLeftRadius={item.lastItem ? "$5" : "$0"}
        borderBottomRightRadius={item.lastItem ? "$5" : "$0"}
        {...style}
        onPress={item.onPress}
      >
        <XStack flex={1} justifyContent="space-between">
          <XStack
            flex={alignCenter ? 1 : undefined}
            alignItems="center"
            justifyContent={alignCenter ? "flex-end" : undefined}
          >
            {item.icon && (
              <XStack
                width="$2"
                marginRight="$2.5"
                alignItems="center"
                justifyContent="center"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size={item.iconSize ?? 24}
                  color={colorScheme === "dark" ? "#f0f0f0" : "#292929"}
                />
              </XStack>
            )}
            <H6 color="$color">{t(`${item.name ?? item.key}`)}</H6>
          </XStack>
          <YStack
            flex={alignCenter ? undefined : 1}
            width={alignCenter ? "60%" : undefined}
            // backgroundColor="red"
            marginLeft="$3"
            flexWrap="wrap"
            justifyContent="center"
          >
            {item.value && Array.isArray(item.value) ? (
              item.value.map((line, index) => (
                <XStack
                  key={index}
                  flex={1}
                  minHeight="$1"
                  height="auto"
                  justifyContent={alignCenter ? undefined : "flex-end"}
                >
                  <Text
                    marginVertical="$1.5"
                    color="$gray11"
                    textAlign={alignCenter ? "left" : "right"}
                  >
                    {line}
                  </Text>
                </XStack>
              ))
            ) : (
              <XStack justifyContent={alignCenter ? undefined : "flex-end"}>
                <Text color="$gray11">{item.value}</Text>
              </XStack>
            )}
          </YStack>
        </XStack>
      </Button>
    );
  }

  if (item.type === "item") {
    const active =
      item.selectedValue === item.key || item.selectedValue === null;
    const order = item.selectedValueOrder;
    return (
      <Button
        flex={1}
        height="$5"
        paddingVertical="$2"
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="flex-start"
        borderWidth="$0"
        borderTopWidth="$0"
        borderBottomWidth={item.lastItem ? "$0" : "$0.25"}
        borderBottomColor="$gray6"
        borderRadius="$0"
        theme="dark_gray"
        backgroundColor={active ? "$gray5" : "$gray1"}
        borderBottomLeftRadius={item.lastItem ? "$5" : "$0"}
        borderBottomRightRadius={item.lastItem ? "$5" : "$0"}
        {...style}
        onPress={item.onPress}
      >
        <XStack flex={1} justifyContent="space-between">
          <XStack alignItems="center">
            <H6 color="$color">{item.name ?? t(`${item.key}`)}</H6>
          </XStack>
          <XStack alignItems="center">
            {active ? (
              // Supports order by
              item.supportsOrderBy ? (
                // Order is set
                order ? (
                  order === FilterOrder.ASCENDING ? (
                    // Ascending
                    <ArrowUp size={20} opacity={0.6} />
                  ) : (
                    // Descending
                    <ArrowDown size={20} opacity={0.6} />
                  )
                ) : (
                  <CircleDot size={20} opacity={0.6} />
                )
              ) : (
                // Active - check mark
                <Check size={20} opacity={0.6} />
              )
            ) : (
              <CircleDot size={20} opacity={0.6} />
            )}
          </XStack>
        </XStack>
      </Button>
    );
  }

  if (item.type === "action") {
    return (
      <Button
        flex={1}
        height="$5"
        paddingVertical="$2"
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="flex-start"
        borderWidth="$0"
        borderTopWidth="$0"
        borderBottomWidth={item.lastItem ? "$0" : "$0.25"}
        borderBottomColor="$gray6"
        borderRadius="$0"
        // theme="gray"
        theme="dark_gray"
        backgroundColor="$gray1"
        {...style}
        onPress={item.onPress}
      >
        <XStack flex={1} justifyContent="space-between">
          <XStack alignItems="center">
            {item.icon && (
              <XStack
                width="$2"
                marginRight="$2.5"
                alignItems="center"
                justifyContent="center"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size={item.iconSize ?? 24}
                  color={colorScheme === "dark" ? "#f0f0f0" : "#292929"}
                />
              </XStack>
            )}
            <H6 color="$color">{item.name ?? t(`${item.key}`)}</H6>
          </XStack>
          <XStack alignItems="center">
            {item.selectionHint && (
              <H6 color="$gray11" marginRight="$2">
                {item.selectionHint}
              </H6>
            )}
            <ChevronRight size={20} opacity={0.6} />
          </XStack>
        </XStack>
      </Button>
    );
  }

  return null;
};
