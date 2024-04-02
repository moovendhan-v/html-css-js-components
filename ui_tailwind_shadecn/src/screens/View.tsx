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
import {  CircleUser, Menu, Search } from "lucide-react";
import { LeftArrow, Logo, SaveIcon } from "@/components/custom_ui/Svg";
import MonacoEditorComponent from "@/components/custom_ui/code_editor/CodeEditor";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { cn } from "@/lib/utils";
// import React from "react";



export function View() {

  // const frameworks = [
  //   {
  //     value: "next.js",
  //     label: "Next.js",
  //   },
  //   {
  //     value: "sveltekit",
  //     label: "SvelteKit",
  //   },
  //   {
  //     value: "nuxt.js",
  //     label: "Nuxt.js",
  //   },
  //   {
  //     value: "remix",
  //     label: "Remix",
  //   },
  //   {
  //     value: "astro",
  //     label: "Astro",
  //   },
  // ]

  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };
  const [activeTab, setActiveTab] = useState('html');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  // const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("")

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
                  <div className="flex items-center">
                    <LeftArrow /> <span className="px-2">Go Back</span>
                  </div>
                  <h1 className="md:text-2xl text-1xl font-medium">
                    Awesome Buttons
                  </h1>

                  {/* <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? frameworks.find((framework) => framework.value === value)?.label
                          : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                  </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover> */}


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
                          <span>100 <SaveIcon /></span>
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
        </ResizablePanel>
      </ResizablePanelGroup>





    </>

  )
}
