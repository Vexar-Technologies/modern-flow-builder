import { Handle, Position } from '@xyflow/react';

export function TriggerNode({ data, selected }) {
    const getIcon = () => {
        switch (data.config?.triggerType) {
            case 'command': return '⌘';
            case 'message': return '💬';
            case 'callback': return '🔘';
            default: return '⚡';
        }
    };

    const getPreview = () => {
        const { config } = data;
        switch (config?.triggerType) {
            case 'command': return config.command || '/command';
            case 'message': return config.filter || 'any message';
            case 'callback': return config.callbackData || 'button click';
            default: return 'trigger event';
        }
    };

    return (
        <div className={`custom-node trigger-node ${selected ? 'selected' : ''}`}>
            <div className="node-header">
                <span className="node-icon">{getIcon()}</span>
                <span>{data.label}</span>
            </div>
            <div className="node-body">
                <div className="node-preview">
                    {getPreview()}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="output"
            />
        </div>
    );
}

export function ActionNode({ data, selected }) {
    const getIcon = () => {
        switch (data.config?.actionType) {
            case 'sendMessage': return '📤';
            case 'sendPhoto': return '🖼️';
            case 'sendButtons': return '🔲';
            case 'apiRequest': return '🌐';
            default: return '▶️';
        }
    };

    const getPreview = () => {
        const { config } = data;
        switch (config?.actionType) {
            case 'sendMessage':
                return config.text ? `"${config.text.slice(0, 30)}${config.text.length > 30 ? '...' : ''}"` : 'message text';
            case 'sendPhoto': return config.photoUrl || 'photo URL';
            case 'sendButtons': return `${(config.buttons || []).length} buttons`;
            case 'apiRequest': return `${config.method || 'GET'} ${config.url || 'URL'}`;
            default: return 'action';
        }
    };

    return (
        <div className={`custom-node action-node ${selected ? 'selected' : ''}`}>
            <Handle
                type="target"
                position={Position.Top}
                id="input"
            />
            <div className="node-header">
                <span className="node-icon">{getIcon()}</span>
                <span>{data.label}</span>
            </div>
            <div className="node-body">
                <div className="node-preview">
                    {getPreview()}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="output"
            />
        </div>
    );
}

export function ConditionNode({ data, selected }) {
    const getPreview = () => {
        const { config } = data;
        if (!config?.leftOperand) return 'set condition';
        return `${config.leftOperand} ${config.operator || '=='} ${config.rightOperand}`;
    };

    return (
        <div className={`custom-node condition-node ${selected ? 'selected' : ''}`}>
            <Handle
                type="target"
                position={Position.Top}
                id="input"
            />
            <div className="node-header">
                <span className="node-icon">🔀</span>
                <span>{data.label}</span>
            </div>
            <div className="node-body">
                <div className="node-preview">
                    {getPreview()}
                </div>
            </div>
            <div className="condition-outputs">
                <span className="output-label true">✓ True</span>
                <span className="output-label false">✗ False</span>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="true"
                style={{ left: '30%' }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="false"
                style={{ left: '70%' }}
            />
        </div>
    );
}

export function DelayNode({ data, selected }) {
    const getPreview = () => {
        const { config } = data;
        const duration = config?.duration || 1;
        const unit = config?.unit || 'seconds';
        return `Wait ${duration} ${unit}`;
    };

    return (
        <div className={`custom-node delay-node ${selected ? 'selected' : ''}`}>
            <Handle
                type="target"
                position={Position.Top}
                id="input"
            />
            <div className="node-header">
                <span className="node-icon">⏱️</span>
                <span>{data.label}</span>
            </div>
            <div className="node-body">
                <div className="node-preview">
                    {getPreview()}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="output"
            />
        </div>
    );
}

// Export node types map for React Flow
export const nodeTypes = {
    triggerNode: TriggerNode,
    actionNode: ActionNode,
    conditionNode: ConditionNode,
    delayNode: DelayNode
};
