
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
  import { useCategoriesStore } from "@/store/store"
  import { useEffect } from "react"
  import { fetchCategories } from "@/api/components/categories"
  import { fetchComponentsStore } from "@/api/components/components"
  import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton"
  import { useParams } from 'react-router-dom';
import { NavProfile } from "@/components/custom_ui/NavBar/NavProfile"
  
  export function Profile() {
  
    type componentsParamType = {
      catogries?: string;
    };
  
    const { catogries } = useParams<componentsParamType>();
  
    // this categries getting from a zustand store 
    const categries = useCategoriesStore((state) => state.categories);
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
           

          <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
  <header>
    <a href="#">
      <img
        className="w-auto h-7 sm:h-8"
        src="https://merakiui.com/images/full-logo.svg"
        alt=""
      />
    </a>
  </header>
  <main className="mt-8">
    <h2 className="text-gray-700 dark:text-gray-200">Hi Olivia,</h2>
    <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
      Alicia has invited you to join the team on{" "}
      <span className="font-semibold ">Meraki UI</span>.
    </p>
    <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
      Accept the invite
    </button>
    <p className="mt-8 text-gray-600 dark:text-gray-300">
      Thanks, <br />
      Meraki UI team
    </p>
  </main>
  <footer className="mt-8">
    <p className="text-gray-500 dark:text-gray-400">
      This email was sent to{" "}
      <a
        href="#"
        className="text-blue-600 hover:underline dark:text-blue-400"
        target="_blank"
      >
        contact@merakiui.com
      </a>
      . If you'd rather not receive this kind of email, you can{" "}
      <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
        unsubscribe
      </a>{" "}
      or{" "}
      <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
        manage your email preferences
      </a>
      .
    </p>
    <p className="mt-3 text-gray-500 dark:text-gray-400">
      © {"{"}
      {"{"} new Date().getFullYear() {"}"}
      {"}"} Meraki UI. All Rights Reserved.
    </p>
  </footer>
</section>

          </main>
        </div>
      </div>
    )
  }
  