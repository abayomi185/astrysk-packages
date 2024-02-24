import React from "react";
import { Suspense } from "react";
import {
  GetClusterTasksResponseResponseDataItem,
  useGetClusterTasks,
  useStopNodeTask,
} from "../../api";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { XStack, YStack, Text, ColorTokens, Button, H6 } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useToastController } from "@tamagui/toast";
import { TFunction } from "i18next";
import {
  EmptyList,
  useMutationOnErrorToast,
  useMutationOnSuccessToast,
} from "@astrysk/components";
import { proxmoxColors } from "../../colors";
import { expandableItemAnimationHandler, getIconColor } from "@astrysk/utils";
import { ProxmoxActionPanelButton } from "../detail/actionPanel";

export const ProxmoxTaskHistoryItem: React.FC<{
  t: TFunction;
  data: GetClusterTasksResponseResponseDataItem;
  pressHandler: () => void;
  actionHandler: () => void;
}> = ({ t, data, pressHandler, actionHandler }) => {
  const getTextColor = (status: string): ColorTokens => {
    switch (status) {
      case "OK":
        return "$green9";
      default:
        return "$red9";
    }
  };

  const taskIsActive = data.endtime === undefined;

  const iconColor = getIconColor();

  const [expanded, setExpanded] = React.useState(false);

  return (
    <Button
      height="auto"
      marginVertical="$1.5"
      paddingTop="$2"
      paddingBottom="$2.5"
      paddingHorizontal="$2.5"
      backgroundColor="$gray1"
      onPress={() => {
        pressHandler();
        // setExpanded(!expanded);
      }}
      overflow="hidden"
    >
      <XStack>
        <YStack flex={1} marginTop="$1.5">
          <XStack>
            <H6 numberOfLines={expanded ? undefined : 1}>
              {t(`proxmox:${data.type}`)}
              {" • "}
            </H6>
            <H6>
              {data.user}
              {" • "}
            </H6>
            <H6 color={getTextColor(data?.status!)}>{data.status}</H6>
          </XStack>
          <YStack flex={1} overflow="hidden">
            <Text color="$gray11" marginTop="$2" numberOfLines={1}>
              {`${t("proxmox:startTime")}: `}
              {data.starttime
                ? new Date(data.starttime! * 1000).toLocaleString()
                : "N/A"}
            </Text>
            <Text color="$gray11" marginTop="$2" numberOfLines={1}>
              {`${t("proxmox:endTime")}: `}{" "}
              {data.endtime
                ? new Date(data.endtime! * 1000).toLocaleString()
                : "N/A"}
            </Text>
            <Text color="$gray11" marginTop="$2" numberOfLines={1}>
              {`${t("proxmox:duration")}: `}{" "}
              {data.starttime && data.endtime
                ? new Date(data.endtime! * 1000).getSeconds() -
                  new Date(data.starttime! * 1000).getSeconds()
                : "N/A"}{" "}
              {t("proxmox:seconds")}
            </Text>
          </YStack>
        </YStack>
        <XStack
          width="$5"
          marginLeft="$1.5"
          justifyContent="center"
          alignItems="center"
        >
          {taskIsActive ? (
            <ProxmoxActionPanelButton first vertical onPress={actionHandler}>
              <Ionicons name="stop" size={23} color={iconColor} />
            </ProxmoxActionPanelButton>
          ) : null}
        </XStack>
      </XStack>
    </Button>
  );
};

const ProxmoxTaskHistory: React.FC<{
  node: string;
  resource: string;
}> = ({ node, resource }) => {
  const { t } = useTranslation();
  const toast = useToastController();

  const flashListRef =
    React.useRef<FlashList<GetClusterTasksResponseResponseDataItem>>(null);

  const [_resourceType, resourceId] = resource.split("/") as [string, string];

  const clusterTasks = useGetClusterTasks({
    query: {
      select: (response) =>
        response.data?.filter(
          (task) => task.node === node && task.id === resourceId
        ),
      onSuccess: (_data) => {},
    },
  });

  const stopNodeTask = useStopNodeTask({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccessToast(toast, t("proxmox:success:taskStopped"));
        clusterTasks.refetch();
      },
      onError: () => {
        useMutationOnErrorToast(toast, t("proxmox:error:actionFailed"));
      },
    },
  });

  const stopTask = (node: string, upid: string) => {
    stopNodeTask.mutate({ node, upid });
  };

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1} marginTop="$1">
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: 12,
            }}
            data={clusterTasks.data}
            renderItem={({
              item,
            }: {
              item: GetClusterTasksResponseResponseDataItem;
            }) => (
              <ProxmoxTaskHistoryItem
                t={t}
                data={item}
                pressHandler={() =>
                  expandableItemAnimationHandler<GetClusterTasksResponseResponseDataItem>(
                    flashListRef
                  )
                }
                actionHandler={() => stopTask(item.node!, item.upid!)}
              />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={
              <EmptyList
                queryStatus={clusterTasks.status}
                text={t("proxmox:noRecentTaskHistoryFound")}
                accentColor={proxmoxColors.accentColor}
              />
            }
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default ProxmoxTaskHistory;
