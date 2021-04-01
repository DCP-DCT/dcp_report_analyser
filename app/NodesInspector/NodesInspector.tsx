import * as React from "react";
import { useEffect, useState } from "react";
import { convertHistoryMapToArray } from "../services/converter";
import {
  CalculateProofSummary,
  ExtractProofsByNodeSelect,
} from "../services/proofSummary";
import {
  CreateAccumulatedBars,
  CreateDiagnosisPie,
  CreateTimerBarOptions,
} from "../services/plotConverter";
import TimersChart from "./TimersChart";
import { BarPlot, PiePlot } from "../types";
import { DiagnosisPieChart } from "./DiagnosisPieChart";

type Props = {
  nodeString: string;
};

const NodeInspector = (props: Props) => {
  const { nodeString } = props;

  const [nodes, setNodes] = useState<any[]>(null);
  const [timers, setTimers] = useState<BarPlot[]>(null);
  const [timersAccumulated, setTimerAccumulated] = useState<BarPlot[]>(null);
  const [diagnosis, setDiagnosis] = useState<PiePlot[]>(null);

  useEffect(() => {
    if (nodeString != null) {
      setNodes(JSON.parse(nodeString));
    }
  }, [nodeString]);

  useEffect(() => {
    if (nodes) {
      const historyConvertedNodes = convertHistoryMapToArray(nodes);
      const historySummarized = CalculateProofSummary(historyConvertedNodes);
      const selectedNodesProof = ExtractProofsByNodeSelect(
        historySummarized,
        nodes
      );

      console.log(selectedNodesProof);

      setTimers(CreateTimerBarOptions(nodes));
      setDiagnosis(CreateDiagnosisPie(nodes));
    }
  }, [nodes]);

  useEffect(() => {
    if (timers) {
      setTimerAccumulated(CreateAccumulatedBars(timers));
    }
  }, [timers]);

  if (!nodes) {
    return null;
  }

  return (
    <div>
      <div className={"timers-chart-container"}>
        <TimersChart
          timers={timersAccumulated}
          title={"Node timers accumulated"}
          categories={["Actions"]}
          heightPx={350}
        />
      </div>
      <div className={"timers-chart-container"}>
        <TimersChart
          timers={timers}
          categories={nodes.map((node) => node.id)}
          title={`Node timers (len ${nodes.length})`}
          heightPx={40 * nodes.length}
        />
      </div>
      <div>
        <DiagnosisPieChart series={diagnosis} />
      </div>
    </div>
  );
};

export default NodeInspector;
