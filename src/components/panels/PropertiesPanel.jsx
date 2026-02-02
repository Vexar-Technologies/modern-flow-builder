import { useFlowStore } from '../../stores/flowStore';
import '../../styles/panels.css';

export function PropertiesPanel() {
    const { selectedNode, updateNodeData, deleteNode } = useFlowStore();

    if (!selectedNode) {
        return (
            <div className="properties-panel">
                <div className="panel-header">
                    <div className="panel-title">⚙️ Properties</div>
                </div>
                <div className="panel-empty">
                    <div className="empty-icon">🎯</div>
                    <div className="empty-title">No node selected</div>
                    <div className="empty-desc">
                        Click on a node to view and edit its properties
                    </div>
                </div>
            </div>
        );
    }

    const { id, data } = selectedNode;
    const nodeType = data.nodeType;

    const handleLabelChange = (e) => {
        updateNodeData(id, { label: e.target.value });
    };

    const handleConfigChange = (key, value) => {
        updateNodeData(id, {
            config: { ...data.config, [key]: value }
        });
    };

    const handleDelete = () => {
        deleteNode(id);
    };

    const renderConfigFields = () => {
        const { config } = data;

        // Trigger Nodes
        if (nodeType === 'trigger') {
            switch (config?.triggerType) {
                case 'command':
                    return (
                        <div className="form-group">
                            <label className="label">Command</label>
                            <input
                                type="text"
                                className="input"
                                value={config.command || ''}
                                onChange={(e) => handleConfigChange('command', e.target.value)}
                                placeholder="/start"
                            />
                        </div>
                    );
                case 'message':
                    return (
                        <div className="form-group">
                            <label className="label">Filter (regex or text)</label>
                            <input
                                type="text"
                                className="input"
                                value={config.filter || ''}
                                onChange={(e) => handleConfigChange('filter', e.target.value)}
                                placeholder="Leave empty for any message"
                            />
                        </div>
                    );
                case 'callback':
                    return (
                        <div className="form-group">
                            <label className="label">Callback Data</label>
                            <input
                                type="text"
                                className="input"
                                value={config.callbackData || ''}
                                onChange={(e) => handleConfigChange('callbackData', e.target.value)}
                                placeholder="button_action"
                            />
                        </div>
                    );
                default:
                    return null;
            }
        }

        // Action Nodes
        if (nodeType === 'action') {
            switch (config?.actionType) {
                case 'sendMessage':
                    return (
                        <>
                            <div className="form-group">
                                <label className="label">Message Text</label>
                                <textarea
                                    className="input"
                                    rows={4}
                                    value={config.text || ''}
                                    onChange={(e) => handleConfigChange('text', e.target.value)}
                                    placeholder="Enter your message..."
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Parse Mode</label>
                                <select
                                    className="input"
                                    value={config.parseMode || 'HTML'}
                                    onChange={(e) => handleConfigChange('parseMode', e.target.value)}
                                >
                                    <option value="HTML">HTML</option>
                                    <option value="Markdown">Markdown</option>
                                    <option value="MarkdownV2">MarkdownV2</option>
                                </select>
                            </div>
                        </>
                    );
                case 'sendPhoto':
                    return (
                        <>
                            <div className="form-group">
                                <label className="label">Photo URL</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={config.photoUrl || ''}
                                    onChange={(e) => handleConfigChange('photoUrl', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Caption</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={config.caption || ''}
                                    onChange={(e) => handleConfigChange('caption', e.target.value)}
                                    placeholder="Optional caption"
                                />
                            </div>
                        </>
                    );
                case 'apiRequest':
                    return (
                        <>
                            <div className="form-group">
                                <label className="label">Method</label>
                                <select
                                    className="input"
                                    value={config.method || 'GET'}
                                    onChange={(e) => handleConfigChange('method', e.target.value)}
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="label">URL</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={config.url || ''}
                                    onChange={(e) => handleConfigChange('url', e.target.value)}
                                    placeholder="https://api.example.com"
                                />
                            </div>
                        </>
                    );
                default:
                    return null;
            }
        }

        // Condition Nodes
        if (nodeType === 'condition') {
            return (
                <>
                    <div className="form-group">
                        <label className="label">Left Operand</label>
                        <input
                            type="text"
                            className="input"
                            value={config?.leftOperand || ''}
                            onChange={(e) => handleConfigChange('leftOperand', e.target.value)}
                            placeholder="{{message.text}}"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Operator</label>
                        <select
                            className="input"
                            value={config?.operator || 'equals'}
                            onChange={(e) => handleConfigChange('operator', e.target.value)}
                        >
                            <option value="equals">Equals (==)</option>
                            <option value="notEquals">Not Equals (!=)</option>
                            <option value="contains">Contains</option>
                            <option value="startsWith">Starts With</option>
                            <option value="endsWith">Ends With</option>
                            <option value="greaterThan">Greater Than (&gt;)</option>
                            <option value="lessThan">Less Than (&lt;)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Right Operand</label>
                        <input
                            type="text"
                            className="input"
                            value={config?.rightOperand || ''}
                            onChange={(e) => handleConfigChange('rightOperand', e.target.value)}
                            placeholder="value"
                        />
                    </div>
                </>
            );
        }

        // Delay Nodes
        if (nodeType === 'delay') {
            return (
                <>
                    <div className="form-group">
                        <label className="label">Duration</label>
                        <input
                            type="number"
                            className="input"
                            min="1"
                            value={config?.duration || 1}
                            onChange={(e) => handleConfigChange('duration', parseInt(e.target.value) || 1)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Unit</label>
                        <select
                            className="input"
                            value={config?.unit || 'seconds'}
                            onChange={(e) => handleConfigChange('unit', e.target.value)}
                        >
                            <option value="seconds">Seconds</option>
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                        </select>
                    </div>
                </>
            );
        }

        return null;
    };

    return (
        <div className="properties-panel">
            <div className="panel-header">
                <div className="panel-title">
                    ⚙️ Properties
                    <span className={`node-type-badge ${nodeType}`}>{nodeType}</span>
                </div>
            </div>

            <div className="panel-content">
                <div className="form-group">
                    <label className="label">Node Label</label>
                    <input
                        type="text"
                        className="input"
                        value={data.label || ''}
                        onChange={handleLabelChange}
                    />
                </div>

                <div className="divider" />

                {renderConfigFields()}

                <button className="delete-node-btn" onClick={handleDelete}>
                    🗑️ Delete Node
                </button>
            </div>
        </div>
    );
}
