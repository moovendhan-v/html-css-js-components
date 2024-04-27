import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ViewSkeleton } from "../skeleton/ViewSkeleton";
import { useEffect, useState } from "react";


export const Slider : React.FC<{categories: string[]}> = ({categories}) =>{
    const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (!footer) return;

      const navbar = document.querySelector('.flex-1') as HTMLElement;
      const footerPosition = footer.getBoundingClientRect().top;

      setIsSticky(window.scrollY > navbar.offsetTop);
      if (footerPosition <= window.innerHeight) {
        navbar.style.position = 'relative';
      } else {
        navbar.style.position = 'fixed';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return(
        <>
        {categories === null ? (
        <ViewSkeleton />
      ) : (
        <div>
          <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
            <div className="">
              <div className={`${isSticky} sticky top-0`}>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
                  {categories.length > 0 ? (
                    categories.map((categories, index) => (
                      <div className="transition duration-1000 ease-in-out">
                        <Link
                          key={index}
                          to={`/${categories}`} // Assuming each category corresponds to a route
                          className="text-base font-xs hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-1000 ease-in-out my-1"
                        >
                          {categories}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <>
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                      <Skeleton className="w-[100%] h-[40px] rounded transition duration-900 px-3 py-3 ease-in-out my-1" />
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

        </>
    )
}