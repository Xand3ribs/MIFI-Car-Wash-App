import { Link } from 'react-router-dom';
import heroBg from '/src/assets/hero-bg.jpg';

function Hero() {
  return (
    <div
      className="relative h-full  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 rounded-xl"></div>

      <div className="relative flex items-center h-full">
        <div className="container px-4">
          <div className="flex flex-col items-start justify-center gap-6 lg:pl-16 w-auto lg:w-[500px] text-white">
            <h1 className="text-[2.5rem] lg:text-[3rem]">
              We Bring the wash to you{' '}
            </h1>

            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
            </p>

            <Link
              to="/booking"
              className="btn bg-blue-action  text-navy-deep btn-lg rounded-field w-auto"
            >
              Book a Wash Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
