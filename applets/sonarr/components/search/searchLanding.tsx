import React from "react";
import { useGetApiV3Series } from "../../api";

const SonarrSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const seriesData = useGetApiV3Series(
    {},
    {
      query: {
        onSuccess: (data) => {},
      },
    }
  );

  return <></>;
};

export default SonarrSearchLanding;
