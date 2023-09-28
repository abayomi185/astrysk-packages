import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast, useToastState, ToastViewport } from "@tamagui/toast";

type ShowOptions = {
  message: string;
  duration?: number;
  // customData?: CustomData;
  viewportName?: string | "default";
  burntOptions?: {
    preset?: "done" | "error" | "none";
    haptic?: "success" | "warning" | "error" | "none";
    from?: "top" | "bottom";
  };
};

type ToastContext = {
  show: (title: string, options?: ShowOptions) => boolean;
};

export const showToast = (
  toast: ToastContext,
  title: string,
  message: string,
  type: "success" | "warning" | "error" | "none",
  duration?: number
) => {
  toast.show(title, {
    message,
    duration: duration,
    burntOptions: {
      preset:
        type === "success"
          ? "done"
          : type === "warning" || type === "error"
          ? "error"
          : "none",
      haptic: type,
    },
  });
};

export const SafeToastViewport = () => {
  const { left, top, right } = useSafeAreaInsets();

  return (
    <ToastViewport
      flexDirection="column-reverse"
      top={top}
      left={left}
      right={right}
      multipleToasts
    />
  );
};

export const UniversalToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      duration={currentToast.duration}
      enterStyle={{ x: -20, opacity: 0 }}
      exitStyle={{ x: -20, opacity: 0 }}
    >
      <Toast.Title>{currentToast.title}</Toast.Title>
      <Toast.Description>{currentToast.message}</Toast.Description>
    </Toast>
  );
};
