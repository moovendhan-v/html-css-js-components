import React, { useState } from 'react';
import MonacoEditorComponent from './CodeEditor';

const CodeEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
    
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <nav className="flex space-x-4">
          <button
            className={`focus:outline-none ${activeTab === 'html' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button
            className={`focus:outline-none ${activeTab === 'css' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button
            className={`focus:outline-none ${activeTab === 'javascript' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('javascript')}
          >
            JavaScript
          </button>
        </nav>
      </div>
      <div className="mt-4">
        {activeTab === 'html' && <MonacoEditorComponent language="html" value={html} onChange={setHtml} />}
        {activeTab === 'css' && <MonacoEditorComponent language="css" value={css} onChange={setCss} />}
        {activeTab === 'javascript' && <MonacoEditorComponent language="javascript" value={js} onChange={setJs} />}
      </div>
    </div>
  );
};

export default CodeEditor;
