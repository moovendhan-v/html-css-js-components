import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"

import Grid from "@/components/custom_ui/Grid"

import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react" 

import {Logo} from "@/components/custom_ui/Svg"

export function Dashboard() {
    const { setTheme } = useTheme()
    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Logo />
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        UiComponents
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Components
                    </Link>

                    {/* <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            More
          </Link> */}
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                        More{' '}
                                        {/* <CaretDownIcon
                                                        className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                                        aria-hidden
                                                    /> */}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                                        <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                                            <li className="row-span-3 grid">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                                                        href="/"
                                                    >
                                                        <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                                                            <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                                            <path d="M12 0H4V8H12V0Z"></path>
                                                            <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                                        </svg>
                                                        <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] ">
                                                            Radix Primitives
                                                        </div>
                                                        <p className="text-mauve4 text-[14px] leading-[1.3]">
                                                            Unstyled, accessible components for React.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>

                                            {/* <ListItem href="https://stitches.dev/" title="Stitches">
                                                            CSS-in-JS with best-in-class developer experience.
                                                        </ListItem>
                                                        <ListItem href="/colors" title="Colors">
                                                            Beautiful, thought-out palettes with auto dark mode.
                                                        </ListItem>
                                                        <ListItem href="https://icons.radix-ui.com/" title="Icons">
                                                            A crisp set of 15x15 icons, balanced and consistent.
                                                        </ListItem> */}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                    </Link>
                </nav>
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
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Analytics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search components..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
                </div>
            </header>

            <main>
                <div className="py-6">
                    <h1 className="scroll-m-20 text-7xl font-semibold tracking-tight lg:text-7xl text-center leading-10">
                        Open Source Awesome Ui-Componenets
                        <br />
                        for your next projects
                    </h1>
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
                    Save and share your creative designes to open source
                </h4>


                <div className="w-screen flex justify-center py-4">
                    {/* <input
                className="rounded-full bg-background text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:text-gray-900 focus:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Explore all ui Components"
            /> */}
                </div>

                <div>

                    <div className="w-full flex justify-center">
                        <div className="w-8/12 relative mt-2 rounded-md shadow-sm flex justify-center py-4 ">
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="w-full rounded-full bg-background text-xl border-2 border-gray-500 p-4 placeholder-gray-400 focus:text-gray-900 focus:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="Explore all ui Components"
                            />

                            <button className="absolute px-6 inset-y-0 flex right-0 items-center">
                                search
                            </button>

                        </div>
                    </div>

                    <div className="flex justify-center ">
                    <Button>
                            <Logo /> Explore More Components
                    </Button>
                    </div>

                </div>


            </main>

        </div>
    )
}


export function TypographyH4() {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
        </h4>
    )
}
