import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
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
import { Button, GetProps, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { getIconColor } from "@astrysk/utils";
import { useToastController } from "@tamagui/toast";
import { showToast } from "@astrysk/components";
import { TFunction } from "i18next";
import { goToProxmoxModalScreen } from "../../utils";
import { ProxmoxDetailScreenContext } from "../../types";

const START_ACTION = "start";
const SHUTDOWN_ACTION = "shutdown";
const SUSPEND_ACTION = "suspend";
const RESUME_ACTION = "resume";
const REBOOT_ACTION = "reboot";
const RESET_ACTION = "reset";
const STOP_ACTION = "stop";
const TASK_HISTORY_ACTION = "taskHistory";

export const getProxmoxActionButtonColor = (
  button: string,
  condition: boolean
) => {
  if (condition) {
    switch (button) {
      case START_ACTION:
        return "$green7";
      case SHUTDOWN_ACTION:
        return "$red7";
      case SUSPEND_ACTION:
        return "$orange7";
      case RESUME_ACTION:
        return "$green7";
      case REBOOT_ACTION:
        return "$blue7";
      case RESET_ACTION:
        return "$blue7";
      case STOP_ACTION:
        return "$red7";
      case TASK_HISTORY_ACTION:
        return "$purple7";
    }
  }
  return "$gray1";
};

const createProxmoxActionAlert = (
  t: TFunction,
  title: string,
  message: string,
  onPress: () => void
) => {
  return Alert.alert(
    title,
    message,
    [
      {
        text: `${t("common:cancel")}`,
        style: "default",
      },
      {
        text: `${t("common:ok")}`,
        onPress: onPress,
        style: "destructive",
      },
    ],
    {}
  );
};

const getProxmoxActionAlertMessage = (id: string, name: string) =>
  `${id} • ${name}`;

export const ProxmoxActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: GetProps<typeof Button>;
  first?: boolean;
  vertical?: boolean;
}> = ({ children, onPress, onLongPress, disabled, style, first, vertical }) => {
  return (
    <Button
      width="auto"
      minWidth="$5"
      marginLeft={first || vertical ? undefined : "$2"}
      marginTop={!first && vertical ? "$3" : undefined}
      padding="$0"
      backgroundColor="$gray1"
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      // opacity={disabled ? 0.5 : 1}
      {...style}
    >
      {children}
    </Button>
  );
};

