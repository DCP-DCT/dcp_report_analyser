import * as React from "react";
import { useEffect, useState } from "react";
import { convertHistoryMapToArray } from "../services/converter";
import {
  CalculateProofSummary,
  ExtractProofsByNodeSelect,
} from "../services/proofSummary";

type Props = {
  nodeString: string;
};

const NodeInspector = (props: Props) => {
  const { nodeString } = props;

  const [nodes, setNodes] = useState<any[]>(null);

  useEffect(() => {
    if (nodeString != null) {
      setNodes(JSON.parse(nodeString));
    }
  }, [nodeString]);

  useEffect(() => {
    if (nodes) {
      console.log(nodes);
      const historyConvertedNodes = convertHistoryMapToArray(nodes);
      const historySummarized = CalculateProofSummary(historyConvertedNodes);
      const selectedNodesProof = ExtractProofsByNodeSelect(
        historySummarized,
        nodes
      );
    }
  }, [nodes]);

  return <p>{nodeString}</p>;
};

export default NodeInspector;
