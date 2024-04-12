import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { NavSkeleton } from "./NavSkeleton"
import { Skeleton } from "@/components/ui/skeleton"



export const ViewSkeleton = () => {
    return (
        <>
            <div>
                <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
                    <div className="">

                        <div>

                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
                                <>
                                    <NavSkeleton />
                                </>
                            </nav>
                        </div>
                    </div>
                    <div className="flex flex-col">

                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
                            <div className="flex min-h-screen w-full flex-col">
                                <main className="flex flex-1 flex-col gap-4 md:gap-4 ">
                                    <ResizablePanelGroup direction="horizontal">
                                        <ResizablePanel>
                                            <Skeleton className="w-[100%] h-[100%] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                                        </ResizablePanel>
                                        <ResizableHandle withHandle />
                                        <ResizablePanel>
                                            <Skeleton className="w-[100%] h-[100%] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                                        </ResizablePanel>
                                    </ResizablePanelGroup>

                                    <div className="bg-secondary rounded">

                                    </div>

                                </main>
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </>
    )
}