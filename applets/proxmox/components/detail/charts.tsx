import React from "react";
import { Dimensions } from "react-native";
import {
  GetClusterResourcesResponseResponseDataItem,
  GetNodeRRDDataResponseResponse,
  GetNodeRRDDataResponseResponseDataItem,
  GetNodesSingleStatusResponseResponseData,
} from "../../api";
import { Button, H6, Progress, XStack, YStack } from "tamagui";

import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echartsCore from "echarts/core";
import * as echarts from "echarts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { ProxmoxChartProps } from "../../types";
import { proxmoxColors } from "../../colors";
import { useProxmoxStore } from "../../store";
import { useTranslation } from "react-i18next";

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
  chartOption: Partial<echarts.EChartsOption>;
  chartSize?: { width: number; height: number };
}> = ({ chartOption, chartSize }) => {
  const chartRef = React.useRef<any>(null);

  const option: echarts.EChartsOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "value",
      // boundaryGap: false,
      // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    // Spread chartOption to override data
    ...chartOption,
  };

  React.useEffect(() => {
    let chart: echartsCore.ECharts;
    if (chartRef.current) {
      chart = echartsCore.init(chartRef.current, "light", {
        renderer: "svg",
        width: chartSize?.width ?? CHART_WIDTH,
        height: chartSize?.height ?? CHART_HEIGHT,
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
          <ProxmoxLineChartPanel chartOption={data} />
        </>
      );
    } else if (data.type === "lxc") {
      return (
        <>
          <ProxmoxLineChartPanel chartOption={data} />
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
  props: ProxmoxChartProps;
  nodeData: GetNodesSingleStatusResponseResponseData;
  rrdData: GetNodeRRDDataResponseResponseDataItem[];
  first?: boolean;
}> = ({ props, nodeData, rrdData }) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<any[]>([]);
  const [rawData, setRawData] = React.useState<any[]>([]);
  const [dataMax, setDataMax] = React.useState<number>(0);

  const getDataValueCompareString = (
    dataValue: number,
    dataMaxValue: number
  ) => {
    if (props.dataValueMultiplier && props.dataValueUnit) {
      return (
        " " +
        `(${(dataValue * props.dataValueMultiplier).toFixed(1)}${
          props.dataValueUnit
        } ${t("common:of")} ${(
          dataMaxValue * props.dataValueMultiplier
        ).toFixed(1)}${props.dataValueUnit})`
      );
    }
    return "";
  };

  React.useEffect(() => {
    let data: any[] = [];
    let dataMax: any;

    props.dataKeys.forEach((str) => {
      let keys = str.split(".");
      data.push(keys.reduce((obj, key) => obj?.[key], nodeData));
    });

    dataMax =
      typeof props.dataMaxValueKey === "number"
        ? props.dataMaxValueKey
        : props.dataMaxValueKey
            ?.split(".")
            .reduce((obj, key) => obj?.[key], nodeData);

    setRawData(data);

    if (props.dataMaxValueKey) {
      data = data.map((data) => (data / dataMax) * 100);
    }

    // console.log("data[0]", props.id, data[0], dataMax);
    setData(data);
    setDataMax(dataMax);
  }, [nodeData]);

  return (
    <Button
      flex={1}
      height="auto"
      backgroundColor="$gray1"
      marginHorizontal="$3"
      paddingHorizontal="$0"
      paddingVertical="$3"
      justifyContent="center"
      borderWidth="$0"
      borderTopWidth="$0"
      borderRadius="$0"
      borderBottomWidth={props.lastItem ? "$0" : "$0.25"}
      borderBottomColor="$gray6"
      borderTopLeftRadius={props.firstItem ? "$5" : "$0"}
      borderTopRightRadius={props.firstItem ? "$5" : "$0"}
      borderBottomLeftRadius={props.lastItem ? "$5" : "$0"}
      borderBottomRightRadius={props.lastItem ? "$5" : "$0"}
      marginTop={props.firstItem ? "$3" : "$0"}
      pressStyle={{}}
    >
      {props.type === "progress" && (
        <YStack flex={1} paddingHorizontal="$5" paddingBottom="$1.5">
          <XStack justifyContent="space-between">
            <H6 marginBottom="$1.5">{props.legend}</H6>
            <H6 color="$gray11">
              {`${data?.[0]?.toFixed(0)}%` +
                getDataValueCompareString(rawData?.[0], dataMax)}
            </H6>
          </XStack>
          <Progress
            value={data?.[0] < 10 ? 2 : data?.[0]}
            backgroundColor="$gray5"
          >
            <Progress.Indicator
              animation="delay"
              backgroundColor={proxmoxColors.accentColor}
            />
          </Progress>
        </YStack>
      )}
      {props.type === "line_area" && (
        <YStack flex={1}>
          <ProxmoxLineChartPanel chartOption={{}} />
        </YStack>
      )}
    </Button>
  );
};
