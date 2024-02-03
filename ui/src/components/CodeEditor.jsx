import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { useSelector } from "react-redux";
import * as monaco from "monaco-editor";
import {SvgIcons} from "./Button";


// useEffect(()=>{
//   const componentsPropertyName = `components_buttons`;
//   const components = useSelector((state) => state.components[componentsPropertyName]);
// },[])



const CodeEditor = ({ language, value, onChange }) => {

  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    fontSize: 16,
  };

  useEffect(() => {
    // Load the Monaco Editor language dynamically
    const loadMonacoLanguage = async () => {
      // Use Monaco Editor's AMD loader
      const loader = require("monaco-editor/esm/vs/loader");
      const vsBaseUrl = "/node_modules/monaco-editor/min/vs"; // Adjust the path based on your project structure

      loader.require.config({
        paths: {
          vs: vsBaseUrl,
        },
      });

      await loader.require(["vs/editor/editor.main"], async () => {
        // Load the language dynamically
        await loader.require([`vs/language/${language}/${language}`], () => {
          // Trigger a layout refresh after loading the language
          monaco.editor.onDidCreateEditor(() => {
            monaco.editor.layout();
          });
        });
      });
    };

    loadMonacoLanguage();
  }, [language]);

  const handleEditorDidMount = (editor) => {
    // Access the editor instance if needed
    console.log(`Editor for ${language} instance:`, editor);
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
      <div >
        <iframe
          title="output"
          srcDoc={iframeContent}
          style={{ width: "100%", height: "60vh" }}
        />
      </div>
    </div>
  );
};

const WebEditor = () => {

  // const componentsPropertyName = `components_buttons`;
  // const components = useSelector((state) => state.components.components_buttons);
  // const componentsString = JSON.stringify(components, null, 2);
  // console.log(componentsString);


  const [html, setHtml] = useState(`<div> we-lcome to agricreations</div>`);
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

  // handleHtmlChange(components[0].post_details.html);


  return (
    // #TODO here we need to do that drag to adjust the screens 
    <div className=" m-5 ">
      <div className="row rounded-1bg-grey">
        <div className="col-6 position-relative  bg-light code_editor rounded-start border border-end-0">
          <OutputScreen html={html} css={css} js={js} />
        <div className="bg-dark col-resize position-absolute col-resize-line">

        </div>
        </div>
        <div className="col-6 code_editor">
          <ul className="nav nav-pills bg-theme p-2" id="codeTabs" role="tablist">
            <li className="nav-item active" role="presentation">
              <a class="nav-link p-1  active" id="html-tab" data-bs-toggle="pill" href="#html" role="tab" aria-controls="html" aria-selected="true"><SvgIcons icon={"html"} />HTML</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link p-1 " id="css-tab" data-bs-toggle="pill" href="#css" role="tab" aria-controls="css" aria-selected="false"><SvgIcons icon={"css"} />CSS</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link p-1 " id="javascript-tab" data-bs-toggle="pill" href="#javascript" role="tab" aria-controls="javascript" aria-selected="false"><SvgIcons icon={"javascript"} />JavaScript</a>
            </li>

          </ul>
          <div className="tab-content ">
            <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
            <CodeEditor language="css" value={css} onChange={handleCssChange} />
            <CodeEditor language="javascript" value={js} onChange={handleJsChange} />
            {/* <OutputScreen html={html} css={css} js={js} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebEditor;

