const Content = ()=>{
    return(
        <>
        <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
      Design Without Limits: <br /> Explore the World of Open Source UI
    </h2>
    <div className="md:w-3/5 md:pl-6">
      <p className="leading-relaxed text-base">
      Join the Revolution of Open Source UI, <br /> Design Better, Faster, Stronger with Our Open Source Components, Join the Open Source Revolution: Transform Your Website Today
      </p>
      <div className="flex md:mt-4 mt-6">
        <button className="inline-flex text-white bg-primary border-0 py-1 px-4 focus:outline-none hover:bg-secondary rounded">
          Contribute
        </button>
        <a className="text-primary inline-flex items-center ml-4">
          Star On Github
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default Content;