import MainNav from "@/components/custom_ui/NavBar/MainNav"
import ScroolCardReveal from "@/components/custom_ui/ScroolCardReveal"
import { TestimonialGrid } from "@/components/custom_ui/grid/TestimonialGrid"


const AboutUs = () => {
  return (
    <>
      {/* < MainNav /> */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#8b80ff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
            }}
          ></div>
        </div>
        <div className=" flex items-center justify-center">
          <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:pt-8">
            <div className="mt-5 flex items-center justify-center gap-x-6">
              <TestimonialGrid />
            </div>
          </div>
        </div>
      </div>
      {/* <TestimonialGrid /> */}
      {/* <ScroolCardReveal /> */}
    </>

  )
}

export default AboutUs