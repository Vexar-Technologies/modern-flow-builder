import { useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useReactFlow,
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from '../../stores/flowStore';
import { nodeTypes } from '../nodes/CustomNodes';
import '../../styles/reactflow.css';
import '../../styles/nodes.css';

function FlowCanvasInner() {
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();

    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        setSelectedNode,
        clearSelection
    } = useFlowStore();

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (!type) return;

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        addNode(type, position);
    }, [screenToFlowPosition, addNode]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, [setSelectedNode]);

    const onPaneClick = useCallback(() => {
        clearSelection();
    }, [clearSelection]);

    return (
        <div className="flow-canvas" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                snapToGrid
                snapGrid={[16, 16]}
                connectionLineStyle={{ stroke: 'var(--accent-primary)', strokeWidth: 2 }}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: 'var(--accent-primary)', strokeWidth: 2 }
                }}
            >
                <Background
                    variant="dots"
                    gap={20}
                    size={1}
                    color="rgba(255,255,255,0.08)"
                />
                <Controls
                    position="bottom-left"
                    showInteractive={false}
                />
                <MiniMap
                    position="bottom-right"
                    nodeColor={(node) => {
                        switch (node.data?.nodeType) {
                            case 'trigger': return 'var(--node-trigger)';
                            case 'action': return 'var(--node-action)';
                            case 'condition': return 'var(--node-condition)';
                            case 'delay': return 'var(--node-delay)';
                            default: return 'var(--accent-primary)';
                        }
                    }}
                    maskColor="rgba(10, 10, 15, 0.8)"
                    pannable
                    zoomable
                />
            </ReactFlow>
        </div>
    );
}

export function FlowCanvas() {
    return (
        <ReactFlowProvider>
            <FlowCanvasInner />
        </ReactFlowProvider>
    );
}
