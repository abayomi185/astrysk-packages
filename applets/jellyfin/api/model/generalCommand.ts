/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { GeneralCommandArguments } from "./generalCommandArguments";
import type { GeneralCommandType } from "./generalCommandType";

export interface GeneralCommand {
  Arguments?: GeneralCommandArguments;
  ControllingUserId?: string;
  /** This exists simply to identify a set of known commands. */
  Name?: GeneralCommandType;
}
