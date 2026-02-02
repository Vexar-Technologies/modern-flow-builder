import { useState, useRef } from 'react';
import { useFlowStore } from '../stores/flowStore';
import '../styles/header.css';

const platforms = [
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: '#0088cc' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25d366' },
    { id: 'slack', name: 'Slack', icon: '💼', color: '#4a154b' },
    { id: 'raven', name: 'Raven', icon: '🦅', color: '#6366f1' }
];

export function Header() {
    const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const fileInputRef = useRef(null);

    const {
        platform,
        setPlatform,
        botConfig,
        setBotConfig,
        exportFlow,
        importFlow
    } = useFlowStore();

    const currentPlatform = platforms.find(p => p.id === platform) || platforms[0];

    const handleSave = () => {
        const flowJson = exportFlow();
        const blob = new Blob([flowJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${botConfig.name || 'bot-flow'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoad = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result;
            if (typeof content === 'string') {
                importFlow(content);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <div className="header-logo">
                        <span className="logo-icon">🤖</span>
                        <span>FlowBot Studio</span>
                    </div>

                    <div className="header-divider" />

                    <div style={{ position: 'relative' }}>
                        <div
                            className="platform-selector"
                            onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                        >
                            <span className="platform-icon">{currentPlatform.icon}</span>
                            <span className="platform-name">{currentPlatform.name}</span>
                            <span className="dropdown-icon">▼</span>
                        </div>

                        {showPlatformDropdown && (
                            <div className="platform-dropdown">
                                {platforms.map(p => (
                                    <div
                                        key={p.id}
                                        className={`platform-option ${platform === p.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setPlatform(p.id);
                                            setShowPlatformDropdown(false);
                                        }}
                                    >
                                        <span className="option-icon">{p.icon}</span>
                                        <span>{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="header-center">
                    <input
                        type="text"
                        className="bot-name-input"
                        value={botConfig.name}
                        onChange={(e) => setBotConfig({ name: e.target.value })}
                        placeholder="Bot Name"
                    />
                </div>

                <div className="header-right">
                    <button
                        className="settings-btn"
                        onClick={() => setShowSettingsModal(true)}
                        title="Settings"
                    >
                        ⚙️
                    </button>

                    <div className="btn-group">
                        <button className="btn btn-secondary" onClick={handleLoad}>
                            📂 Load
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            💾 Save
                        </button>
                    </div>
                </div>
            </header>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {showSettingsModal && (
                <SettingsModal
                    onClose={() => setShowSettingsModal(false)}
                />
            )}
        </>
    );
}

function SettingsModal({ onClose }) {
    const { platform, botConfig, setBotConfig } = useFlowStore();
    const currentPlatform = platforms.find(p => p.id === platform) || platforms[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">⚙️ Bot Settings</div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label className="label">Bot Name</label>
                        <input
                            type="text"
                            className="input"
                            value={botConfig.name}
                            onChange={(e) => setBotConfig({ name: e.target.value })}
                            placeholder="My Bot"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">
                            {currentPlatform.name} Bot Token
                        </label>
                        <input
                            type="password"
                            className="input"
                            value={botConfig.token}
                            onChange={(e) => setBotConfig({ token: e.target.value })}
                            placeholder="Enter your bot token"
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                            Your token is stored locally and never sent to any server.
                        </small>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={onClose}>
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
