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
import { MenuIcon, SearchIcon, UserCircleIcon } from "lucide-react";
import { Logo } from "@/components/custom_ui/Svg";
import MonacoEditorComponent from "@/components/custom_ui/code_editor/CodeEditor";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import Extension from "@/components/custom_ui/Extensions";


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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base"  to={`/`}>
            <Logo />
            <span className="sr-only">Logo</span>
          </Link>
          <Link className="text-foreground transition-colors hover:text-foreground"  to={`/`}>
            Dashboard
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground"  to={`/`}>
            Compoents
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground"  to={`/`}>
            Products
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground"  to={`/`}>
            Customers
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground"  to={`/`}>
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="outline">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="flex items-center gap-2 text-lg font-semibold"  to={`/`}>
              <Logo />
                <span className="sr-only">Logo</span>
              </Link>
              <Link className="hover:text-foreground"  to={`/`}>
                Dashboard
              </Link>
              <Link className="text-muted-foreground hover:text-foreground"  to={`/`}>
                Components
              </Link>
              <Link className="text-muted-foreground hover:text-foreground"  to={`/`}>
                Products
              </Link>
              <Link className="text-muted-foreground hover:text-foreground"  to={`/`}>
                Customers
              </Link>
              <Link className="text-muted-foreground hover:text-foreground"  to={`/`}>
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <UserCircleIcon className="h-5 w-5" />
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
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-4">


      <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel>
                      <div className="relative">
                        <div className="absolute p-4 right-0 top-0">
                          <Switch  onChange={handleSwitchToggle} />
                        </div>
                        <OutputsOfComponents html={html} css={css} js={js} type={ComponentType.VIEW} mode={isSwitchOn} />
                      </div>
                </ResizablePanel>
        <ResizableHandle withHandle/>
                <ResizablePanel>
                          <div className="bg-secondary">
                            <div className="">
                            <div className="flex p-3">
                              <nav className="flex space-x-4">
                                <button
                                  className={`focus:outline-none ${activeTab === 'html' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                  onClick={() => setActiveTab('html')}
                                >
                                  HTML
                                </button>
                                <button
                                  className={`focus:outline-none ${activeTab === 'css' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                  onClick={() => setActiveTab('css')}
                                >
                                  CSS
                                </button>
                                <button
                                  className={`focus:outline-none ${activeTab === 'javascript' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
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

      <Extension />

      </main>
    </div>
  )
}
