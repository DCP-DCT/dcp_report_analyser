import {HistorySummary} from "../types";

export const CalculateProofSummary = (nodes: any[]): HistorySummary[] => {
  const fullHistory = nodes.reduce((acc, node): any[] => {
    return [...acc, ...node.diagnosis.control.nodes_contributed_to_updates];
  }, []);

  return fullHistory.reduce(
      (acc, entry): HistorySummary[] => {
          let el: HistorySummary = acc.find((proof) => proof.branchId === entry.branchId);
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

          return [...acc, el];
      },
      []
  );
};

export const ExtractProofsByNodeSelect = (proofs: HistorySummary[], nodes: any[]): HistorySummary[] => {
    return null;
};
