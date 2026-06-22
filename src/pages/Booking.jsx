import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

import BookingHeader from '../components/booking/BookingHeader';
import BookingFooter from '../components/booking/BookingFooter';
import SuccessModal from '../components/booking/SuccessModal';

import Step1 from '../components/booking/step1';
import Step2 from '../components/booking/step2';
import Step3 from '../components/booking/step3';
import Step4 from '../components/booking/step4';
import Step5 from '../components/booking/step5';

const getLocalTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State Configurations
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(getLocalTodayString());
  const [selectedTime, setSelectedTime] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setActiveUser(user);
      }
    };
    checkUser();
  }, []);

  const nextStep = () => {
    if (currentStep === 3 && isLoggedIn) setCurrentStep(5);
    else if (currentStep < 5) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep === 5 && isLoggedIn) setCurrentStep(3);
    else if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const [isStep4Valid, setIsStep4Valid] = useState(false);

  const isContinueDisabled = (() => {
    if (currentStep === 1) return !selectedVehicle || !selectedService;
    if (currentStep === 2) return !address;
    if (currentStep === 3) return !selectedDate || !selectedTime;
    if (currentStep === 4 && !isLoggedIn) return !isStep4Valid; 
    return false;
  })();

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      let targetUserId = activeUser?.id;
      
      // Determine the customer name based on login status
      let customerName = !isLoggedIn 
        ? `${userInfo.firstName} ${userInfo.lastName}`.trim()
        : (activeUser?.user_metadata?.full_name || activeUser?.email);

      if (!isLoggedIn) {
        const { data: authData, error: signUpError } =
          await supabase.auth.signUp({
            email: userInfo.email.trim(),
            password: userInfo.password,
            options: {
              data: {
                first_name: userInfo.firstName,
                last_name: userInfo.lastName,
                full_name: customerName, 
              },
            },
          });
        if (signUpError) throw signUpError;
        targetUserId = authData?.user?.id;
      }

      if (!targetUserId)
        throw new Error('User validation failed. Register or log back in.');

      const { error: bookingError } = await supabase.from('bookings').insert([
        {
          user_id: targetUserId,
          customer_name: customerName, 
          selected_vehicle: selectedVehicle,
          selected_service: selectedService,
          address,
          selected_date: selectedDate,
          selected_time: selectedTime,
        },
      ]);

      if (bookingError) throw bookingError;
      setIsLoggedIn(true);
      setIsSuccess(true);
    } catch (error) {
      alert(`Booking Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepContent = {
    1: (
      <Step1
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
    ),
    2: <Step2 address={address} setAddress={setAddress} />,
    3: (
      <Step3
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
    ),
    4: (
      <Step4
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setIsStepValid={setIsStep4Valid}
      />
    ),
    5: (
      <Step5
        selectedVehicle={selectedVehicle}
        selectedService={selectedService}
        address={address}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
        activeUser={activeUser}
      />
    ),
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-navy-deep overflow-hidden">
      <BookingHeader currentStep={currentStep} isLoggedIn={isLoggedIn} />

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
        {stepContent[currentStep]}
      </main>

      <BookingFooter
        currentStep={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        handleFinalSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
        isContinueDisabled={isContinueDisabled}
      />

      {isSuccess && (
        <SuccessModal
          isLoggedIn={isLoggedIn}
          activeUser={activeUser}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

export default Booking;
