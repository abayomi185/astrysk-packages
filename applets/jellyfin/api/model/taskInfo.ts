/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { TaskInfoLastExecutionResult } from "./taskInfoLastExecutionResult";
import type { TaskState } from "./taskState";
import type { TaskTriggerInfo } from "./taskTriggerInfo";

/**
 * Class TaskInfo.
 */
export interface TaskInfo {
  /**
   * Gets or sets the category.
   * @nullable
   */
  Category?: string | null;
  /**
   * Gets or sets the progress.
   * @nullable
   */
  CurrentProgressPercentage?: number | null;
  /**
   * Gets or sets the description.
   * @nullable
   */
  Description?: string | null;
  /**
   * Gets or sets the id.
   * @nullable
   */
  Id?: string | null;
  /** Gets or sets a value indicating whether this instance is hidden. */
  IsHidden?: boolean;
  /**
   * Gets or sets the key.
   * @nullable
   */
  Key?: string | null;
  /**
   * Gets or sets the last execution result.
   * @nullable
   */
  LastExecutionResult?: TaskInfoLastExecutionResult;
  /**
   * Gets or sets the name.
   * @nullable
   */
  Name?: string | null;
  /** Gets or sets the state of the task. */
  State?: TaskState;
  /**
   * Gets or sets the triggers.
   * @nullable
   */
  Triggers?: TaskTriggerInfo[] | null;
}
