import React from "react";
import { Dimensions } from "react-native";
import {
  GetNodeRRDDataResponseResponseDataItem,
  GetNodesSingleStatusResponseResponseData,
} from "../../api";
import { Button, H6, Progress, useTheme, XStack, YStack } from "tamagui";

import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echartsCore from "echarts/core";
import * as echarts from "echarts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { ProxmoxChartData, ProxmoxChartProps } from "../../types";
import { proxmoxColors } from "../../colors";
import { useTranslation } from "react-i18next";
import { generateChartTimestamps } from "../../utils";
import { getNumberValue, getStringValue } from "@astrysk/utils";

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
const CHART_WIDTH = Dimensions.get("screen").width - 50;
const CHART_HEIGHT = 250;

const ProxmoxLineAreaChartPanel: React.FC<{
  chartData: ProxmoxChartData;
  chartSize?: { width: number; height?: number };
  hideTooltip?: number; // Used to hide tooltip on chart click - quite rudimentary
}> = ({ chartData, chartSize, hideTooltip }) => {
  const { t } = useTranslation();

  // const globalBackgroundColor = useTheme().backgroundTransparent.get();

  const chartRef = React.useRef<any>(null);
  const echartsRef = React.useRef<echartsCore.ECharts | null>(null);

  const firstChartDataItem = chartData[Object.keys(chartData)[0]];
  const timestamps = generateChartTimestamps(
    firstChartDataItem?.timestamps ?? []
  );

  const option: echarts.EChartsOption = {
    animation: false,
    color: [
      proxmoxColors.chartColor1,
      proxmoxColors.chartColor2,
      proxmoxColors.chartColor3,
    ],
    tooltip: {
      trigger: "axis",
      position: function (point, params, dom, rect, size) {
        // if point is on the right half of the chart, display tooltip on the left
        return point[0] < size.viewSize[0] / 2
          ? [size.viewSize[0] - size.contentSize[0], "0%"]
          : ["8%", "0%"];
      },
      // backgroundColor: globalBackgroundColor,
    },
    grid: {
      top: 15,
      right: 20,
      bottom: 0,
      left: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: timestamps,
      boundaryGap: false,
      axisLabel: {
        interval: function (index) {
          // show label every 5 data points and for first and last data point
          return (
            index % 15 === 0 || index === 0 || index === timestamps.length - 1
          );
        },
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0],
      max: (value) => value.max,
      axisLabel: {
        formatter: function (value: number): string {
          return `${value.toFixed(firstChartDataItem?.precision ?? 1)} ${
            firstChartDataItem?.unit ?? ""
          }`;
        },
      },
    },
    series: [
      ...(Object.keys(chartData).map((key) => ({
        name:
          t(`proxmox:${key}`) +
          `${chartData[key]?.unit ? " (" + chartData[key]?.unit + ")" : ""}`,
        data: chartData[key]?.data ?? [],
        type: "line",
        smooth: true,
        areaStyle: {},
      })) as echarts.SeriesOption[]),
    ],
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
      echartsRef.current = chart;
    }
    return () => {
      chart?.dispose();
      echartsRef.current = null;
    };
  }, [option]);

  // Hide tooltip on chart click
  React.useEffect(() => {
    if (echartsRef.current) {
      echartsRef.current?.dispatchAction({
        type: "hideTip",
      });
      chartRef.current;
    }
  }, [hideTooltip]);

  return <SkiaChart ref={chartRef} />;
};

export const ProxmoxHistoricChartWrapper = React.memo(
  ({
    props,
    rrdData,
    selectedNode,
  }: {
    props: ProxmoxChartProps;
    rrdData?: GetNodeRRDDataResponseResponseDataItem[];
    selectedNode?: string;
  }) => {
    return <ProxmoxChartWrapper props={props} rrdData={rrdData} />;
  },
  (prevProps, nextProps) =>
    prevProps.rrdData === nextProps.rrdData ||
    prevProps.selectedNode === nextProps.selectedNode
);

