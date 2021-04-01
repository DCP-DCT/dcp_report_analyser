import { PiePlot } from "../types";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  series: PiePlot[];
};

export const DiagnosisPieChart = (props: Props) => {
  const { series } = props;

  const [options, setOptions] = useState<Highcharts.Options>(null);

  useEffect(() => {
    if (series) {
      setOptions({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 400,
          scrollablePlotArea: {
            minHeight: 400,
          },
          events: {
            addSeries: () => true,
          },
        },
        title: {
          text: `Node actions accumulative`,
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [
          {
            name: "Actions",
            colorByPoint: true,
            data: series,
            type: "pie"
          },
        ],
      });
    }
  }, [series]);

  if (!series) {
    return null;
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
