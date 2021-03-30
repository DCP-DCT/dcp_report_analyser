import React from "react";
import {BarPlot} from "../types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import './style.css';

type Props = {
  timers: BarPlot[];
  nodes: any[];
};

const TimersChart = (props: Props) => {
  const { timers, nodes } = props;

  const [options, setOptions] = useState(null);

  useEffect(() => {
    console.log(timers);
    if (timers && nodes) {
      setOptions({
        chart: {
          type: "bar",
        },
        title: {
          text: "Node timers",
        },
        xAxis: {
          categories: nodes.map((node) => node.id),
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
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
        series: timers
      });
    }
  }, [timers, nodes]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TimersChart;
