import React from "react";
import { Alert } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Button, GetProps, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import {
  useDeleteApiV3MovieId,
  usePostApiV3Command,
  usePutApiV3MovieId,
} from "../../api";
import { useRadarrStore } from "../../store";
import { useTranslation } from "react-i18next";
import { goToRadarrModalScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import {
  RadarrDetailScreenContext,
  RadarrCommands,
  ExtendedMovieResource,
} from "../../types";
import { getIconColor, setLoadingSpinner } from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { showToast } from "@astrysk/components";
import { useToastController } from "@tamagui/toast";

export const radarrActionButtonColors = {
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

export const RadarrActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  style?: GetProps<typeof Button>;
  first?: boolean;
  vertical?: boolean;
}> = ({ children, onPress, style, first, vertical }) => {
  return (
    <Button
      width="$5"
      marginLeft={first || vertical ? undefined : "$2"}
      marginTop={!first && vertical ? "$3" : undefined}
      padding="$0"
      backgroundColor="$gray1"
      {...style}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export const RadarrActionPanel: React.FC<{
  data: ExtendedMovieResource;
  refetchMovie?: () => void;
}> = ({ data, refetchMovie }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();
  const toast = useToastController();

  const iconColor = getIconColor();

  const monitoredStatus = useRadarrStore(
    (state) => state.radarrMovieCache?.[data.id as number]?.monitored
  );

  // NOTE: MONITORING
  const putMovie = usePutApiV3MovieId({
    mutation: {
      onSuccess: (data) => {
        useRadarrStore.setState((state) => {
          return {
            radarrMovieCache: {
              ...state.radarrMovieCache,
              [data.id as number]: data,
            },
          };
        });
        showToast(toast, t("radarr:success:monitoringStatusUpdated"), {
          type: "success",
        });
        setLoadingSpinner(RadarrActionPanel.name, Actions.DONE);
      },
      onError: (error) => {
        showToast(toast, t("radarr:error:unableToSetMonitoredStatus"), {
          message: error.message,
          type: "error",
        });
        setLoadingSpinner(RadarrActionPanel.name, Actions.DONE);
      },
    },
  });
  const toggleMonitor = () => {
    const { radarrContext, radarrTabContext, ...newData } = data;
    setLoadingSpinner(RadarrActionPanel.name, Actions.LOADING);
    putMovie.mutate({
      id: (newData.id as number).toString(),
      data: {
        ...newData,
        monitored: !monitoredStatus,
      },
    });
    refetchMovie?.();
  };

  // NOTE: DELETE
  const deleteMovie = useDeleteApiV3MovieId({
    mutation: {
      onSuccess: () => {
        navigation.goBack();
      },
    },
  });
  const deleteAction = (deleteFiles: boolean = true) => {
    Alert.alert(
      `${t("radarr:doYouWantToDelete")}`,
      `${data.title} (${data.year})`,
      [
        {
          text: `${t("common:cancel")}`,
          style: "default",
        },
        {
          text: `${t("common:ok")}`,
          onPress: () => {
            const id = data.id as number;
            deleteMovie.mutate({
              id: id,
              params: {
                ...(deleteFiles ? { deleteFiles: deleteFiles } : {}),
              },
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  // NOTE: AUTOMATIC SEARCH
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        showToast(toast, t("radarr:success:automaticSearchStarted"), {
          type: "success",
        });
      },
      onError: (error) => {
        showToast(toast, t("radarr:error:automaticSearchFailed"), {
          message: error.message,
          type: "error",
        });
      },
    },
  });
  const postCommandAction = () => {
    const commandName = RadarrCommands.MOVIE_SEARCH;
    postCommand.mutate({
      data: {
        name: commandName, // Not commandName
        // @ts-ignore
        movieIds: [data.id as number],
      },
    });
  };

  return (
    <XStack justifyContent="center">
      <XStack flex={1} height="$4" width="100%" justifyContent="center">
        {/* NOTE: Monitoring */}
        <RadarrActionPanelButton
          first
          style={{
            ...radarrActionButtonColors.monitoring,
            backgroundColor: monitoredStatus ? "$red7" : "$gray5",
          }}
          onPress={toggleMonitor}
        >
          <Ionicons name="ios-bookmark" size={23} color={iconColor} />
        </RadarrActionPanelButton>
        {/* NOTE: Edit */}
        <RadarrActionPanelButton
          style={radarrActionButtonColors.edit}
          onPress={() => {
            goToRadarrModalScreen({
              router,
              searchItemId: data.id as number,
              screenContext: RadarrDetailScreenContext.EditMovie,
            });
          }}
        >
          <Ionicons name="brush" size={23} color={iconColor} />
        </RadarrActionPanelButton>
        {/* NOTE: Automatic Search */}
        <RadarrActionPanelButton
          style={radarrActionButtonColors.automaticSearch}
          onPress={() => postCommandAction()}
        >
          <Ionicons name="ios-search" size={23} color={iconColor} />
        </RadarrActionPanelButton>
        {/* NOTE: Interactive Search */}
        <RadarrActionPanelButton
          style={radarrActionButtonColors.interactiveSearch}
          onPress={() =>
            goToRadarrModalScreen({
              router,
              searchItemId: data.id as number,
              screenContext: RadarrDetailScreenContext.InteractiveSearch,
            })
          }
        >
          <Ionicons name="person" size={23} color={iconColor} />
        </RadarrActionPanelButton>
        {/* NOTE: History */}
        <RadarrActionPanelButton
          style={radarrActionButtonColors.history}
          onPress={() =>
            goToRadarrModalScreen({
              router,
              searchItemId: data.id as number,
              screenContext: RadarrDetailScreenContext.History,
            })
          }
        >
          <Ionicons name="time" size={23} color={iconColor} />
        </RadarrActionPanelButton>
        {/* NOTE: Delete */}
        <RadarrActionPanelButton
          style={radarrActionButtonColors.delete}
          onPress={deleteAction}
        >
          <Ionicons name="trash-bin-sharp" size={23} color={iconColor} />
        </RadarrActionPanelButton>
      </XStack>
    </XStack>
  );
};
