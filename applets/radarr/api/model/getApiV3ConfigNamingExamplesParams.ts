/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { ColonReplacementFormat } from "./colonReplacementFormat";

export type GetApiV3ConfigNamingExamplesParams = {
  RenameMovies?: boolean;
  ReplaceIllegalCharacters?: boolean;
  ColonReplacementFormat?: ColonReplacementFormat;
  StandardMovieFormat?: string;
  MovieFolderFormat?: string;
  IncludeQuality?: boolean;
  ReplaceSpaces?: boolean;
  Separator?: string;
  NumberStyle?: string;
  Id?: number;
  ResourceName?: string;
};
