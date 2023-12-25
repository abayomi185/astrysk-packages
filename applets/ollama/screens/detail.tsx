import React, { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";

import { useOllamaStore } from "../store";
import { TabContext } from "@astrysk/types";
import {
  ExtendedListLocalModels200ModelsItem,
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
} from "../types";
import OllamaConversationDetail from "../components/detail/conversationDetail";

const OllamaDetail: React.FC = () => {
  const params = useLocalSearchParams() as OllamaDetailScreenProps;
  const refParams = React.useRef(params);

  const itemData = React.useMemo(() => {
    const dataToForward: ExtendedListLocalModels200ModelsItem = {
      ...useOllamaStore.getState().ollamaCache?.models?.[
        refParams.current.itemId as string
      ],
      ollamaContext: params.context,
      ollamaTabContext: params.tabContext as TabContext,
    };

    if (refParams.current.context === OllamaDetailScreenContext.SearchItem) {
      return {
        ...dataToForward,
      } as ExtendedListLocalModels200ModelsItem;
    }
    return dataToForward;
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.ollamaContext === OllamaDetailScreenContext.SearchItem) {
      return (
        <OllamaConversationDetail
          forwardedData={itemData}
          tabContext={itemData.ollamaTabContext as TabContext}
        />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default OllamaDetail;
