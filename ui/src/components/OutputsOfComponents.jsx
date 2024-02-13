import React from "react";

const OutputsOfComponents = ({ html, css, js }) => {
  const iframeContent = `
  <html className="myBox" style="width: 100%;height: 100%; position: relative;display: flex;align-items: center;justify-content: center;cursor: pointer;z-index: 1;">
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
    <div className="">
      <iframe
        title="output"
        srcDoc={iframeContent}
        style={{ width: "100%", height: "210px" }}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default OutputsOfComponents;