import { HistorySummary, HistorySummaryWithNode } from "../types";

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

  console.log(branchIdsToExtract, filtered);

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
