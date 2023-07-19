import React from "react";
import { BaseItemDto } from "../../api";

const JellyfinCollectionFolderDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  React.useEffect(() => {
    console.log(JSON.stringify(forwardedData, null, 4));
  }, []);

  return <></>;
};

export default JellyfinCollectionFolderDetail;
