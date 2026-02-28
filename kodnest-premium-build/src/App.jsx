import React from 'react';
import './index.css';
import TopBar from './components/TopBar';
import ContextHeader from './components/ContextHeader';
import Workspace from './components/Workspace';
import ProofFooter from './components/ProofFooter';

function App() {
  return (
    <div className="app-container">
      <TopBar />
      <main className="main-content">
        <ContextHeader />
        <Workspace />
      </main>
      <ProofFooter />
    </div>
  );
}

export default App;
