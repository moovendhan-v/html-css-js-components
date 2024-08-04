import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/Auth";
import { HandleLogout } from '@/hooks/handle_logout.hooks';
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const NavProfile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userInfo = useLoginStore.getState();
  console.log(JSON.stringify(userInfo));

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
      <Sheet>
        <SheetTrigger asChild>
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
        </SheetTrigger>
        <SheetContent side="right" className='min-w-[15rem]'>
          <SheetHeader>
            <SheetTitle>Profile Menu</SheetTitle>
          </SheetHeader>
          <div className="space-y-2 p-4">
            {userInfo.isLoggedIn && (
              <div>
                <Button variant="outline" className="w-full text-blue-500">
                  <Link to={`/profile`} className="block text-blue-500">
                    {userInfo?.user?.name}
                  </Link>
                </Button>
              </div>
            )}
            <div>
              <Button variant="outline" className="w-full text-blue-500">
                <Link to={`/settings`}>Settings</Link>
              </Button>
            </div>
            <div>
              <div >
                {userInfo.isLoggedIn ? (
                  <Button onClick={confirmLogout} variant="outline" className={`${userInfo.isLoggedIn ? 'text-red-500 hover:text-white hover:bg-red-500' : "bg-blue-700"}  cursor-pointer p-2 rounded w-full`} >
                    Logout
                  </Button>
                ) : (
                  <Link to="/Login" className="text-white">Login</Link>
                )}
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {/* <Button type="button">Close</Button> */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

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
