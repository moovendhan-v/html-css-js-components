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
import { useLoginStore, useLoginUserInfo } from "@/store/Auth"
import { Link } from "react-router-dom"

export const NavProfile = ()=>{
    const user = useLoginStore((state) => state.isLogin);
    const userInfo = useLoginUserInfo((state) => state);
    return(
        <>
           <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                {user? <> 
                                    <Avatar>
                                            <AvatarImage src={userInfo.avatar_url || "Please login"} />
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
                                user ?
                                    <DropdownMenuItem>
                                        <Link to={`/profile`}>
                                            {userInfo.name}
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