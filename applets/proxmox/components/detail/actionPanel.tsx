import React from "react";
import { useRouter, useNavigation } from "expo-router";
import {
  GetClusterResourcesResponseResponseDataItem,
  useCreateNodesSingleLxcSingleStatusReboot,
  useCreateNodesSingleLxcSingleStatusResume,
  useCreateNodesSingleLxcSingleStatusShutdown,
  useCreateNodesSingleLxcSingleStatusStart,
  useCreateNodesSingleLxcSingleStatusStop,
  useCreateNodesSingleLxcSingleStatusSuspend,
  useRebootVM,
  useResumeVM,
  useShutdownVM,
  useStartVM,
  useStopVM,
  useSuspendVM,
} from "../../api";
import { Button, GetProps, XStack, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { getIconColor } from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";
import { showToast } from "@astrysk/components";

export const proxmoxActionButtonColors = {
  monitoring: {
    borderColor: "$red7",
    borderWidth: "$1.5",
  },
  edit: {
    backgroundColor: "$green7",
    borderColor: "$green7",
    borderWidth: "$1",
  },
  automaticSearch: {
    backgroundColor: "$blue7",
    borderColor: "$blue7",
    borderWidth: "$1",
  },
  interactiveSearch: {
    backgroundColor: "$purple7",
    borderColor: "$purple7",
    borderWidth: "$1",
  },
  history: {
    backgroundColor: "$orange7",
    borderColor: "$orange7",
    borderWidth: "$1",
  },
  delete: {
    backgroundColor: "$gray7",
    borderColor: "$gray7",
    borderWidth: "$1",
  },
};

const ProxmoxActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: GetProps<typeof Button>;
  first?: boolean;
  vertical?: boolean;
}> = ({ children, onPress, disabled, style, first, vertical }) => {
  return (
    <Button
      width="auto"
      minWidth="$5"
      marginLeft={first || vertical ? undefined : "$2"}
      marginTop={!first && vertical ? "$3" : undefined}
      padding="$0"
      backgroundColor="$gray1"
      {...style}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

const ProxmoxActionPanel: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ data }) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const router = useRouter();

  const iconColor = getIconColor();

  const [disabledPanelActions, setDisabledPanelActions] = React.useState(false);

  const useMutationOnSuccess = () => {
    showToast(toast, t("proxmox:success:automaticSearchStarted"), {
      type: "done",
    });
  };
  const useMutationOnError = () => {};

  const startVm = useStartVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const stopVm = useStopVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const shutdownVm = useShutdownVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resetVm = useStartVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const suspendVm = useSuspendVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resumeVm = useResumeVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const rebootVm = useRebootVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });

  const startLxc = useCreateNodesSingleLxcSingleStatusStart({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const stopLxc = useCreateNodesSingleLxcSingleStatusStop({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const shutdownLxc = useCreateNodesSingleLxcSingleStatusShutdown({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const suspendLxc = useCreateNodesSingleLxcSingleStatusSuspend({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resumeLxc = useCreateNodesSingleLxcSingleStatusResume({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const rebootLxc = useCreateNodesSingleLxcSingleStatusReboot({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess();
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });

  return (
    <XStack justifyContent="center" marginVertical="$1">
      <XStack flex={1} height="$4" width="100%" justifyContent="center">
        {/* NOTE: START */}
        <ProxmoxActionPanelButton
          first
          onPress={() => {
            (data.status === "stopped" || data.status === "suspended") &&
              startVm.mutate({
                node: data.node!,
                vmid: data.vmid!,
                data: {},
              });
          }}
          disabled={disabledPanelActions}
        >
          <Ionicons name="play" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: SHUTDOWN */}
        <ProxmoxActionPanelButton
          onPress={() => {}}
          disabled={disabledPanelActions}
        >
          <Ionicons name="power" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: REBOOT */}
        <ProxmoxActionPanelButton
          onPress={() => {}}
          disabled={disabledPanelActions}
        >
          <Ionicons name="ios-reload" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: STOP */}
        <ProxmoxActionPanelButton
          onPress={() => {}}
          disabled={disabledPanelActions}
        >
          <Ionicons name="stop" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>
      </XStack>
    </XStack>
  );
};

export default ProxmoxActionPanel;
