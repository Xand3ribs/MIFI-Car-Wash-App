import { Link } from 'react-router-dom';
import { useState } from 'react';
import Step1 from '../components/booking/step1';
import Step2 from '../components/booking/step2';

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 5) * 100;

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const isContinueDisabled = !selectedVehicle || !selectedService;

  return (
    <div className="flex flex-col justify-between h-screen bg-navy-deep [&>div]: ">
      {/* header */}
      <div className="relative flex items-center justify-center bg-gray-dark h-20 flex-shrink-0">
        {/* back arrow */}
        <Link
          to="/"
          className="absolute left-5 lg:left-10 bg-border-hover border-border-hover text-white btn btn-circle btn-sm "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>

        {/* progress bars */}
        <div className="[&_.progress]:bg-navy-deep">
          <progress
            className="progress progress-info w-28 sm:w-56 lg:w-62"
            value={progress}
            max="100"
          ></progress>
        </div>
      </div>

      {/* booking content */}
      <div className="px-10 py-8 flex-1 overflow-y-auto">
        {currentStep === 1 && (
          <Step1
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        )}

        {currentStep === 2 && <Step2 />}
      </div>

      {/* Footer */}
      <div
        className="flex lg:flex-row items-center justify-between flex-shrink-0 bg-gray-dark h-20 px-10 lg:px-16 xl:px-36
      [&>button]:w-[100px] [&>button]:sm:w-[150px] [&>button]:lg:w-[250px] [&>button]:lg:text-2xl"
      >
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`btn ${
            currentStep === 1
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-blue-action text-navy-deep'
          }`}
        >
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={isContinueDisabled}
          className={`btn bg-blue-action text-navy-deep ${
            isContinueDisabled ? 'brightness-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Booking;
