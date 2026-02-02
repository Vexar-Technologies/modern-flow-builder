# Flow Builder UI

A modern, visual drag-and-drop interface for building bot automation flows. This application is built with React and Vite, leveraging `@xyflow/react` for the node-based canvas and `zustand` for state management.

## 🚀 Features

- **Visual Flow Editor**: Intuitive drag-and-drop canvas for designing automation logic.
- **Node Palette**: A library of pre-configured nodes (Triggers, Actions, Logic) to build complex flows.
- **Properties Panel**: Context-aware configuration panel for editing node properties.
- **State Management**: Robust state handling using `zustand` for seamless flow updates.
- **Responsive Design**: Modern UI with a clean structure (Header, Palette, Canvas, Properties).

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Flow Library**: [@xyflow/react](https://reactflow.dev/) (React Flow)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: CSS Modules / Standard CSS

## 📂 Project Structure

```
src/
├── components/          # UI Components
│   ├── canvas/          # Flow canvas implementation
│   ├── nodes/           # Custom node definitions
│   ├── panels/          # Side panels (Palette, Properties)
│   └── Header.jsx       # Application header
├── stores/              # State management (Zustand)
│   └── flowStore.js     # Main store for flow state
├── App.jsx              # Main application layout
└── main.jsx             # Entry point
```

## 🚦 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Development Notes

- **State**: The `flowStore.js` manages the entire state of the flow, including nodes, edges, and selection.
- **Custom Nodes**: New node types should be defined in `src/components/nodes` and registered in the `FlowCanvas` component.
- **Styling**: Global styles are in `index.css`, component-specific styles in `App.css` or component files.

---

*Generated for Flow Builder Project*
# modern-flow-builder
