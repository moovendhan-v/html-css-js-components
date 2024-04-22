
import {

  Menu,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { Logo } from "@/components/custom_ui/Svg"
import OutputsOfComponents from "@/components/custom_ui/OutputComponents"
import { ComponentType } from "@/enums/iframEnums"
import { useCategoriesStore, useComponentsStore } from "@/store/store"
// import {useLoginStore , useLoginUserInfo} from "@/store/Auth"
import {ComponentsStore, } from '@/types/ComponentStore.type'
import { useEffect } from "react"
import { fetchCategories } from "@/api/components/categories"
import { fetchComponentsStore } from "@/api/components/components"
import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton"
import { CardSkeleton } from "@/components/custom_ui/skeleton/CardSkeleton"
import { useParams } from 'react-router-dom';
import {ComponentData} from '@/types/ComponentData.type';
import { Switch } from "@/components/ui/switch"
import { NavProfile } from "@/components/custom_ui/NavBar/NavProfile"
// import { json } from "stream/consumers"

export function Components() {

  type componentsParamType = {
    catogries?: string;
  };

  const { catogries } = useParams<componentsParamType>();

  // this categries getting from a zustand store 
  const categries = useCategoriesStore((state) => state.categories);
  const components = useComponentsStore((state) => state[catogries as keyof ComponentsStore] ?? 'all');
  // const user = useLoginStore((state)=> state.isLogin);
  // const userInfo = useLoginUserInfo((state)=> state)

  useEffect(() => {
    fetchCategories();
    fetchComponentsStore(catogries ?? '');
  }, [catogries])


  return (
    
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden   md:block">
       <div className="fixed h-full">
       <div className="flex h-full max-h-screen flex-col gap-2 relative">
       <Link to={"/"}>
          <div className="flex h-14 items-center cursor-pointer px-4 lg:h-[60px] lg:p-6">
            <Logo /> <h3 className=" px-2 font-bold">Ui Components</h3>
          </div>
      </Link>
      {/* [mask-image:linear-gradient(to_top,transparent,white_50%,white_100%,transparent)] */}
          <div className="flex-1 overflow-scroll  relative z-20 max-w-7xl ">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
             <div>
             {categries.length > 0 ? (
                categries.map((category, index) => (
                  <div className="transition duration-1000 ease-in-out relative">
                    <Link
                      to={`/${category}`}
                      key={index}
                      className={`${category === catogries ? 'text-primary bg-muted' : ''
                        } hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1`}
                    >
                      {category}
                    </Link>
                  </div>
                ))
              ) : (
                <>
                  <NavSkeleton />
                </>
              )}
             </div>
            </nav>
          </div>

        </div>
       </div>
      </div>
      <div className="flex flex-col px-4">
        <header className="flex h-14 items-center gap-4  lg:h-[60px] ">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium overflow-scroll">
                {categries.length > 0 ? (
                  categries.map((category, index) => (
                    <div className="transition duration-1000 ease-in-out">
                      <Link
                        key={index}
                        to={`/${category}`} // Assuming each category corresponds to a route
                        className="hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
                      >
                        {category}
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <NavSkeleton />
                  </>
                )}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Join With Us </CardTitle>
                    <CardDescription>
                      Join the Revolution of Open Source UI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Joing 
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>

          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Components..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> 
         <NavProfile />
        </header>
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 ">
          <div className="flex space justify-between items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{catogries}  Components</h1>
          <div className="px-2"><Switch id="airplane-mode" defaultChecked/></div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {components.length > 0 ? (
             components.map((component: ComponentData, index: number) => (
                <div className="transition duration-1000 ease-in-out relative">
                  <Link
                    to={`/${component.catogries}/${component.folder_name}`}
                    key={index}
                  >
                    <div ><OutputsOfComponents html={component.html} css={component.css} js={component.js} type={ComponentType.COMPONENTS} />
                      <a className=" items-center">
                        <span className="flex justify-between flex-row pt-1">
                          <span className="title-font font-medium">{component.title}</span>
                          <span className="title-font font-thin text-gray-200">{component.admin.name}</span>
                        </span>
                      </a>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}


          </div>

         
        </main>
      </div>
    </div>
  )
}
