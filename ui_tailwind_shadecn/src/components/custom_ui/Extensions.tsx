import {Logo} from './Svg';

const Extension = ()=>{
    return(
        <>
        <>
  <section className="body-font">
    <div className="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
      <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium mb-1">
          Downlod Our Extensions
        </h2>
        <h1 className="md:text-3xl text-2xl font-medium">
          Make Devlelopment with our powerfull extensions
        </h1>
      </div>
      <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
        <button className="bg-secondary inline-flex py-3 px-5 rounded-lg items-center focus:outline-none">
        <Logo />
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="text-xs text-primary mb-1">GET IT FOR</span>
            <span className="title-font font-medium">Visual Studio Code</span>
          </span>
        </button>
        <button className="bg-secondary inline-flex py-3 px-5 rounded-lg items-center focus:outline-none">
           <Logo />
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="text-xs text-primary mb-1">INSTALL IT ON</span>
            <span className="title-font font-medium">Google Chrome</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</>

        </>
    )
}

export default Extension;