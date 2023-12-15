import React from "react";
import { useNavigation } from "expo-router";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { H3, Text, XStack, YStack } from "tamagui";
import { useOllamaDetailHeader, useProxmoxDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { TFunction } from "i18next";
import { SettingsOption } from "@astrysk/components";

// const getProxmoxResourceDetailOptions = (
//   t: TFunction,
//   resourceData: GetClusterResourcesResponseResponseDataItem
// ): SettingsOptionProps[] => {
//   return [
//     ...(resourceData?.type === "qemu" || resourceData?.type === "lxc"
//       ? ([
//           {
//             key: "proxmox:status",
//             type: "label",
//             value: t(`proxmox:${resourceData?.status}`),
//             context: ProxmoxListContext.Options,
//             firstItem: true,
//           },
//           {
//             key: "proxmox:uptime",
//             type: "label",
//             value: `${convertSecondsToDays(
//               getNumberValue(resourceData?.uptime)
//             )} ${t("proxmox:days")} ${convertSecondsToReadable(
//               getNumberValue(resourceData?.uptime)
//             )}`,
//             context: ProxmoxListContext.Options,
//           },
//           {
//             key: "proxmox:maxcpu",
//             type: "label",
//             value: `${resourceData?.maxcpu}`,
//             context: ProxmoxListContext.Options,
//           },
//           {
//             key: "proxmox:maxmemory",
//             type: "label",
//             value: `${convertBytesToGB(resourceData?.maxmem as number)} ${t(
//               "proxmox:gb"
//             )}`,
//             context: ProxmoxListContext.Options,
//             lastItem: true,
//           },
//         ] as SettingsOptionProps[])
//       : []),
//     ...(resourceData?.type === "storage"
//       ? [
//           {
//             key: "proxmox:status",
//             type: "label",
//             value: t(`proxmox:${resourceData?.status}`),
//             context: ProxmoxListContext.Options,
//             firstItem: true,
//           },
//           {
//             key: "proxmox:content",
//             type: "label",
//             value: `${resourceData?.content}`,
//             context: ProxmoxListContext.Options,
//           },
//           {
//             key: "proxmox:filesystem",
//             type: "label",
//             value: `${resourceData?.plugintype}`,
//             context: ProxmoxListContext.Options,
//             lastItem: true,
//           },
//         ]
//       : []),
//   ] as SettingsOptionProps[];
// };

const OllamaConversationDetail: React.FC<{
  forwardedData: any; // WARN: Change to specific type
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  // const actionPanelCallback = (action?: string) => {
  //   resource.refetch();
  // };

  useOllamaDetailHeader(navigation, t("ollama:conversation"));

  return (
    <YStack flex={1}>
      <FlashList
        data={[]}
        renderItem={({ item }) => <></>}
        estimatedItemSize={185}
        ListHeaderComponent={<></>}
        ListFooterComponent={<XStack height="$5" />}
      />
    </YStack>
  );
};

export default OllamaConversationDetail;
