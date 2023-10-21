import React from "react";
import { Dimensions } from "react-native";
import { GetClusterResourcesResponseResponseDataItem } from "../../api";
import { YStack } from "tamagui";

import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echartsCore from "echarts/core";
import * as echarts from "echarts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";

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

export const ProxmoxSummaryCharts: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ data }) => {
  return (
    <YStack
      flex={1}
      // height="100%"
      backgroundColor="blue"
      alignItems="center"
      justifyContent="center"
    >
      <ProxmoxLineChartPanel data={data} />
    </YStack>
  );
};
