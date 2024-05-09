

export const BlogGrid = () => {
    return (
        <>
            <div className="bg-white dark:bg-gray-800 h-full py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                  
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
                       
                        <a
                            href="#"
                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                loading="lazy"
                                alt="Photo by Minh Pham"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                                VR
                            </span>
                        </a>
                        
                        <a
                            href="#"
                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                loading="lazy"
                                alt="Photo by Magicle"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                                Tech
                            </span>
                        </a>
                       
                        <a
                            href="#"
                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                loading="lazy"
                                alt="Photo by Martin Sanchez"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                                Dev
                            </span>
                        </a>
                        
                        <a
                            href="#"
                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                loading="lazy"
                                alt="Photo by Lorenzo Herrera"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                                Retro
                            </span>
                        </a>
                       
                    </div>
                </div>
            </div>

        </>
    )
}