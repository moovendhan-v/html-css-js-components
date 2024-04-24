import { ComponentType } from "@/enums/iframEnums";
import { CodeIcon, TailwindCss } from "./Svg";
import { ComponentData } from "@/types/ComponentData.type"
import { ComponentStore } from "@/types/ComponentStore.type";

interface OutputOfComponentsProps {
  componentsDetails?: ComponentData;
  type?: ComponentType;
  isDarkMode?: boolean;
}

const OutputsOfComponents: React.FC<OutputOfComponentsProps> = ({ componentsDetails, type, isDarkMode = false }) => {
  const backgroundColor = isDarkMode === true ? '#1e1e1e' : 'whitesmoke';
  const fontColor = type === ComponentType.VIEW ? 'white' : "black";
  const borderRadius = type === ComponentType.VIEW ? "rounded-l-lg" : "rounded-md";
  const iframeContent = `
    <html className="bg-primary " style="width: 100%;height: 100%; position: relative;display: ${type === ComponentType.COMPONENTS ? "flex" : ""};align-items: ${type === ComponentType.COMPONENTS ? "center" : ""};justify-content: center;cursor: pointer;z-index: 1; background:${backgroundColor}; color:${fontColor}">
        <head>
          <style>${componentsDetails?.css}</style>
        </head>
        <body>
          ${componentsDetails?.html}
          <script>${componentsDetails?.js}</script>
        </body>
      </html>
    `;

  return (
    <>
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
      <a className=" items-center">
        <span className="flex justify-between flex-row pt-1">
          <span className="title-font font-medium">{componentsDetails?.title}</span>
          <span className="title-font font-thin text-gray-200">{componentsDetails?.admin.name}</span>
        </span>
      </a>
    </>


  );
};

const OutputViewComponents: React.FC<ComponentStore> = ({ html, css, js }) => {
  const backgroundColor = '#1e1e1e'
  const iframe = `
    <html className=""style="width: 100%; background:${backgroundColor}; height: 100%; position: relative; justify-content: center;cursor: pointer;z-index: 1;">
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
    <>
     <div className="relative group">
      <iframe
        title="output"
        srcDoc={iframe}
        style={{ width: "100%", height: "500px" }}
        sandbox="allow-scripts"
        className={`transition-opacity duration-300`}
      />
    </div>
    </>
  )

}

export default OutputsOfComponents;
export { OutputViewComponents };