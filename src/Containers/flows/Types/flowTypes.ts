export interface FlowNodes {
    id: string;
    type?: string;
    data?: FlowNodeData;
    position: FlowNodePosition;
    sourcePosition?: string;
    targetPosition?: string;
    parentNode?: string;
    extent?: string;
    dragHandle?: string;
    style?: object;
    isConnectable?: boolean;
}

interface FlowNodeData {
    label: string | JSX.Element;
}

interface FlowNodePosition {
    x: number;
    y: number;
}

export interface FlowEdges {
    id: string
    source: string
    target?: string
    animated?: boolean
}
