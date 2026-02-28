import React from 'react';

function TopBar() {
    return (
        <header className="top-bar">
            <div className="top-bar-left">
                <span className="project-name">KodNest Premium Build</span>
            </div>
            <div className="top-bar-center">
                <span className="progress-indicator">Step 1 / 4</span>
            </div>
            <div className="top-bar-right">
                <span className="status-badge">Not Started</span>
            </div>
        </header>
    );
}

export default TopBar;
