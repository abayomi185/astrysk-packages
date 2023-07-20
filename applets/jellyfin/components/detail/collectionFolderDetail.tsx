import React from "react";
import { BaseItemDto } from "../../api";
import { YStack } from "tamagui";
import JellyfinSearchFilterBar from "../search/searchFilterBar";

const JellyfinCollectionFolderDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  React.useEffect(() => {
    console.log(JSON.stringify(forwardedData, null, 4));
  }, []);

  return (
    <YStack>
      <JellyfinSearchFilterBar />
    </YStack>
  );
};

export default JellyfinCollectionFolderDetail;
