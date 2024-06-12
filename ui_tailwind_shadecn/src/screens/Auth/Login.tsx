import MainNav from "@/components/custom_ui/NavBar/MainNav"
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { MainAuth } from "./MainAuth";

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
               <MainAuth />
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
