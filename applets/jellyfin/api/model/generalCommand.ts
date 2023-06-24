/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { GeneralCommandType } from './generalCommandType';
import type { GeneralCommandArguments } from './generalCommandArguments';

export interface GeneralCommand {
  /** This exists simply to identify a set of known commands. */
  Name?: GeneralCommandType;
  ControllingUserId?: string;
  Arguments?: GeneralCommandArguments;
}
