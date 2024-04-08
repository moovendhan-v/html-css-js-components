import {
  Bell,
  CircleUser,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { Logo } from "@/components/custom_ui/Svg"
import OutputsOfComponents from "@/components/custom_ui/OutputComponents"
import { ComponentType } from "@/enums/iframEnums"
import { useCategoriesStore, useComponentsStore } from "@/store/store"
import { useEffect } from "react"
import { fetchCategories } from "@/api/components/categories"
import { fetchComponentsStore } from "@/api/components/components"
import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton"
import { CardSkeleton } from "@/components/custom_ui/skeleton/CardSkeleton"


type Props = {
  componentCatogries: string;
};

export function Components({ componentCatogries }: Props) {
  const categries = useCategoriesStore((state) => state.categories);
  const components = useComponentsStore((state) => state.buttons);
  console.log(components);
  console.log(componentCatogries);

  useEffect(() => {
    fetchCategories();
    fetchComponentsStore(componentCatogries);

  }, [componentCatogries])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 relative">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo /> <h3 className=" px-2 font-bold">Ui Components</h3>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

          <div className="flex-1 ">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {categries.length > 0 ? (
                categries.map((category, index) => (
                  <div className="transition duration-1000 ease-in-out relative">
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
          </div>

          {/* <div className="mt-auto p-4 absolute bottom-0">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Join With Us</CardTitle>
                <CardDescription>
                  Join the Revolution of Open Source UI
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Join
                </Button>
              </CardContent>
            </Card>
          </div> */}

        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                      Upgrade
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{ } - Components</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />



            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} />

              <a className=" items-center">
                <span className="flex justify-between flex-row pt-1">
                  <span className="title-font font-medium">Holden Caulfield</span>
                  <span className="title-font font-thin text-gray-200">Holden Caulfield</span>
                </span>
              </a>
            </div>


            {/* <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div>
            <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS} /></div> */}
          </div>

          {/* <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                <OutputsOfComponents html="Testing" css="Testing" js="testing" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Your Searching for {} which is not available
              </p>
              <Button className="mt-4">Contribute</Button>
            </div>
          </div> */}
          {/* <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No Components where Found Contribute your Components
              </h3>
              <p className="text-sm text-muted-foreground">
                Your Searching for {} which is not available
              </p>
              <Button className="mt-4">Contribute</Button>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  )
}
