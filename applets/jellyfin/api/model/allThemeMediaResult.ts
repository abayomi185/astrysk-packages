/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { AllThemeMediaResultSoundtrackSongsResult } from "./allThemeMediaResultSoundtrackSongsResult";
import type { AllThemeMediaResultThemeSongsResult } from "./allThemeMediaResultThemeSongsResult";
import type { AllThemeMediaResultThemeVideosResult } from "./allThemeMediaResultThemeVideosResult";

export interface AllThemeMediaResult {
  /**
   * Class ThemeMediaResult.
   * @nullable
   */
  SoundtrackSongsResult?: AllThemeMediaResultSoundtrackSongsResult;
  /**
   * Class ThemeMediaResult.
   * @nullable
   */
  ThemeSongsResult?: AllThemeMediaResultThemeSongsResult;
  /**
   * Class ThemeMediaResult.
   * @nullable
   */
  ThemeVideosResult?: AllThemeMediaResultThemeVideosResult;
}