export const ProxmoxChartWrapper: React.FC<{
  props: ProxmoxChartProps;
  nodeData?: GetNodesSingleStatusResponseResponseData;
  rrdData?: GetNodeRRDDataResponseResponseDataItem[];
  first?: boolean;
}> = ({ props, nodeData, rrdData }) => {
  const { t } = useTranslation();
  const [currentMetricData, setCurrentMetricData] = React.useState<any[]>([]);
  const [historicMetricData, setHistoricMetricData] =
    React.useState<ProxmoxChartData>({});
  const [rawData, setRawData] = React.useState<any[]>([]);
  const [dataMax, setDataMax] = React.useState<number>(0);

  const [chartWidth, setChartWidth] = React.useState<number>(0);
  const [hideTooltip, setHideTooltip] = React.useState<number>(0); // Used to hide tooltip on chart click

  const getDataValueCompareString = (
    dataValue: number,
    dataMaxValue: number
  ) => {
    if (isNaN(dataValue) || isNaN(dataMaxValue)) {
      return "";
    }
    if (props.dataValueMultiplier && props.dataValueUnit) {
      return (
        " " +
        `(${getStringValue(
          (dataValue * props.dataValueMultiplier).toFixed(1)
        )}${props.dataValueUnit} ${t("common:of")} ${getStringValue(
          (dataMaxValue * props.dataValueMultiplier).toFixed(1)
        )}${props.dataValueUnit})`
      );
    }
    return "";
  };

  React.useEffect(() => {
    let tempData: any[] = [];
    let dataMax: any;

    props.dataKeys.forEach((str) => {
      let keys = str.split(".");
      tempData.push(keys.reduce((obj, key) => obj?.[key], nodeData));
    });

    dataMax =
      typeof props.dataMaxValueKey === "number"
        ? props.dataMaxValueKey
        : props.dataMaxValueKey
            ?.split(".")
            .reduce((obj, key) => obj?.[key], nodeData);

    setRawData(tempData);

    if (props.dataMaxValueKey) {
      tempData = tempData.map((tempDatum) => (tempDatum / dataMax) * 100);
    }

    setCurrentMetricData(tempData);
    setDataMax(dataMax);
  }, [nodeData]);

  React.useEffect(() => {
    let tempData: ProxmoxChartData = {};

    props.dataKeys.forEach((key) => {
      let dataSeries: number[] = [];
      let timestamps: number[] = [];

      rrdData?.map((rrdDataItem) => {
        dataSeries.push(getNumberValue(rrdDataItem?.[key]));
        timestamps.push(rrdDataItem?.["time"]);
      });

      // if (props.dataMaxValueKey) {
      //   dataSeries = dataSeries.map(
      //     (dataSeriesItem) => (dataSeriesItem / dataMax) * 100
      //   );
      // }
      if (props.dataValueMultiplier && props.dataValueUnit) {
        // Using dataValueMultiplier directly does not work with typescript
        // Typescript type narrowing does not work inside callbacks
        const multiplier = props.dataValueMultiplier;
        dataSeries = dataSeries.map(
          (dataSeriesItem) => dataSeriesItem * multiplier
        );
      }

      tempData[key] = {
        data: dataSeries.map((dataSeriesItem) => +dataSeriesItem?.toFixed(2)),
        timestamps: timestamps,
        unit: props.dataValueUnit ?? "",
        precision: props.decimalPrecision,
      };
    });

    setHistoricMetricData(tempData);
  }, [rrdData]);

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
      onPress={() => setHideTooltip(hideTooltip + 1)}
    >
      <YStack
        flex={1}
        paddingVertical="$1"
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setChartWidth(width);
        }}
      >
        {props.type === "progress" && (
          <YStack paddingHorizontal="$5">
            <XStack justifyContent="space-between">
              <H6 marginBottom="$1.5">{props.legend}</H6>
              <H6 color="$gray11">
                {`${getStringValue(
                  getNumberValue(currentMetricData?.[0]).toFixed(0)
                )}%` + getDataValueCompareString(rawData?.[0], dataMax)}
              </H6>
            </XStack>
            <Progress
              value={
                getNumberValue(currentMetricData?.[0]) < 10
                  ? 2
                  : currentMetricData?.[0]
              }
              backgroundColor="$gray5"
            >
              <Progress.Indicator
                animation="delay"
                backgroundColor={proxmoxColors.chartColor1}
              />
            </Progress>
          </YStack>
        )}
        {props.type === "line_area" && (
          <>
            <XStack paddingHorizontal="$5" justifyContent="space-between">
              <H6 marginBottom="$1.5">{props.legend}</H6>
              <H6 color="$gray11">{t("proxmox:day(avg)")}</H6>
            </XStack>
            <ProxmoxLineAreaChartPanel
              chartData={historicMetricData}
              chartSize={{ width: chartWidth }}
              hideTooltip={hideTooltip}
            />
          </>
        )}
      </YStack>
    </Button>
  );
};
