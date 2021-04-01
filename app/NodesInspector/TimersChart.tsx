import React from "react";
import { BarPlot } from "../types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";

type Props = {
  timers: BarPlot[];
  title: string;
  categories: string[];
  heightPx: number;
};

const TimersChart = (props: Props) => {
  const { timers, categories, title, heightPx } = props;

  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (timers) {
      setOptions({
        chart: {
          type: "bar",
          height: heightPx,
        },
        title: {
          text: title,
        },
        xAxis: {
          categories: categories,
          title: {
            text: null,
          }
        },
        yAxis: {
          type: 'logarithmic',
          minorTickInterval: 0.1,
          title: {
            text: "Avg time (ms)",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },

        },
        tooltip: {
          valueSuffix: " ms",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: timers,
      });
    }
  }, [timers]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TimersChart;
