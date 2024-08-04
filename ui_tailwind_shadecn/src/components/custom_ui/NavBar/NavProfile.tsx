import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HandleLogout } from '@/hooks/handle_logout.hooks';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUser } from "lucide-react"
import { Button } from "../../ui/button"
import { useLoginStore } from "@/store/Auth"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';


export const NavProfile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userInfo = useLoginStore.getState();
  console.log(JSON.stringify(userInfo))

  const handleLogoutClick = async () => {
    await HandleLogout();
    setIsDialogOpen(false);
    window.location.href = '/';
  };

  const confirmLogout = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full border-4 border-sky-500">
            {userInfo.isLoggedIn ? (
              <>
                <Avatar className="border-2 border-sky-400">
                  <AvatarImage src={userInfo?.user?.avatar_url || "Please login"} />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              </>
            ) : <CircleUser className="h-5 w-5" />}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Info</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userInfo.isLoggedIn && (
            <DropdownMenuItem>
              <Link to={`/profile`}>
                {userInfo?.user?.name}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link to={`/settings`}>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={userInfo.isLoggedIn ? 'bg-red-600' : "bg-blue-700"} >
            {userInfo.isLoggedIn ? (
              <h3 onClick={confirmLogout}>
                Logout
              </h3>
            ) : (
              <Link to="/Login">Login</Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button className="hidden" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to logout from this application?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutClick}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default NavProfile;
