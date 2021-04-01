import { BarPlot, PiePlot } from "../types";

export const CreateTimerBarOptions = (nodes: any[]): BarPlot[] => {
  const timers = new Map<string, number[]>();

  const headers = [
    "HandleCalculationObject",
    "PublicKeyClause",
    "UpdateCalculationObject",
  ];

  nodes.forEach((node) => {
    let keys = Object.keys(node.diagnosis.timers.timers);

    if (!keys.every((val, index) => val === headers[index])) {
      const missing = headers.filter((header) => !keys.includes(header));
      keys.push(...missing);

      missing.forEach((missingKey) => {
        node.diagnosis.timers.timers[missingKey] = {
          avg: 0,
          count: 0,
        };
      });
    }

    keys.forEach((key) => {
      if (timers.has(key)) {
        timers.set(key, [
          ...timers.get(key),
          node.diagnosis.timers.timers[key].avg / 1000,
        ]);
      } else {
        timers.set(key, [node.diagnosis.timers.timers[key].avg / 1000]);
      }
    });
  });

  return Array.from(
    timers,
    ([name, value]): BarPlot => ({ name: name, data: value })
  );
};

export const CreateAccumulatedBars = (bars: BarPlot[]): BarPlot[] => {
  return bars.map((bar) => {
    return {
      name: bar.name,
      data: [
        Math.floor(
          (bar.data.reduce((acc, val) => {
            return acc + val;
          }, 0) /
            bar.data.length) *
            1000
        ) / 1000,
      ],
    };
  });
};

export const CreateDiagnosisPie = (nodes: any[]): PiePlot[] => {
  const diagnosis = nodes.map((node) => node.diagnosis);

  const reduces = diagnosis.reduce((acc, part) => {
    delete part.control;
    delete part.timers;

    const keys = Object.keys(part);

    keys.forEach((key) => {
      if (acc.has(key)) {
        acc.set(key, acc.get(key) + part[key]);
      } else {
        acc.set(key, part[key]);
      }
    });
    return acc;
  }, new Map<string, number>());

  const asArray = Array.from(
    reduces,
    ([name, value]): PiePlot => ({ name: name, y: value })
  );

  let total = 0;
  asArray.forEach((el) => (total = total + el.y));

  return asArray.map((el) => {
    const percent = (el.y / total) * 100;

    // Floor with decimal to garantee all percentages > 100%
    // https://stackoverflow.com/a/41259341/7036624
    // @ts-ignore
    el.y = Number(Math.floor(percent + "e2") + "e-2");
    return el;
  });
};
