import { Link } from "react-router-dom";

function Booking() {
  return (
    <div className="flex flex-col justify-between h-screen bg-navy-deep [&>div]: ">

      {/* header */}
      <div className="relative flex items-center justify-center bg-gray-dark h-20">

        {/* back arrow */}
          <Link to="/" className="absolute left-5 lg:left-10 bg-border-hover border-border-hover text-white btn btn-circle btn-sm ">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-               linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>

          </Link>


          {/* progress bars */}
          <div className="[&_.progress]:bg-navy-deep">

            <progress className="progress progress-info w-28 sm:w-56 lg:w-62" value="50" max="100"></progress>

          </div> 
          
      </div>

      {/* booking content */}
      <div className="">
        <div>main content </div>
      </div>

      {/* Footer */}
      <div className="flex lg:flex-row items-center justify-between bg-gray-dark h-20 px-10 lg:px-16 xl:px-36
      [&>div]:bg-blue-action [&>div]:text-white [&>div]:w-[100px]  [&>div]:sm:w-[150px] [&>div]:lg:w-[250px]  ">

        <div className="btn">
          Back
        </div>

        <div className="btn">
          Continue
        </div>
        
            
      </div>
    </div>
  );
}

export default Booking;