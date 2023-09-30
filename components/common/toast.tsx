import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast, useToastState, ToastViewport } from "@tamagui/toast";
import { Button, Text } from "tamagui";

type ShowOptions = {
  message?: string;
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

export interface ShowToastOptions {
  message?: string;
  type: "done" | "error" | "none";
  haptic?: "success" | "warning" | "error" | "none";
  duration?: number; // number in milliseconds
}

export const showToast = (
  toast: ToastContext,
  title: string,
  options: ShowToastOptions
) => {
  toast.show(title, {
    message: options.message,
    duration: options.duration ?? 2500,
    burntOptions: {
      preset: options.type,
      haptic: options.haptic,
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
