import * as Device from "expo-device";

export const TOAST_TOP_OFFSET = -40;

export const MOBILE_TOAST_TOP_OFFSET = -50;
export const TABLET_TOAST_TOP_OFFSET = 50;

export const getToastTopOffset = (deviceType: Device.DeviceType): number => {
  if (deviceType === Device.DeviceType.TABLET) {
    return TABLET_TOAST_TOP_OFFSET;
  } else {
    return MOBILE_TOAST_TOP_OFFSET;
  }
};
