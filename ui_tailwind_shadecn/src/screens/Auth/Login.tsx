
import { MovingButton } from "@/components/ui/moving-border"
import { Checkbox } from "@/components/ui/checkbox"
import MainNav from "@/components/custom_ui/MainNav"
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import {HandleLogin} from '@/hooks/handle_login.hooks';

export function Login() {

    const location = useLocation();
    useEffect(() => {
        // Parse the query string to get the value of the 'code' parameter
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
    
        // Do something with the 'code' value, like sending it to the server for authentication
        console.log('Code:', code);
      }, [location.search]);
      
    return (
        <>
           < MainNav/>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login or Signup</h1>
                            <p className="text-balance text-muted-foreground">
                                Create Your Account with github
                            </p>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            <MovingButton
                                duration={3000}
                                borderRadius="10px"
                                className="p-1 mr-3"
                                onClick={HandleLogin}
                            >
                                Signup With Github
                            </MovingButton>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img
                        src="https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </>
    )
}
