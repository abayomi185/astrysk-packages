import React from "react";
import { useTranslation } from "react-i18next";
import { EpisodeResource } from "../../api";

const SonarrEpisode: React.FC<{
  data: EpisodeResource;
}> = ({ data }) => {
  const { t } = useTranslation();

  return <></>;
};

export default SonarrEpisode;
