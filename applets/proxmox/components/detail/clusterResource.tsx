import React from "react";
import { XStack, useTheme } from "tamagui";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { getIconColor } from "@astrysk/utils";

export const ClusterResourceStatusIcon: React.FC<{
  status?: string;
}> = ({ status }) => {
  const greenIconColor = useTheme().green9.get();
  const redIconColor = useTheme().red9.get();
  const yellowIconColor = useTheme().yellow9.get();
  return (
    <XStack alignSelf="center" marginTop="$2.5">
      {status === "running" && (
        <Octicons name="dot-fill" size={16} color={greenIconColor} />
      )}
      {status === "stopped" && (
        <Octicons name="dot-fill" size={16} color={redIconColor} />
      )}
      {status === "paused" && (
        <Octicons name="dot-fill" size={16} color={yellowIconColor} />
      )}
    </XStack>
  );
};

export const ClusterResourceTypeIcon: React.FC<{
  type?: string;
  size?: number;
}> = ({ type, size = 24 }) => {
  const iconColor = getIconColor();

  if (type === "qemu") {
    return <Entypo name="classic-computer" size={size} color={iconColor} />;
  } else if (type === "lxc") {
    return <Octicons name="container" size={size} color={iconColor} />;
  } else if (type === "node") {
    return <FontAwesome5 name="building" size={size} color={iconColor} />;
  } else if (type === "storage") {
    return (
      <MaterialCommunityIcons name="harddisk" size={size} color={iconColor} />
    );
  } else if (type === "sdn") {
    return (
      <MaterialCommunityIcons
        name="table-network"
        size={size}
        color={iconColor}
      />
    );
  }

  return null;
};
