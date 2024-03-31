import { ComponentType } from "@/enums/iframEnums";

interface OutputOfComponentsProps {
  html?: string;
  css?: string;
  js?: string;
  type?: ComponentType;
  mode?: boolean;
}

const OutputsOfComponents: React.FC<OutputOfComponentsProps> = ({ html, css, js, type, mode }) => {
  const backgroundColor = mode === true ? '#1e1e1e' : 'whitesmoke';
  const fontColor = type === ComponentType.VIEW ? 'white' : "black";
  const iframeContent = `
    <html className="bg-primary" style="width: 100%;height: 100%; position: relative;display: ${type === ComponentType.COMPONENTS ? "flex" : ""};align-items: ${type === ComponentType.COMPONENTS ? "center" : ""};justify-content: center;cursor: pointer;z-index: 1; background:${backgroundColor}; color:${fontColor}">
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
        className=" transition-opacity duration-300"
      />
    </div>
  ); ``
};

export default OutputsOfComponents;