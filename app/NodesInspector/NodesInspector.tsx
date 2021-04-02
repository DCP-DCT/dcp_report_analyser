import * as React from "react";
import { useEffect, useState } from "react";
import { convertHistoryMapToArray } from "../services/converter";
import {
  CalculateProofSummary,
  CreateDiagnosisMedians,
  ExtractDiagnosisTableData,
  ExtractProofsByNodeSelect,
  ExtractRunConfig,
} from "../services/proofSummary";
import {
  CreateAccumulatedBars,
  CreateDiagnosisPie,
  CreateTimerBarOptions,
} from "../services/plotConverter";
import TimersChart from "./TimersChart";
import { BarPlot, NodeTableEntry, PiePlot, RunConfig } from "../types";
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
  const [nodeTableData, setNodeTableData] = useState<NodeTableEntry[]>([]);
  const [runConfig, setRunConfig] = useState<RunConfig>(null);

  useEffect(() => {
    if (nodeString != null) {
      setNodes(JSON.parse(nodeString));
    }
  }, [nodeString]);

  useEffect(() => {
    if (nodes) {
      const historyConvertedNodes = convertHistoryMapToArray(nodes);
      const historySummarized = CalculateProofSummary(historyConvertedNodes);
      const diagnosisTableData = ExtractDiagnosisTableData(nodes);
      const conf = ExtractRunConfig(nodes[0]);

      setRunConfig(conf);
      setNodeTableData(diagnosisTableData);
      setTimers(CreateTimerBarOptions(nodes));
      setDiagnosis(CreateDiagnosisPie(nodes));
      const digMedians = CreateDiagnosisMedians(nodes);
      console.log(digMedians);
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
      <div>
        {runConfig && (
          <div className={"node-data-table"}>
            <h2>Run info</h2>
            <table>
              <thead>
                <tr>
                  <th>Nodes#</th>
                  <th>Decrypt threshold</th>
                  <th>Throttle</th>
                  <th>TTL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{nodes.length}</td>
                  <td>{runConfig.DecryptThreshold}</td>
                  <td>{runConfig.Throttle + "ms"}</td>
                  <td>{runConfig.TTL}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className={"timers-chart-container"}>
        <TimersChart
          timers={timersAccumulated}
          title={"Node timers accumulated"}
          categories={["Actions"]}
          heightPx={350}
        />
      </div>
      <div>
        <DiagnosisPieChart series={diagnosis} />
      </div>
      <div className={"timers-chart-container"}>
        <TimersChart
          timers={timers}
          categories={nodes.map((node) => node.id)}
          title={`Node timers (len ${nodes.length})`}
          heightPx={40 * nodes.length}
        />
      </div>
      <div className={"node-data-table"}>
        <table>
          <thead>
            <tr>
              <th>NodeId</th>
              <th>Running</th>
              <th>Plaintext</th>
              <th>Counter</th>
            </tr>
          </thead>
          <tbody>
            {nodeTableData.map((entry) => (
              <tr>
                <td>{entry.nodeId}</td>
                <td>{entry.running ? "true" : "false"}</td>
                <td>{entry.doPt}</td>
                <td>{entry.doCo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NodeInspector;
