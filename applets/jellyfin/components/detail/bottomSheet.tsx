import React, { Dispatch } from "react";
import * as ISO639 from "iso-language-codes";
import { useLocalSearchParams } from "expo-router";
import { YStack, Text, H3, Button, XStack } from "tamagui";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {
  BottomSheetBackground,
  SettingsOption,
  SettingsOptionHeader,
} from "@astrysk/components";
import {
  JellyfinMediaItemSettingsProps,
  JellyfinMediaItemSettingsType,
} from "../../types";
import { useTranslation } from "react-i18next";
import { SettingsOptionProps } from "@astrysk/types";
import { useJellyfinStore } from "../../store";

interface JellyfinBottomSheetProps {
  id: string;
  data: { [key: string]: string[] };
  bottomSheetIndex: number;
  setBottomSheetIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const JellyfinLanguageBottomSheet: React.FC<
  JellyfinBottomSheetProps
> = ({ id, data, bottomSheetIndex, setBottomSheetIndex }) => {
  const { t } = useTranslation();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ["50%"], []);

  const params = useLocalSearchParams() as JellyfinMediaItemSettingsProps;

  const selectedLanguage =
    params.settingsOptionType &&
    useJellyfinStore.getState().mediaItemSettings?.[id]?.[
      params.settingsOptionType
    ];

  const options: (string | SettingsOptionProps)[] = params.settingsOptionType
    ? data[params.settingsOptionType].map((item, index) => {
        return {
          key: item,
          name: ISO639.by639_2B[item]?.name ?? item,
          type: "item",
          selectedValue: selectedLanguage,
          onPress: () => {
            useJellyfinStore.setState((state) => ({
              mediaItemSettings: {
                ...state.mediaItemSettings,
                [id]: {
                  ...state?.mediaItemSettings?.[id],
                  [params.settingsOptionType as JellyfinMediaItemSettingsType]:
                    item,
                },
              },
            }));
            bottomSheetRef.current?.close();
          },
          lastItem: index === data?.[params.settingsOptionType!].length - 1,
        };
      })
    : [];

  // Add Default option
  params.settingsOptionType &&
    options.unshift({
      key: "common:default",
      type: "item",
      selectedValue: selectedLanguage ?? null,
      onPress: () => {
        useJellyfinStore.setState((state) => ({
          mediaItemSettings: {
            ...state.mediaItemSettings,
            [id]: {
              ...state?.mediaItemSettings?.[id],
              [params.settingsOptionType as JellyfinMediaItemSettingsType]:
                undefined,
            },
          },
        }));
        bottomSheetRef.current?.close();
      },
    });

  // Add header title
  params.settingsOptionType &&
    options.unshift(
      `${t("common:choose")} ${params.settingsOptionType as string}`
    );

  const renderBottomSheetBackdrop = React.useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.2}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex}
      snapPoints={snapPoints}
      backdropComponent={renderBottomSheetBackdrop}
      backgroundComponent={BottomSheetBackground}
      enablePanDownToClose
      onClose={() => {
        setBottomSheetIndex(-1);
      }}
    >
      <BottomSheetFlatList
        data={options}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            return (
              <SettingsOptionHeader
                t={t}
                headerTitle={item as string}
                style={{
                  marginTop: "$2",
                  paddingHorizontal: "$3.5",
                }}
              />
            );
          } else {
            return <SettingsOption t={t} item={item} />;
          }
        }}
        ListFooterComponent={() => <XStack height="$3" />}
      />
    </BottomSheet>
  );
};
