import React from "react";
import { Dimensions } from "react-native";
import {
  GetClusterResourcesResponseResponseDataItem,
  GetNodeRRDDataResponseResponse,
  GetNodeRRDDataResponseResponseDataItem,
  GetNodesSingleStatusResponseResponseData,
} from "../../api";
import { H3, H4, Progress, XStack, YStack } from "tamagui";

import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echartsCore from "echarts/core";
import * as echarts from "echarts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { SummaryChartProps } from "../../types";

// Register extensions
echartsCore.use([
  SVGRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
]);

// Default width and height of the chart
// WARN: Make util function to limit the max width
const CHART_WIDTH = Dimensions.get("screen").width - 40;
const CHART_HEIGHT = 250;

const ProxmoxLineChartPanel: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ data }) => {
  const chartRef = React.useRef<any>(null);

  const option: echarts.EChartsOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
        areaStyle: {},
        smooth: true,
      },
    ],
  };

  React.useEffect(() => {
    let chart: echartsCore.ECharts;
    if (chartRef.current) {
      chart = echartsCore.init(chartRef.current, "light", {
        renderer: "svg",
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
      });

      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SkiaChart ref={chartRef} />;
};

export const ProxmoxDetailCharts: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ data }) => {
  const getChartsForType = () => {
    if (data.type === "qemu") {
      return (
        <>
          <ProxmoxLineChartPanel data={data} />
        </>
      );
    } else if (data.type === "lxc") {
      return (
        <>
          <ProxmoxLineChartPanel data={data} />
        </>
      );
    }
  };

  return (
    <YStack flex={1} height="auto" alignItems="center" justifyContent="center">
      {getChartsForType()}
    </YStack>
  );
};

export const ProxmoxSummaryChart: React.FC<{
  props: SummaryChartProps;
  nodeData: GetNodesSingleStatusResponseResponseData;
  rrdData: GetNodeRRDDataResponseResponseDataItem[];
}> = ({ props, nodeData, rrdData }) => {
  // Use datakey to get the data from the nodeData object
  // const data = nodeData[props.dataKey];

  return (
    <YStack
      flex={1}
      height="auto"
      // backgroundColor="blue"
      paddingHorizontal="$3.5"
      paddingVertical="$3"
      justifyContent="center"
    >
      {props.type === "progress" && (
        <>
          <XStack justifyContent="space-between">
            <H4>{props.legend}</H4>
          </XStack>
          {/* <ProxmoxLineChartPanel data={data} /> */}
          <Progress value={60}>
            <Progress.Indicator animation="delay" />
          </Progress>
        </>
      )}
      {props.type === "line_area" && (
        <>{/* <ProxmoxLineChartPanel data={data} /> */}</>
      )}
    </YStack>
  );
};
