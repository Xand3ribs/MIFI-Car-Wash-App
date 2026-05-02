function Hero() {
  return (
    <div className="relative h-[450px] bg-cover bg-center bg-no-repeat rounded-xl"
      style={{ backgroundImage: "url('/src/assets/hero-bg.jpg')" }}>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 rounded-xl"></div>

      <div className="relative flex items-center h-full">

        <div className="container px-4">

          <div className="flex flex-col items-start justify-center gap-6 lg:pl-16 w-auto lg:w-[500px] text-white">
 
            <h1 className="text-[2.5rem] lg:text-[3rem]">We Bring the wash to you </h1>

            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

            <div className="btn bg-blue-action text-white  rounded-field w-auto">Book A wash Now</div>

          </div>
        </div>
      </div>
    </div>


  );
}

export default Hero;