import MainNav from "@/components/custom_ui/NavBar/MainNav"
import { useEffect } from "react";
// import { MainAuth } from "./MainAuth";
import { HandleLogout } from '@/hooks/handle_logout.hooks';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function Logout() {

    useEffect(() => {

    }, []);

    return (
        <>
            < MainNav />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="bg-red-600" variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you really want to logout from this application?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={HandleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
