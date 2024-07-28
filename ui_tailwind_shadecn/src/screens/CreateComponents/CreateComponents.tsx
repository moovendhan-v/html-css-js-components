import { OutputViewComponents } from "@/components/custom_ui/OutputComponents"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Link, useParams } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { LeftArrow, Github, LogoPlain } from "@/components/custom_ui/Svg";
import MonacoEditorComponent from "@/components/custom_ui/code_editor/CodeEditor";
import { useState } from "react";
import { useEffect } from "react";
import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton";
import { fetchComponentStore } from '@/api/components/component';
import { ComponentStore, } from '@/types/ComponentStore.type';
import { ViewSkeleton } from "@/components/custom_ui/skeleton/ViewSkeleton";
import { MovingButton } from "@/components/ui/moving-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { CommandDialogDemo } from "@/components/ui/commandMenu";
import { useCreateComponentsStore } from "@/store/createComponents/create.components";
import Footer from "@/components/custom_ui/Footer"
import { CategriesSlider } from "@/components/custom_ui/slider/CategriesSlider"
import { NavProfile } from "@/components/custom_ui/NavBar/NavProfile"
import { useLoginStore } from "@/store/Auth"
import {ProfileForm} from '@/components/custom_ui/forms/ComponentsSubmitFrom';
import { useCategories } from '@/hooks/useCategories';
// import { SelectValue } from "@/components/ui/select"

export function CreateComponents() {

  const [componentDetails, setComponentDetails] = useState<ComponentStore | null>(null);

  // zustand store 
  const viewCreateCompoentsStore = useCreateComponentsStore((state: { createComponents: any }) => state.createComponents);
  const setCreateComponentField = useCreateComponentsStore((state) => state.setCreateComponentField);

  type componentParamType = {
    categorie: string;
    title: string;
  };

  const userInfo = useLoginStore.getState();

  const { categorie = "", title = "" } = useParams<componentParamType>();

  const defaultCategorie = categorie === null ? "all" : categorie;
  const defaultTitle = title === null ? "error" : title;

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

  const categries = useCategories();


  useEffect(() => {
    // this function is calling from api folder it will automatically update to the store 
    fetchComponentDetails();
  }, [])

  useEffect(() => {
    const handleScroll = () => {
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
   
      {/* <ProfileForm /> */}
      <div className="fixed bottom-0 right-0 p-2 bg-secondary"><CommandDialogDemo /></div>

      <header className="body-font">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0">
            <LogoPlain />
            <Link to="/">
              <span className="ml-3 text-xl font-semibold">Ui-Components</span>
            </Link>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l	flex flex-wrap items-center text-base justify-center font-semibold">
            <a className="mr-5 hover:text-white">About Us</a>
            <a className="mr-5 hover:text-white">Contact Us</a>
            <a className="mr-5 hover:text-white">All Components</a>
          </nav>

          <div className="mr-3">
            <MovingButton
              duration={3000}
              borderRadius="10px"
              className="p-1 mr-3"
            >
              <Github />
              Star On Github
            </MovingButton>
          </div>

          <NavProfile />
        </div>
      </header>

      {componentDetails === null ? (
        <ViewSkeleton />
      ) : (
        <div>
          <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
            <div className="">
              <div className={` sticky top-0`}>

                <CategriesSlider categories={categries} />

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
                          {viewCreateCompoentsStore.title}
                        </h1>
                      </div>

                      <div className="w-full flex-1 flex justify-between">

                        <form>
                          <div className="relative">
                            <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="search"
                                placeholder="Search Components..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-3/3 lg:w-5/3"
                              />
                            </div>
                          </div>
                        </form>

                        <div className="flex justify-between items-center">
                            <ProfileForm />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <HoverBorderGradient
                                  containerClassName="rounded-full"
                                  as="button"
                                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                                >
                                  <span>Submit Components</span>

                                </HoverBorderGradient>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    You were contributing this to open source, so please be concise about that. Do not get this from any other code to open source it, as it may violate our terms and conditions.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Contribute My Component</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>

                            </AlertDialog>
                        </div>
                       

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
                      </header>

                    </div>

                    <ResizablePanelGroup direction="horizontal">
                      <ResizablePanel>
                        <div className="relative">
                          <div className="absolute p-4 right-0 top-0">
                          </div>
                          <OutputViewComponents html={viewCreateCompoentsStore.html} css={viewCreateCompoentsStore.css} js={viewCreateCompoentsStore.js} />
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
                                value={viewCreateCompoentsStore?.html || ''}
                                onChange={(newCode) => {
                                  setCreateComponentField(activeTab, newCode);
                                }}
                              />
                            )}
                            {activeTab === 'css' && <MonacoEditorComponent
                              language="css"
                              value={viewCreateCompoentsStore?.css || ''}
                              onChange={(newCode) => {
                                setCreateComponentField(activeTab, newCode);
                              }} />}
                            {activeTab === 'javascript' && <MonacoEditorComponent language="javascript" value={viewCreateCompoentsStore?.js || ''} onChange={(newCode) => {
                              setCreateComponentField(activeTab, newCode);
                            }} />}
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>

                    <div className="bg-secondary rounded">
                    </div>

                    <header className=" bg-gray-900 body-font">
                      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                          <Avatar>
                            <AvatarImage src={userInfo?.user?.avatar_url || "Please login"} />
                            <AvatarFallback>Profile</AvatarFallback>
                          </Avatar>
                          <Link to={``}>
                            <span className="ml-3 text-xl">{userInfo?.user?.name}</span>
                          </Link>
                        </a>
                      </div>
                    </header>


                  </main>
                </div>
              </main>

            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}