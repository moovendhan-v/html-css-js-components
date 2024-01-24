import React from "react";

const OutputsOfComponents = ({ html, css, js }) => {
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
    <div className="">
      <iframe
        title="output"
        srcDoc={iframeContent}
        style={{ width: "100%", height: "40vh" }}
      />
    </div>
  );
};

export default OutputsOfComponents;