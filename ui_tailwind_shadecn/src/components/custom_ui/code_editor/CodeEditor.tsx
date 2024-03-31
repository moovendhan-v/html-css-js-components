import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const MonacoEditorComponent: React.FC<MonacoEditorProps> = ({ language, value, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (!editorRef.current) {
      // Create Monaco Editor instance
      editorRef.current = monaco.editor.create(document.getElementById('editor-container')!, {
        value,
        language,
        theme: 'vs-dark', // Set dark theme
        automaticLayout: true, // Enable automatic layout
        suggest: { // Enable suggestions
          showWords: true,
          showSnippets: true,
        },
  
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        fontSize: 16,
      });

      // Listen to editor changes
      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current!.getValue());
      });
    }

    return () => {
      // Dispose editor instance on component unmount
      editorRef.current?.dispose();
    };
  }, [language]);

  // Update editor value when 'value' prop changes
  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.setValue(value);
  //   }
  // }, [value]);

  // Ensure focus on editor when clicked or focused
  const handleEditorClick = () => {
    editorRef.current?.focus();
    console.log('printing');
    
  };

  return <div id="editor-container" style={{ height: '100vh' }} onClick={handleEditorClick} />
};

export default MonacoEditorComponent;
