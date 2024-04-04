  import React, { useEffect, useState } from "react";
  import MonacoEditor, { EditorDidMount } from "react-monaco-editor";
  import * as monaco from "monaco-editor";

  interface CodeEditorProps {
    language: string;
    value: string;
    onChange: (value: string) => void;
  }

  const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
    const editorOptions = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: true,
      fontSize: 16,
    };

    useEffect(() => {
      const loadMonacoLanguage = async () => {
        const loader: any = await import("monaco-editor/esm/vs/loader"); // Type assertion to 'any'
        const vsBaseUrl = "/node_modules/monaco-editor/min/vs";
    
        loader.require.config({
          paths: {
            vs: vsBaseUrl,
          },
        });
    
        await new Promise<void>((resolve) => {
          loader.require(["vs/editor/editor.main"], async () => {
            await loader.require([`vs/language/${language}/${language}`], () => {
              loader.require(["vs/editor/editor.main"], () => {
                if (monaco.editor) {
                  monaco.editor.layout();
                }
              });
    
              resolve();
            });
          });
        });
      };
    
      loadMonacoLanguage();
    }, [language]);
    

    const handleEditorDidMount: EditorDidMount = (editor) => {
      // Access the editor instance if needed
      // console.log(`Editor for ${language} instance:`, editor);
    };

    return (
      <div className={`tab-pane fade ${language === 'html' ? 'active show' : ''}`} id={language} role="tabpanel">
        <MonacoEditor
          height="60vh"
          language={language}
          theme="vs-dark"
          value={value}
          options={editorOptions}
          editorDidMount={handleEditorDidMount}
          onChange={onChange}
        />
      </div>
    );
  };

  interface OutputScreenProps {
    html: string;
    css: string;
    js: string;
  }

  const OutputScreen: React.FC<OutputScreenProps> = ({ html, css, js }) => {
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
        <div>
          <iframe
            title="output"
            srcDoc={iframeContent}
            style={{ width: "100%", height: "60vh" }}
          />
        </div>
      </div>
    );
  };

  const WebEditor: React.FC = () => {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");

    const handleHtmlChange = (newValue: string) => {
      setHtml(newValue);
    };

    const handleCssChange = (newValue: string) => {
      setCss(newValue);
    };

    const handleJsChange = (newValue: string) => {
      setJs(newValue);
    };

    return (
      <div className="m-5">
        <div className="row rounded-1bg-grey">
          <div className="col-6 position-relative comp-bg code_editor rounded-start border border-end-0">
            <OutputScreen html={html} css={css} js={js} />
            <div className="bg-dark col-resize position-absolute col-resize-line"></div>
          </div>
          <div className="col-6 code_editor">
            <ul className="nav nav-pills bg-theme p-2" id="codeTabs" role="tablist">
              <li className="nav-item active" role="presentation">
                <a className="nav-link p-1 active" id="html-tab" data-bs-toggle="pill" href="#html" role="tab" aria-controls="html" aria-selected="true">HTML</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link p-1" id="css-tab" data-bs-toggle="pill" href="#css" role="tab" aria-controls="css" aria-selected="false">CSS</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link p-1" id="javascript-tab" data-bs-toggle="pill" href="#javascript" role="tab" aria-controls="javascript" aria-selected="false">JavaScript</a>
              </li>
            </ul>
            <div className="tab-content">
              <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
              <CodeEditor language="css" value={css} onChange={handleCssChange} />
              <CodeEditor language="javascript" value={js} onChange={handleJsChange} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default WebEditor;
