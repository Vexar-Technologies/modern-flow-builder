import './App.css';
import { Header } from './components/Header';
import { NodePalette } from './components/panels/NodePalette';
import { PropertiesPanel } from './components/panels/PropertiesPanel';
import { FlowCanvas } from './components/canvas/FlowCanvas';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <NodePalette />
        <FlowCanvas />
        <PropertiesPanel />
      </main>
    </div>
  );
}

export default App;
