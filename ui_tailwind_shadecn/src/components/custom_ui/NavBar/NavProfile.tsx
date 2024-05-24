import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    CircleUser
} from "lucide-react"
import { Button } from "../../ui/button"
import { useLoginStore } from "@/store/Auth"
import { Link } from "react-router-dom"

const userInfo = useLoginStore.getState();
console.log(JSON.stringify(userInfo))

export const NavProfile = ()=>{

    return(
        <>
           <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                {userInfo.isLoggedIn? <> 
                                    <Avatar>
                                            <AvatarImage src={userInfo?.user?.avatar_url || "Please login"} />
                                            <AvatarFallback>Profile</AvatarFallback>
                                    </Avatar>
                                 </>:<CircleUser className="h-5 w-5" />}
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Info</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                userInfo.isLoggedIn ?
                                    <DropdownMenuItem>
                                        <Link to={`/profile`}>
                                            {userInfo?.user?.name}
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
                                <Link to={`/${userInfo.isLoggedIn ? "Logout" : "Login"}`}>
                                    {userInfo.isLoggedIn ? "Logout" : "Login"}
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    </>
    )
}