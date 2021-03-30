export type HistorySummary = {
  id: string;
  branchId: string;
  inputValues: number[];
  output: number;
};

export type NodeDataObject = {
    selectedBranchId: string;
    plaintext: number;
    count: number;
}

export type HistorySummaryWithNode = {
    nodeActual: NodeDataObject;
    historySummary: HistorySummary
}

export type BarPlot = {
    name: string;
    data: number[];
}
