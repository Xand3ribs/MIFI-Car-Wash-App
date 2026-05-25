import React, { useState } from 'react';
import BookingHub from './admin/BookingHub';
import FleetRoster from './admin/FleetRoster';

const INITIAL_BOOKINGS = [
  { id: 1, name: "John Doe", number: "BK001", car: "Honda Civic (Sedan)", time: "Thu, 10:30 AM", address: "123 Main St", status: "Pending" },
  { id: 2, name: "Sarah Miller", number: "BK002", car: "Ford F-150 (Truck)", time: "Thu, 11:15 AM", address: "567 Pine Ave", status: "Assigned" },
  { id: 3, name: "Mike Taylor", number: "BK003", car: "Tesla Model 3", time: "Thu, 1:00 PM", address: "890 Oak Rd", status: "Completed" },
  { id: 4, name: "Emily Davis", number: "BK004", car: "Toyota RAV4 (SUV)", time: "Thu, 2:45 PM", address: "234 Maple St", status: "Assigned" },
  { id: 5, name: "John Doe", number: "BK005", car: "Honda Civic (Sedan)", time: "Thu, 10:30 AM", address: "123 Main St", status: "Pending" },
  { id: 6, name: "Sarah Miller", number: "BK006", car: "Ford F-150 (Truck)", time: "Thu, 11:15 AM", address: "567 Pine Ave", status: "Pending" },
  { id: 7, name: "Mike Taylor", number: "BK007", car: "Tesla Model 3", time: "Thu, 1:00 PM", address: "890 Oak Rd", status: "In Progress" },
  { id: 8, name: "Emily Davis", number: "BK008", car: "Toyota RAV4 (SUV)", time: "Thu, 2:45 PM", address: "234 Maple St", status: "Assigned" },
  { id: 9, name: "John Doe", number: "BK009", car: "Honda Civic (Sedan)", time: "Thu, 10:30 AM", address: "123 Main St", status: "Completed" },
  { id: 10, name: "Sarah Miller", number: "BK010", car: "Ford F-150 (Truck)", time: "Thu, 11:15 AM", address: "567 Pine Ave", status: "Assigned" },
  { id: 11, name: "Mike Taylor", number: "BK011", car: "Tesla Model 3", time: "Thu, 1:00 PM", address: "890 Oak Rd", status: "Pending" },
  { id: 12, name: "Emily Davis", number: "BK012", car: "Toyota RAV4 (SUV)", time: "Thu, 2:45 PM", address: "234 Maple St", status: "In Progress" },

];

const INITIAL_WASHERS = [
    { id: 1, name: "Alex Rivera", shift: "8:00 AM - 5:00 PM", status: "Available" },
    { id: 2, name: "Marcus Kruse", shift: "12:00 PM - 8:00 PM", status: "Available" },
    { id: 3, name: "Sarah Patel", shift: "12:00 PM - 8:00 PM", status: "Available" },
    { id: 4, name: "David Kim", shift: "8:00 AM - 5:00 PM", status: "Available" },
    { id: 5, name: "Elena Rostova", shift: "8:00 AM - 5:00 PM", status: "Busy" },
    { id: 6, name: "Jordan Brooks", shift: "10:00 AM - 7:00 PM", status: "Available" },
    { id: 7, name: "Carlos Mendez", shift: "12:00 PM - 8:00 PM", status: "Busy" },
    { id: 8, name: "Aisha Yusuf", shift: "12:00 PM - 8:00 PM", status: "Available" },
    { id: 9, name: "Tariq Zayn", shift: "4:00 PM - 12:00 AM", status: "Offline" },
    { id: 10, name: "Chloe Dupont", shift: "4:00 PM - 12:00 AM", status: "Available" },
    { id: 11, name: "Malik Stone", shift: "Off Duty", status: "Offline" },
];

function AdminDashboardView() {
  // Turn mock data into live React state
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [washers, setWashers] = useState(INITIAL_WASHERS);

  // The function that connects a booking to a specific washer
  const handleAssignWasher = (bookingId, washerId) => {
    // 1. Find the specific washer's name from our list
    const selectedWasher = washers.find(w => w.id === washerId);
    const washerName = selectedWasher ? selectedWasher.name : "Assigned Crew";

    // 2. Update the booking status AND save their name onto the card
    setBookings(prevBookings =>
      prevBookings.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'Assigned', assignedWasher: washerName } 
          : b
      )
    );

    // 3. Update the chosen washer's status to "Busy"
    setWashers(prevWashers =>
      prevWashers.map(w => w.id === washerId ? { ...w, status: 'Busy' } : w)
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 w-full p-3">
      {/* Pass the dynamic state lists and our dispatch action down as props */}
      <BookingHub 
        mockBookings={bookings} 
        availableWashers={washers.filter(w => w.status === 'Available')} 
        onAssignWasher={handleAssignWasher}
      />
      
      <FleetRoster mockWashers={washers} />
    </div>
  );
}

export default AdminDashboardView;