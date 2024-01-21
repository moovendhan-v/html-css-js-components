import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ language, value, onChange }) => {
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  const handleEditorDidMount = (editor) => {
    // Access the editor instance if needed
    console.log(`Editor for ${language} instance:`, editor);
  };

  return (
<div className={`tab-pane fade ${language === 'html' ? 'active show' : ''}`} id={language} role="tabpanel">
      {/* <h4 className="text-center">{language.toUpperCase()}</h4> */}
      <MonacoEditor
        height="40vh"
        language={language}
        theme="vs-dark"
        value={value}
        options={{
          ...editorOptions,
          fontSize: 16,
        }}
        editorDidMount={handleEditorDidMount}
        onChange={onChange}
      />
    </div>
  );
};

const OutputScreen = ({ html, css, js }) => {
  const iframeContent = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="" id="output">
      <h4 className="text-center">Output</h4>
     <div >
     <iframe
        title="output"
        srcDoc={iframeContent}
        style={{ width: "100%", height: "40vh" }}
      />
     </div>
    </div>
  );
};

const WebEditor = () => {
  const [html, setHtml] = useState('<div>Hello, CodePen Clone!</div>');
  const [css, setCss] = useState('div { color: blue; }');
  const [js, setJs] = useState('console.log("Hello, CodePen Clone!");');

  const handleHtmlChange = (newValue) => {
    setHtml(newValue);
  };

  const handleCssChange = (newValue) => {
    setCss(newValue);
  };

  const handleJsChange = (newValue) => {
    setJs(newValue);
  };

  return (
    <div className="container mt-3">
      <div className="row rounded-1 p-3 bg-grey">
        <div className="col-8 ">
        <ul className="nav nav-pills" id="codeTabs" role="tablist">
        <li className="nav-item active" role="presentation">
        <a class="nav-link active" id="html-tab" data-bs-toggle="pill" href="#html" role="tab" aria-controls="html" aria-selected="true">HTML</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="css-tab" data-bs-toggle="pill" href="#css" role="tab" aria-controls="css" aria-selected="false">CSS</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="javascript-tab" data-bs-toggle="pill" href="#javascript" role="tab" aria-controls="javascript" aria-selected="false">JavaScript</a>
        </li>
       
      </ul>
      <div className="tab-content my-3">
        <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
        <CodeEditor language="css" value={css} onChange={handleCssChange} />
        <CodeEditor language="javascript" value={js} onChange={handleJsChange} />
        {/* <OutputScreen html={html} css={css} js={js} /> */}
      </div>
        </div>
        <div className="col-4 my-3">
            <OutputScreen html={html} css={css} js={js} />
        </div>
      </div>
     
    </div>
  );
};

export default WebEditor;
