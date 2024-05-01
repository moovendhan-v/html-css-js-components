
// export const Slider : React.FC<{categories: string[]}> = ({categories}) =>{

import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"

export const CategriesSlider : React.FC<{categories: string[]}> = ({categories}) => {
    return(
        <>
         <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <div className="transition duration-1000 ease-in-out">
                        <Link
                          key={index}
                          to={`/${category}`} // Assuming each category corresponds to a route
                          className="text-base font-xs hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-1000 ease-in-out my-1"
                        >
                          {category}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <>
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                    </>
                  )}
                </nav>
        </>
    )
}