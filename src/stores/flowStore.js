import { create } from 'zustand';

// Initial nodes for demonstration
const initialNodes = [
  {
    id: 'start-1',
    type: 'triggerNode',
    position: { x: 250, y: 100 },
    data: {
      label: 'On /start Command',
      nodeType: 'trigger',
      config: {
        triggerType: 'command',
        command: '/start'
      }
    }
  }
];

const initialEdges = [];

export const useFlowStore = create((set, get) => ({
  // Flow Data
  nodes: initialNodes,
  edges: initialEdges,

  // Selected State
  selectedNode: null,
  selectedEdge: null,

  // Platform & Bot Config
  platform: 'telegram',
  botConfig: {
    name: 'My Bot',
    token: ''
  },

  // Node Operations
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    const { nodes } = get();
    // Apply changes to nodes
    const updatedNodes = applyNodeChanges(changes, nodes);
    set({ nodes: updatedNodes });
  },

  onEdgesChange: (changes) => {
    const { edges } = get();
    const updatedEdges = applyEdgeChanges(changes, edges);
    set({ edges: updatedEdges });
  },

  onConnect: (connection) => {
    const { edges } = get();
    const newEdge = {
      ...connection,
      id: `edge-${nanoid(6)}`,
      type: 'smoothstep',
      animated: true
    };
    set({ edges: [...edges, newEdge] });
  },

  addNode: (type, position) => {
    const { nodes } = get();
    const nodeConfig = getNodeConfig(type);
    const newNode = {
      id: `${type}-${nanoid(6)}`,
      type: nodeConfig.componentType,
      position,
      data: {
        label: nodeConfig.label,
        nodeType: nodeConfig.category,
        config: { ...nodeConfig.defaultConfig }
      }
    };
    set({ nodes: [...nodes, newNode] });
    return newNode;
  },

  updateNodeData: (nodeId, updates) => {
    const { nodes } = get();
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            ...updates,
            config: updates.config
              ? { ...node.data.config, ...updates.config }
              : node.data.config
          }
        };
      }
      return node;
    });
    set({ nodes: updatedNodes });
  },

  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    set({
      nodes: nodes.filter(n => n.id !== nodeId),
      edges: edges.filter(e => e.source !== nodeId && e.target !== nodeId),
      selectedNode: null
    });
  },

  // Selection
  setSelectedNode: (node) => set({ selectedNode: node, selectedEdge: null }),
  setSelectedEdge: (edge) => set({ selectedEdge: edge, selectedNode: null }),
  clearSelection: () => set({ selectedNode: null, selectedEdge: null }),

  // Platform & Config
  setPlatform: (platform) => set({ platform }),
  setBotConfig: (config) => set({ botConfig: { ...get().botConfig, ...config } }),

  // Save & Load
  exportFlow: () => {
    const { nodes, edges, platform, botConfig } = get();
    return JSON.stringify({ nodes, edges, platform, botConfig }, null, 2);
  },

  importFlow: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      set({
        nodes: data.nodes || [],
        edges: data.edges || [],
        platform: data.platform || 'telegram',
        botConfig: data.botConfig || { name: 'My Bot', token: '' }
      });
      return true;
    } catch (e) {
      console.error('Failed to import flow:', e);
      return false;
    }
  },

  // Reset
  resetFlow: () => set({
    nodes: initialNodes,
    edges: initialEdges,
    selectedNode: null,
    selectedEdge: null
  })
}));

// Helper to apply node changes (position, selection, etc)
function applyNodeChanges(changes, nodes) {
  let result = [...nodes];
  for (const change of changes) {
    if (change.type === 'position' && change.position) {
      result = result.map(n =>
        n.id === change.id ? { ...n, position: change.position } : n
      );
    } else if (change.type === 'remove') {
      result = result.filter(n => n.id !== change.id);
    }
  }
  return result;
}

// Helper to apply edge changes
function applyEdgeChanges(changes, edges) {
  let result = [...edges];
  for (const change of changes) {
    if (change.type === 'remove') {
      result = result.filter(e => e.id !== change.id);
    }
  }
  return result;
}

// Node type configurations
function getNodeConfig(type) {
  const configs = {
    // Triggers
    commandTrigger: {
      label: 'Command Trigger',
      category: 'trigger',
      componentType: 'triggerNode',
      defaultConfig: { triggerType: 'command', command: '/start' }
    },
    messageTrigger: {
      label: 'Message Received',
      category: 'trigger',
      componentType: 'triggerNode',
      defaultConfig: { triggerType: 'message', filter: '' }
    },
    callbackTrigger: {
      label: 'Button Clicked',
      category: 'trigger',
      componentType: 'triggerNode',
      defaultConfig: { triggerType: 'callback', callbackData: '' }
    },

    // Actions
    sendMessage: {
      label: 'Send Message',
      category: 'action',
      componentType: 'actionNode',
      defaultConfig: { actionType: 'sendMessage', text: '', parseMode: 'HTML' }
    },
    sendPhoto: {
      label: 'Send Photo',
      category: 'action',
      componentType: 'actionNode',
      defaultConfig: { actionType: 'sendPhoto', photoUrl: '', caption: '' }
    },
    sendButtons: {
      label: 'Send Buttons',
      category: 'action',
      componentType: 'actionNode',
      defaultConfig: { actionType: 'sendButtons', text: '', buttons: [] }
    },
    apiRequest: {
      label: 'API Request',
      category: 'action',
      componentType: 'actionNode',
      defaultConfig: { actionType: 'apiRequest', url: '', method: 'GET' }
    },

    // Logic
    condition: {
      label: 'Condition',
      category: 'condition',
      componentType: 'conditionNode',
      defaultConfig: { leftOperand: '', operator: 'equals', rightOperand: '' }
    },
    delay: {
      label: 'Delay',
      category: 'delay',
      componentType: 'delayNode',
      defaultConfig: { duration: 1, unit: 'seconds' }
    }
  };

  return configs[type] || configs.sendMessage;
}

// Simple nanoid polyfill for browser
function nanoid(size = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
