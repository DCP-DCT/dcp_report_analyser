export type HistorySummary = {
  id: string;
  branchId: string;
  inputValues: number[];
  output: number;
};

export type NodeDataObject = {
    ownIdLen: number;
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

export type PiePlot = {
    name: string;
    y: number;
}

export type NodeTableEntry = {
    nodeId: string;
    running: boolean;
    doPt: number;
    doCo: number;
}

export type RunConfig = {
    DecryptThreshold: number;
    Throttle: number;
    TTL: number;
}
