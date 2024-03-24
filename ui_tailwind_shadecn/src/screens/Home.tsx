import Teams from '../components/custom_ui/Teams';
import Nav from '../components/custom_ui/Nav';
import {ModeToggle} from '@/components/ui/mode-toggle';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

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
  
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"



const Home = ()=>{
    return(
        <>
        {/* <Nav />
        <ModeToggle /> */}

        {/* <Menubar>
        <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
            <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        </Menubar> */}

        <NavigationMenu>
        <NavigationMenuList>
            
            <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>

            <NavigationMenuContent>

            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
            </NavigationMenuLink>

            </NavigationMenuContent>

            </NavigationMenuItem>
            
        </NavigationMenuList>
        </NavigationMenu>




        </>
    )
}

export default Home;