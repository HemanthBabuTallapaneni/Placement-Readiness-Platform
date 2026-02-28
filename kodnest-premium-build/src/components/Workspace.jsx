import React from 'react';

function Workspace() {
    return (
        <div className="workspace-container">
            <div className="primary-workspace">
                <div className="card">
                    <h2 className="card-title">Token Configuration</h2>
                    <div className="input-group">
                        <label className="input-label">Background Color Hex</label>
                        <input type="text" className="text-input" defaultValue="#F7F6F3" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Primary Text Hex</label>
                        <input type="text" className="text-input" defaultValue="#111111" />
                    </div>
                    <div className="button-group">
                        <button className="btn-secondary">Reset Defaults</button>
                        <button className="btn-primary">Apply Tokens</button>
                    </div>
                </div>
            </div>
            <aside className="secondary-panel">
                <div className="step-explanation">
                    <h3 className="panel-title">Current Step</h3>
                    <p className="panel-text">Set up the initial design tokens and global layout spacing. Ensure the 4-color limit is respected.</p>
                </div>
                <div className="prompt-box">
                    <label className="prompt-label">Current Prompt</label>
                    <textarea className="prompt-textarea" readOnly value="Apply the premium SaaS token system #F7F6F3, #111111, #8B0000."></textarea>
                    <button className="btn-secondary btn-small">Copy Prompt</button>
                </div>
                <div className="action-stack">
                    <button className="btn-secondary">Build in Lovable</button>
                    <button className="btn-secondary">It Worked</button>
                    <button className="btn-secondary">Error</button>
                    <button className="btn-secondary">Add Screenshot</button>
                </div>
            </aside>
        </div>
    );
}

export default Workspace;
