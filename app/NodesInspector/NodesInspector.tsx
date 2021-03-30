import * as React from "react";
import { useEffect, useState } from "react";
import { convertHistoryMapToArray } from "../services/converter";
import {
  CalculateProofSummary,
  ExtractProofsByNodeSelect,
} from "../services/proofSummary";
import { CreateTimerBarOptions } from "../services/plotConverter";
import TimersChart from "./Timers";
import { BarPlot } from "../types";

type Props = {
  nodeString: string;
};

const NodeInspector = (props: Props) => {
  const { nodeString } = props;

  const [nodes, setNodes] = useState<any[]>(null);
  const [timers, setTimers] = useState<BarPlot[]>(null);

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
    }
  }, [nodes]);

  return (
    <div className={'timers-chart-container'}>
      <TimersChart timers={timers} nodes={nodes} />
    </div>
  );
};

export default NodeInspector;