const ProxmoxActionPanel: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem;
  callback?: (action?: string) => void;
}> = ({ data, callback }) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const router = useRouter();

  const iconColor = getIconColor();

  const useMutationOnSuccess = (
    toastMessage: string = t("proxmox:success:actionComplete") as string
  ) => {
    showToast(toast, toastMessage, {
      type: "done",
    });
    callback && callback();
  };
  const useMutationOnError = (
    toastMessage: string = t("proxmox:error:actionFailed") as string
  ) => {
    showToast(toast, toastMessage, {
      type: "error",
    });
    callback && callback();
  };

  const startVm = useStartVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmStarted") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const stopVm = useStopVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmStopped") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const shutdownVm = useShutdownVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmShutdown") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resetVm = useStartVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmReset") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const suspendVm = useSuspendVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmSuspended") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resumeVm = useResumeVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmResumed") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const rebootVm = useRebootVM({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:vmRebooted") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });

  const startLxc = useCreateNodesSingleLxcSingleStatusStart({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcStarted") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const stopLxc = useCreateNodesSingleLxcSingleStatusStop({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcStopped") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const shutdownLxc = useCreateNodesSingleLxcSingleStatusShutdown({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcShutdown") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const suspendLxc = useCreateNodesSingleLxcSingleStatusSuspend({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcSuspended") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const resumeLxc = useCreateNodesSingleLxcSingleStatusResume({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcResumed") as string);
      },
      onError: () => {
        useMutationOnError();
      },
    },
  });
  const rebootLxc = useCreateNodesSingleLxcSingleStatusReboot({
    mutation: {
      onSuccess: () => {
        useMutationOnSuccess(t("proxmox:success:lxcRebooted") as string);
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
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              START_ACTION,
              data.status === "stopped" || data.status === "suspended"
            ),
            disabled: !(
              data.status === "stopped" || data.status === "suspended"
            ),
          }}
          onPress={() => {
            if (data.status === "stopped") {
              if (data.type === "qemu") {
                startVm.mutate({
                  node: data.node!,
                  vmid: data.vmid!,
                  data: {},
                });
              }
              if (data.type === "lxc") {
                startLxc.mutate({
                  node: data.node!,
                  vmid: data.vmid!,
                  data: {},
                });
              }
            }
            if (data.status === "suspended") {
              if (data.type === "qemu") {
                resumeVm.mutate({
                  node: data.node!,
                  vmid: data.vmid!,
                  data: {},
                });
              }
              if (data.type === "lxc") {
                resumeLxc.mutate({
                  node: data.node!,
                  vmid: data.vmid!,
                  data: {},
                });
              }
            }
          }}
        >
          <Ionicons name="play" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: SUSPEND */}
        <ProxmoxActionPanelButton
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              SUSPEND_ACTION,
              data.status === "running"
            ),
            disabled: !(data.status === "running"),
          }}
          onPress={() => {
            if (data.status === "running") {
              createProxmoxActionAlert(
                t,
                t("proxmox:alert:suspend") as string,
                getProxmoxActionAlertMessage(data.id!, data.name!),
                () => {
                  if (data.type === "qemu") {
                    suspendVm.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                  if (data.type === "lxc") {
                    suspendLxc.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                }
              );
            }
          }}
        >
          <Ionicons name="pause" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: SHUTDOWN */}
        <ProxmoxActionPanelButton
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              SHUTDOWN_ACTION,
              data.status === "running"
            ),
            disabled: !(data.status === "running"),
          }}
          onPress={() => {
            if (data.status === "running") {
              createProxmoxActionAlert(
                t,
                t("proxmox:alert:shutdown") as string,
                getProxmoxActionAlertMessage(data.id!, data.name!),
                () => {
                  if (data.type === "qemu") {
                    shutdownVm.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                  if (data.type === "lxc") {
                    shutdownLxc.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                }
              );
            }
          }}
        >
          <Ionicons name="power" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: REBOOT */}
        <ProxmoxActionPanelButton
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              REBOOT_ACTION,
              data.status === "running"
            ),
            disabled: !(data.status === "running"),
          }}
          onPress={() => {
            if (data.status === "running") {
              createProxmoxActionAlert(
                t,
                t("proxmox:alert:reboot") as string,
                getProxmoxActionAlertMessage(data.id!, data.name!),
                () => {
                  if (data.type === "qemu") {
                    rebootVm.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                  if (data.type === "lxc") {
                    rebootLxc.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                }
              );
            }
          }}
          onLongPress={() => {
            if (data.type === "qemu" && data.status === "running") {
              createProxmoxActionAlert(
                t,
                t("proxmox:alert:reset") as string,
                getProxmoxActionAlertMessage(data.id!, data.name!),
                () => {
                  resetVm.mutate({
                    node: data.node!,
                    vmid: data.vmid!,
                    data: {},
                  });
                }
              );
            }
          }}
        >
          <Ionicons name="reload" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: STOP */}
        <ProxmoxActionPanelButton
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              STOP_ACTION,
              data.status === "running"
            ),
            disabled: !(data.status === "running"),
          }}
          onPress={() => {
            if (data.status === "running") {
              createProxmoxActionAlert(
                t,
                t("proxmox:alert:stop") as string,
                getProxmoxActionAlertMessage(data.id!, data.name!),
                () => {
                  if (data.type === "qemu") {
                    stopVm.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                  if (data.type === "lxc") {
                    stopLxc.mutate({
                      node: data.node!,
                      vmid: data.vmid!,
                      data: {},
                    });
                  }
                }
              );
            }
          }}
        >
          <Ionicons name="stop" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>

        {/* NOTE: TASK HISTORY */}
        <ProxmoxActionPanelButton
          style={{
            backgroundColor: getProxmoxActionButtonColor(
              TASK_HISTORY_ACTION,
              true
            ),
          }}
          onPress={() => {
            goToProxmoxModalScreen({
              router,
              node: data.node!,
              resource: data.id!,
              screenContext: ProxmoxDetailScreenContext.History,
            });
          }}
        >
          <Ionicons name="time" size={23} color={iconColor} />
        </ProxmoxActionPanelButton>
      </XStack>
    </XStack>
  );
};

export default ProxmoxActionPanel;
