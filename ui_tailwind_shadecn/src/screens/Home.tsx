
import { SearchIcon } from '../components/custom_ui/Svg';

import { Button } from "@/components/ui/button"

import { LogoPlain } from "@/components/custom_ui/Svg"

import Teams from '../components/custom_ui/Teams';
import BlogCard from '../components/custom_ui/BlogCard';
import Content from '../components/custom_ui/Content';
import Extension from '../components/custom_ui/Extensions';
import Footer from '@/components/custom_ui/Footer';
import YoutubeContent from '../components/custom_ui/YoutubeContent';
import Community from '../components/custom_ui/Community';
import OutputsOfComponents from "@/components/custom_ui/OutputComponents"
import { ComponentType } from "@/enums/iframEnums"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { MovingWords } from '@/data/MovingText';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import MainNav from "@/components/custom_ui/NavBar/MainNav";
import { useState} from 'react';
import AboutUs  from '@/screens/AboutUs';
import { useCategoriesStore } from '@/store/store';

// import { useLoginStore } from "@/store/Auth";
// const userInfo = useLoginStore.getState()

export function Dashboard() {

    const [searchQuery, setSearchQuery] = useState('');

    const categries = useCategoriesStore((state) => state.categories);

    const categoriesJson = categries.map((category) => ({
        title: category,
        path: `/${category}`
      }));

    const handleSearch = () => {
        const newUrl = `/search?search=${encodeURIComponent(searchQuery)}`;
        window.location.href = newUrl;
    };
      
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

      
    return (
        <div className="flex min-h-screen w-full flex-col font-primary">
           < MainNav/>
            <main>
                <div className="py-6">
                    <h1 className="scroll-m-20 text-6xl font-semibold tracking-tight lg:text-6xl text-center leading-10 font-stretch-150 font-opsz-28 font-GRAD-525.3399658203125">
                        Open Source Awesome Ui-Components
                        <br />
                        for your next projects
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center ">
                    <TypewriterEffectSmooth words={MovingWords} />
                </div>
                <div>
                    <div className="w-full flex justify-center">
                        <div className="w-8/12 relative mt-2 rounded-md shadow-sm flex justify-center py-4 ">
                            <input
                                type="text"
                                name="price"
                                id="price"
                                value={searchQuery}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className="
                                border-gradient-blue
                                animate-pulse
                                placeholder:text-muted-foreground  w-full rounded-full  bg-background text-xl border-2  p-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Explore all ui Components"
                            />

                            <button  onClick={handleSearch} className="absolute px-6 inset-y-0 flex right-0 items-center hover:text-primary animate-pulse">
                                <SearchIcon />  <span className="px-1">Search</span>
                            </button>

                        </div>

                    </div>

                    <div className="flex justify-center hover:animate-pulse">
                        <Button onClick={handleSearch}>
                            <LogoPlain /> Search Components
                        </Button>
                    </div>

                </div>
                <div className="flex flex-col overflow-hidden">

                </div>


                <div className="flex flex-col text-center w-full mb-10 pt-10 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
                        Popular Components That you might like to use
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-primary">
                        Most popular components
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                    <div ><OutputsOfComponents type={ComponentType.COMPONENTS} /></div>
                </div>

                <div className="flex justify-center mt-10 hover:animate-pulse">
                    <Button >
                        <LogoPlain /> Explore All Components
                    </Button>
                </div> 


                <div className="h-[20rem] first-letter: rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden my-5 ">
                    <InfiniteMovingCards
                        items={categoriesJson}
                        direction="right"
                        speed="slow"
                    />
                    <InfiniteMovingCards
                        items={categoriesJson}
                        direction="left"
                        speed="slow"
                    />
                    <InfiniteMovingCards
                        items={categoriesJson}
                        direction="right"
                        speed="slow"
                    />
                </div>

               
                {/* <HeroParallax products={Products} /> */}
                <AboutUs />
                <Teams />
                <BlogCard />
                <Content />
                <Extension />
                <YoutubeContent />
                <Community />
                <Footer />

            </main>
        </div>
    )
}


export function TypographyH4() {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
        </h4>
    )
}


