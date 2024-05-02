import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    CircleUser
} from "lucide-react"
import { Button } from "../../ui/button"
// import { useLoginStore, useLoginuser } from "@/store/Auth"

import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/Auth/Auth"

export const NavProfile = ()=>{
    // const user = useLoginStore((state) => state.isLogin);
    // const user = useLoginuser((state) => state);
    const user = useAuthStore((state) => state.user);

    return(
        <>
           <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                {user? <> 
                                    {/* <Avatar>
                                            <AvatarImage src={user.avatar_url || "Please login"} />
                                            <AvatarFallback>Profile</AvatarFallback>
                                    </Avatar> */}
                                 </>:<CircleUser className="h-5 w-5" />}
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Info</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                user ?
                                    <DropdownMenuItem>
                                        <Link to={`/profile`}>
                                            {user.name}
                                        </Link>
                                    </DropdownMenuItem>
                                : <></>
                            }
                            <DropdownMenuItem>
                                <Link to={`/settings`}>
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={`/${user ? "Logout" : "Login"}`}>
                                    {user ? "Logout" : "Login"}
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    </>
    )
}