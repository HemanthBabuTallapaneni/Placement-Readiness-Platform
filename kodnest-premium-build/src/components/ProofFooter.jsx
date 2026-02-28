import React from 'react';

function ProofFooter() {
    return (
        <footer className="proof-footer">
            <div className="proof-checklist">
                <div className="proof-item">
                    <label className="checkbox-label">
                        <input type="checkbox" className="proof-checkbox" />
                        <span className="checkbox-text">UI Built</span>
                    </label>
                    <input type="text" className="proof-input" placeholder="Paste UI confirmation..." />
                </div>
                <div className="proof-item">
                    <label className="checkbox-label">
                        <input type="checkbox" className="proof-checkbox" />
                        <span className="checkbox-text">Logic Working</span>
                    </label>
                    <input type="text" className="proof-input" placeholder="Paste logic validation..." />
                </div>
                <div className="proof-item">
                    <label className="checkbox-label">
                        <input type="checkbox" className="proof-checkbox" />
                        <span className="checkbox-text">Test Passed</span>
                    </label>
                    <input type="text" className="proof-input" placeholder="Paste test result link..." />
                </div>
                <div className="proof-item">
                    <label className="checkbox-label">
                        <input type="checkbox" className="proof-checkbox" />
                        <span className="checkbox-text">Deployed</span>
                    </label>
                    <input type="text" className="proof-input" placeholder="Paste deployment URL..." />
                </div>
            </div>
        </footer>
    );
}

export default ProofFooter;
