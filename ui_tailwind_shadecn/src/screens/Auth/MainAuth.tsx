import { MovingButton } from "@/components/ui/moving-border"
import { Checkbox } from "@/components/ui/checkbox"
import {HandleLogin} from '@/hooks/handle_login.hooks';

export const MainAuth = ()=>{
    return(
        <>
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
        </>
    )
}