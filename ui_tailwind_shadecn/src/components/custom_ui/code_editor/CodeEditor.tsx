import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void; // Modify onChange prop to accept a string parameter
}

const MonacoEditorComponent: React.FC<MonacoEditorProps> = ({ language, value, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = monaco.editor.create(document.getElementById('editor-container')!, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        suggest: {
          showWords: true,
          showSnippets: true,
        },
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        fontSize: 16
      });

      // Listen to editor changes and call onChange callback
      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current!.getValue()); // Call onChange callback with current editor value
      });
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  const handleEditorClick = () => {
    editorRef.current?.focus();
  };

  return <div id="editor-container" style={{ height: '502px' }} onClick={handleEditorClick} />;
};

export default MonacoEditorComponent;
