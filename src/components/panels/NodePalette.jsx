import '../../styles/panels.css';

const nodeCategories = [
    {
        id: 'triggers',
        label: 'Triggers',
        items: [
            { type: 'commandTrigger', icon: '⌘', label: 'Command Trigger', desc: 'On /command' },
            { type: 'messageTrigger', icon: '💬', label: 'Message Received', desc: 'On any message' },
            { type: 'callbackTrigger', icon: '🔘', label: 'Button Clicked', desc: 'On callback query' }
        ]
    },
    {
        id: 'actions',
        label: 'Actions',
        items: [
            { type: 'sendMessage', icon: '📤', label: 'Send Message', desc: 'Send text message' },
            { type: 'sendPhoto', icon: '🖼️', label: 'Send Photo', desc: 'Send image' },
            { type: 'sendButtons', icon: '🔲', label: 'Send Buttons', desc: 'Inline keyboard' },
            { type: 'apiRequest', icon: '🌐', label: 'API Request', desc: 'HTTP request' }
        ]
    },
    {
        id: 'logic',
        label: 'Logic',
        items: [
            { type: 'condition', icon: '🔀', label: 'Condition', desc: 'If/else branch' },
            { type: 'delay', icon: '⏱️', label: 'Delay', desc: 'Wait before next' }
        ]
    }
];

export function NodePalette() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="node-palette">
            <div className="palette-header">
                <h2 className="palette-title">📦 Nodes</h2>
            </div>

            <div className="palette-search">
                <input
                    type="text"
                    className="input"
                    placeholder="Search nodes..."
                />
            </div>

            <div className="palette-content">
                {nodeCategories.map(category => (
                    <div key={category.id} className="node-category">
                        <div className={`category-header ${category.id}`}>
                            <span className="category-icon" />
                            <span>{category.label}</span>
                        </div>
                        <div className="category-items">
                            {category.items.map(item => (
                                <div
                                    key={item.type}
                                    className={`node-item ${category.id.slice(0, -1)}`}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, item.type)}
                                >
                                    <span className="item-icon">{item.icon}</span>
                                    <div>
                                        <div className="item-label">{item.label}</div>
                                        <div className="item-desc">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
