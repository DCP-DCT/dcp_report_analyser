import { BarPlot } from "../types";

export const CreateTimerBarOptions = (nodes: any[]): BarPlot[] => {
  const timers = new Map<string, number[]>();

  const headers = ['HandleCalculationObject', 'PublicKeyClause', 'UpdateCalculationObject'];

  nodes.forEach((node) => {
    let keys = Object.keys(node.diagnosis.timers.timers);

    if (!keys.every((val, index) => val === headers[index])) {
        const missing = headers.filter(header => !keys.includes(header));
        keys.push(...missing);

        missing.forEach(missingKey => {
            node.diagnosis.timers.timers[missingKey] = {
                avg: 0,
                count: 0
            }
        });
    }

    keys.forEach((key) => {
      if (timers.has(key)) {
        timers.set(key, [
          ...timers.get(key),
          node.diagnosis.timers.timers[key].avg,
        ]);
      } else {
        timers.set(key, [node.diagnosis.timers.timers[key].avg]);
      }
    });
  });

  console.log(timers);

  return Array.from(
    timers,
    ([name, value]): BarPlot => ({ name: name, data: value })
  );
};
