import {
  BarPlot,
  HistorySummary,
  HistorySummaryWithNode,
  NodeTableEntry,
  RunConfig,
} from "../types";

export const CalculateProofSummary = (nodes: any[]): HistorySummary[] => {
  const fullHistory = nodes.reduce((acc, node): any[] => {
    return [...acc, ...node.diagnosis.control.nodes_contributed_to_updates];
  }, []);

  return fullHistory
    .reduce((acc, entry): HistorySummary[] => {
      let el: HistorySummary = acc.find(
        (proof) => proof.branchId === entry.branchId
      );
      if (!el) {
        el = {
          id: entry.nodeId,
          branchId: entry.branchId,
          inputValues: [entry.input],
          output: entry.input,
        };
      } else {
        el.inputValues = [...el.inputValues, entry.input];
        el.output = el.inputValues.reduce((acc, val) => acc + val);
      }

      const noDuplicates = acc.filter(
        (possibleDuplicate) => possibleDuplicate.branchId !== el.branchId
      );

      return [...noDuplicates, el];
    }, [])
    .sort((a, b) => a.branchId.localeCompare(b.branchId));
};

export const ExtractProofsByNodeSelect = (
  proofs: HistorySummary[],
  nodes: any[]
): HistorySummaryWithNode[] => {
  console.log(nodes);
  const branchIdsToExtract = nodes.map(
    (node) => node.data_object.latest_branch_id
  );

  const filtered = proofs.filter((proof) =>
    branchIdsToExtract.includes(proof.branchId)
  );

  return nodes.map(
    (node): HistorySummaryWithNode => {
      return {
        nodeActual: {
          selectedBranchId: node.data_object.latest_branch_id,
          plaintext: node.data_object.plaintext,
          count: node.data_object.counter,
          ownIdLen: node.ids.length,
        },
        historySummary: filtered.find(
          (el) => el.branchId === node.data_object.latest_branch_id
        ),
      };
    }
  );
};

export const ExtractDiagnosisTableData = (nodes: any[]): NodeTableEntry[] => {
  return nodes.map(
    (node): NodeTableEntry => ({
      nodeId: node.id,
      running: node.process_running,
      doPt: node.data_object.plaintext,
      doCo: node.data_object.counter,
    })
  );
};

export const ExtractRunConfig = (node: any): RunConfig => {
  return {
    DecryptThreshold: node.config.NodeVisitDecryptThreshold,
    Throttle: node.config.Throttle,
    TTL: node.config.CoTTL,
  };
};

export const CreateDiagnosisMedians = (diagnosis: any[]) => {
  const accumulated = new Map<string, number[]>();
  diagnosis.forEach((dig) => {
    Object.keys(dig).map((key) => {
      if (accumulated.has(key)) {
        accumulated.set(
          key,
          [...accumulated.get(key), dig[key]].sort((a, b) => a - b)
        );
      } else {
        accumulated.set(key, [dig[key]]);
      }
    });
  }, new Map<string, number[]>());

  const medians = CalculateMedianFromMap(accumulated);

  return Array.from(medians, ([name, value]) => ([name, value]));
};

export const CalculateMedianFromMap = (map: Map<string, number[]>): Map<string, number> => {
  const medians = new Map<string, number>();
  map.forEach((val, key) => {
    const len = val.length;
    const mid = Math.ceil(len / 2);
    const median = len % 2 == 0 ? (val[mid] + val[mid - 1]) / 2 : val[mid - 1];

    medians.set(key, median);
  });

  return medians;
};
