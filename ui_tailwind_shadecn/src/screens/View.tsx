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
import { Link } from "react-router-dom";
import { Badge, Bell, CircleUser, Home, LineChart, Menu, MenuIcon, Package, Search, SearchIcon, ShoppingCart, UserCircleIcon, Users } from "lucide-react";
import { Logo } from "@/components/custom_ui/Svg";
import MonacoEditorComponent from "@/components/custom_ui/code_editor/CodeEditor";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function View() {

  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };
  const [activeTab, setActiveTab] = useState('html');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  return (

    <>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}> 
          <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6 bg-primary ">
            <Logo /> <h3 className=" px-2 font-bold">Components</h3>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
 
            <Link
                to={`/`}
                className="bg-muted hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
              >
                All
            </Link>

              <Link
                to={`/`}
                className="hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
              >
                Nav{" "}
              </Link>
              <Link
                to={`/`}
                className="hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
              >
                Cards
              </Link>
              <Link
                to={`/`}
                className="hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
              >
                Buttons
              </Link>
            </nav>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex flex-col">

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
                    <Link
                      to={`/`}
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Logo />
                      <span className="sr-only">Components</span>
                    </Link>
                    {/* <Link
                      to={`/`}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link> */}
                    <Link
                      to={`/`}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                      All
                    </Link>
                    <Link
                      to={`/`}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      Nav
                    </Link>
                    <Link
                      to={`/`}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      Cards
                    </Link>
                    <Link
                      to={`/`}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      Buttons
                    </Link>
                  </nav>

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
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
              <div className="flex min-h-screen w-full flex-col">
                <main className="flex flex-1 flex-col gap-4 md:gap-4 ">

                {/* <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                    <h1 className="md:text-2xl text-1xl font-medium">
                      Make Devlelopment with our powerfull extensions
                    </h1>
                    <h2 className="text-xs text-indigo-500 tracking-widest font-medium mb-1">
                      Downlod Our Extensions
                    </h2>
                  </div> */}

                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                      <div className="relative">
                        <div className="absolute p-4 right-0 top-0">
                          <Switch onChange={handleSwitchToggle} />
                        </div>
                        <OutputsOfComponents html={html} css={css} js={js} type={ComponentType.VIEW} mode={isSwitchOn} />
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
                          {activeTab === 'html' && <MonacoEditorComponent language="html" value={html} onChange={setHtml} />}
                          {activeTab === 'css' && <MonacoEditorComponent language="css" value={css} onChange={setCss} />}
                          {activeTab === 'javascript' && <MonacoEditorComponent language="javascript" value={js} onChange={setJs} />}

                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </main>
              </div>
            </main>

          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

    



    </>

  )
}
