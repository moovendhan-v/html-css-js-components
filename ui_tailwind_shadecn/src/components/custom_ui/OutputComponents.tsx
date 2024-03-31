import { ComponentType } from "@/enums/iframEnums";

interface OutputOfComponentsProps {
    html ?: string;
    css ?: string;
    js ?: string;
    type?: ComponentType;
}

const OutputsOfComponents : React.FC<OutputOfComponentsProps >  = ({ html, css, js, type }) => {
  const iframeContent = `
  <html className="bg-primary" style="width: 100%;height: 100%; position: relative;display: flex;align-items: center;justify-content: center;cursor: pointer;z-index: 1; background-color: whitesmoke;">
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
        style={{ width: "100%", height: type }}
        sandbox="allow-scripts"
        className="hover:opacity-50 transition-opacity duration-300"
      />
    </div>
  );``
};

export default OutputsOfComponents;