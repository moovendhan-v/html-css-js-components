import { Skeleton } from "@/components/ui/skeleton"


const CardSkeleton = () => {
  return (
    <>

      <div className="relative">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-[100%] rounded-xl" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[100%]" />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}


export { CardSkeleton }