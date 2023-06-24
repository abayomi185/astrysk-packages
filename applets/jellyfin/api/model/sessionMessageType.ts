/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * The different kinds of messages that are used in the WebSocket api.
 */
export type SessionMessageType = typeof SessionMessageType[keyof typeof SessionMessageType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SessionMessageType = {
  ForceKeepAlive: 'ForceKeepAlive',
  GeneralCommand: 'GeneralCommand',
  UserDataChanged: 'UserDataChanged',
  Sessions: 'Sessions',
  Play: 'Play',
  SyncPlayCommand: 'SyncPlayCommand',
  SyncPlayGroupUpdate: 'SyncPlayGroupUpdate',
  Playstate: 'Playstate',
  RestartRequired: 'RestartRequired',
  ServerShuttingDown: 'ServerShuttingDown',
  ServerRestarting: 'ServerRestarting',
  LibraryChanged: 'LibraryChanged',
  UserDeleted: 'UserDeleted',
  UserUpdated: 'UserUpdated',
  SeriesTimerCreated: 'SeriesTimerCreated',
  TimerCreated: 'TimerCreated',
  SeriesTimerCancelled: 'SeriesTimerCancelled',
  TimerCancelled: 'TimerCancelled',
  RefreshProgress: 'RefreshProgress',
  ScheduledTaskEnded: 'ScheduledTaskEnded',
  PackageInstallationCancelled: 'PackageInstallationCancelled',
  PackageInstallationFailed: 'PackageInstallationFailed',
  PackageInstallationCompleted: 'PackageInstallationCompleted',
  PackageInstalling: 'PackageInstalling',
  PackageUninstalled: 'PackageUninstalled',
  ActivityLogEntry: 'ActivityLogEntry',
  ScheduledTasksInfo: 'ScheduledTasksInfo',
  ActivityLogEntryStart: 'ActivityLogEntryStart',
  ActivityLogEntryStop: 'ActivityLogEntryStop',
  SessionsStart: 'SessionsStart',
  SessionsStop: 'SessionsStop',
  ScheduledTasksInfoStart: 'ScheduledTasksInfoStart',
  ScheduledTasksInfoStop: 'ScheduledTasksInfoStop',
  KeepAlive: 'KeepAlive',
} as const;
