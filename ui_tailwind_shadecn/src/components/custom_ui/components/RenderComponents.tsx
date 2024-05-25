import { ComponentType } from "@/enums/iframEnums"
import { ComponentData } from "@/types/ComponentData.type"
import { Link } from "react-router-dom"
import OutputsOfComponents from "../OutputComponents"
import { CardSkeleton } from "../skeleton/CardSkeleton"

interface RenderComponentsType {
  components: ComponentData[] | null;
  type? : ComponentType;
  skeletonCount? : number;
}

export const RenderComponents: React.FC<RenderComponentsType> = ({ components, type, skeletonCount = 9 }) => {
  const count = skeletonCount !== null ? skeletonCount : 9;

  return (
      <>
          {components?.length ?? 0 > 0 ? (
              components?.map((component: ComponentData, index: number) => (
                  <div className="transition duration-1000 ease-in-out relative" key={index}>
                      <Link
                          to={`/${component.categories}/${component.folder_name}`}
                      >
                          <div>
                              <OutputsOfComponents componentsDetails={component} type={type} />
                          </div>
                      </Link>
                  </div>
              ))
          ) : (
              <>
                  {Array.from({ length: count }, (_, index) => (
                      <CardSkeleton key={index} />
                  ))}
              </>
          )}

      </>
  )
}
