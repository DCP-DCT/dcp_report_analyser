export type HistoryEntry = {
    nodeId: string;
    branchId: string;
    input: number;
}

export const convertHistoryMapToArray = (nodes: any[]): any[] => {
    return nodes.reduce((acc, node) => {
        const structMapKeys = Object.keys(node.diagnosis.control.nodes_contributed_to_updates);
        const keysAsObjects = structMapKeys.map(key => JSON.parse(key));

        node.diagnosis.control.nodes_contributed_to_updates = structMapKeys.map((_, i): HistoryEntry => {
            return {
                nodeId: keysAsObjects[i].id,
                branchId: keysAsObjects[i].branch_id,
                input: node.diagnosis.control.nodes_contributed_to_updates[structMapKeys[i]]
            };
        });
        return [...acc, node];
    }, []);
};
