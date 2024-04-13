import { ComponentType } from "@/enums/iframEnums";
import { CodeIcon, TailwindCss } from "./Svg";

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
  const borderRadius = type === ComponentType.VIEW ? "rounded-l-lg":"rounded-md";
  const iframeContent = `
    <html className="bg-primary " style="width: 100%;height: 100%; position: relative;display: ${type === ComponentType.COMPONENTS ? "flex" : ""};align-items: ${type === ComponentType.COMPONENTS ? "center" : ""};justify-content: center;cursor: pointer;z-index: 1; background:${backgroundColor}; color:${fontColor}">
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
    <div className="relative group">

    {type === ComponentType.COMPONENTS && (
      <div className="hidden group-hover:block absolute bottom-0 right-0 p-2">
        <div className="flex bg-primary p-1">
          <div><CodeIcon /></div>
          <div><p className="text-white">Get Code</p></div>
        </div>
      </div>
    )}

    {type === ComponentType.COMPONENTS && (
      <div className="absolute top-0 left-0 p-2">
        <div className="flex bg-primary p-1 rounded-full">
          <div><p className="text-white"><TailwindCss /></p></div>
          <div><p className="text-white"><TailwindCss /></p></div>
        </div>
      </div>
    )}

    <iframe
      title="output"
      srcDoc={iframeContent}
      style={{ width: "100%", height: type }}
      sandbox="allow-scripts"
      className={`transition-opacity duration-300 ${borderRadius}`}
    />
    </div>
  );
};

export default OutputsOfComponents;