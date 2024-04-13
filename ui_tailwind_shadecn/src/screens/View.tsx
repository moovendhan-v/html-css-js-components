import OutputsOfComponents from "@/components/custom_ui/OutputComponents"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ComponentType } from "@/enums/iframEnums";
// import CodeEditor from '@/components/custom_ui/code_editor/Editor';

import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Link, useParams } from "react-router-dom";
import { CircleUser, Menu, Search } from "lucide-react";
import { LeftArrow, Logo, LogoPlain } from "@/components/custom_ui/Svg";
import MonacoEditorComponent from "@/components/custom_ui/code_editor/CodeEditor";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { useCategoriesStore } from '@/store/store';
import { fetchCategories } from '@/api/components/categories';
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton";
import { fetchComponentStore } from '@/api/components/component';
import { ComponentStore, } from '@/types/ComponentStore.type';
import { ViewSkeleton } from "@/components/custom_ui/skeleton/ViewSkeleton";

export function View() {

  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [componentDetails, setComponentDetails] = useState<ComponentStore | null>(null);
  type componentParamType = {
    categorie: string;
    title: string;
  };

  const { categorie = "", title = "" } = useParams<componentParamType>();

  const defaultCategorie = categorie === null ? "all" : categorie;
  const defaultTitle = title === null ? "error" : title;

  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };
  const fetchComponentDetails = async () => {
    try {
      const componentStore = await fetchComponentStore(defaultCategorie, defaultTitle);
      setComponentDetails(componentStore);
      console.log(componentDetails);

    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching component details:', error);
    }
  };

  const [activeTab, setActiveTab] = useState('html');

  const categries = useCategoriesStore((state) => state.categories);

  useEffect(() => {
    // this function is calling from api folder it will automatically update to the store 
    fetchCategories();
    fetchComponentDetails();
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (!footer) return;

      const navbar = document.querySelector('.flex-1') as HTMLElement;
      const footerPosition = footer.getBoundingClientRect().top;

      setIsSticky(window.scrollY > navbar.offsetTop);
      if (footerPosition <= window.innerHeight) {
        navbar.style.position = 'relative';
      } else {
        navbar.style.position = 'fixed';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <header className="body-font">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0">
            <LogoPlain />
            <span className="ml-3 text-xl font-semibold">Ui-Components</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l	flex flex-wrap items-center text-base justify-center font-semibold">
            <a className="mr-5 hover:text-white">About Us</a>
            <a className="mr-5 hover:text-white">Contact Us</a>
            <a className="mr-5 hover:text-white">All Components</a>
          </nav>
          <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Button
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      {componentDetails === null ? (
        // Render loader while componentDetails is null
        <ViewSkeleton />
      ) : (
        // Render content once componentDetails is fetched
        <div>
          <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
            <div className="">
              <div className={`${isSticky}`}>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
                  {categries.length > 0 ? (
                    categries.map((category, index) => (
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
              </div>
            </div>
            <div className="flex flex-col">

            
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
                <div className="flex min-h-screen w-full flex-col">
                  <main className="flex flex-1 flex-col gap-4 md:gap-4 ">
                    <div className="flex justify-between items-center">
                      
                      <div className="flex items-center">
                        <span className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"><LeftArrow />  Go Back</span>
                        <h1 className="px-3 md:text-2xl text-1xl font-medium">
                        Awesome Buttons
                      </h1>
                      </div>
                    
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

                    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
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

                    <nav className="grid gap-2 text-lg font-medium">
                      {categries.length > 0 ? (
                        categries.map((category, index) => (
                          <div className="transition duration-1000 ease-in-out">
                            <Link
                              key={index}
                              to={`/${category}`} // Assuming each category corresponds to a route
                              className="text-lg font-semibold hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground my-1"
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

                  </SheetContent>

                </Sheet>
                <div className="w-full flex-1">
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>

                    </div>
                    <ResizablePanelGroup direction="horizontal">
                      <ResizablePanel>
                        <div className="relative">
                          <div className="absolute p-4 right-0 top-0">
                            <Switch onChange={handleSwitchToggle} />
                          </div>
                          <OutputsOfComponents html={componentDetails.html} css={componentDetails.css} js={componentDetails.js} type={ComponentType.VIEW} mode={isSwitchOn} />
                        </div>
                      </ResizablePanel>
                      <ResizableHandle className="px-1" withHandle />
                      <ResizablePanel>
                        <div className="bg-secondary">
                          <div className="">
                            <div className="flex p-3">
                              <nav className="flex space-x-4">
                                <button
                                  className={`focus:outline-none ${activeTab === 'html' ? 'text-blue-500 border-blue-500' : 'text-gray-500'}`}
                                  onClick={() => setActiveTab('html')}
                                >
                                  HTML
                                </button>
                                <button
                                  className={`focus:outline-none ${activeTab === 'css' ? 'text-blue-500 border-blue-500' : 'text-gray-500'}`}
                                  onClick={() => setActiveTab('css')}
                                >
                                  CSS
                                </button>
                                <button
                                  className={`focus:outline-none ${activeTab === 'javascript' ? 'text-blue-500 border-blue-500' : 'text-gray-500'}`}
                                  onClick={() => setActiveTab('javascript')}
                                >
                                  JavaScript
                                </button>
                              </nav>
                            </div>
                            {activeTab === 'html' && (
                              <MonacoEditorComponent
                                language="html"
                                value={componentDetails?.html || ''}
                                onChange={(value) => {
                                  setComponentDetails((prevDetails) => ({
                                    ...prevDetails,
                                    html: value,
                                    css: prevDetails?.css || '',
                                    js: prevDetails?.js || ""
                                  }));
                                }}
                              />
                            )}
                            {activeTab === 'css' && <MonacoEditorComponent language="css" value={componentDetails?.css || ''}  onChange={(value) => {
                                  setComponentDetails((prevDetails) => ({
                                    ...prevDetails,
                                    html: prevDetails?.html || "",
                                    css: value,
                                    js: prevDetails?.js || ""
                                  }));
                                }}/>}
                            {activeTab === 'javascript' && <MonacoEditorComponent language="javascript" value={componentDetails?.js || ''} onChange={(value) => {
                                  setComponentDetails((prevDetails) => ({
                                    ...prevDetails,
                                    html: prevDetails?.html || "",
                                    css: prevDetails?.css || '',
                                    js: value
                                  }));
                                }} />}
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>

                    <div className="bg-secondary rounded">
                      {/* <a className="inline-flex items-center">
                    <img
                      alt="blog"
                      src="https://dummyimage.com/104x104"
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium ">
                        Holden Caulfield
                      </span>
                      <span className=" text-xs tracking-widest mt-0.5">
                        UI DEVELOPER
                      </span>
                    </span>
                  </a> */}
                    </div>

                    <header className=" bg-gray-900 body-font">
                      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                          <Logo />
                          <span className="ml-3 text-xl">User Profile</span>
                        </a>
                        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                          <span>100 </span>
                          <a className="mr-5 hover:text-white">Likes</a>
                          <span>100 </span>
                          <a className="mr-5 hover:text-white">Comments</a>
                          <div className="flex">
                            <span>100</span>
                          </div>
                          <a className="mr-5 hover:text-white">Saves</a>
                        </nav>
                        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                          Button
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </header>


                  </main>
                </div>
              </main>

            </div>
          </div>
        </div>
      )}



    </>

  )
}
