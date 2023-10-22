/**
 * Custom types for the request params
 */

export type GetNodeRRDDataRequestParams = {
  timeframe: "hour" | "day" | "week" | "month" | "year";
  cf?: "AVERAGE" | "MAX";
};
