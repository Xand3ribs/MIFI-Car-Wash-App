import React, { useState } from 'react';
import BookingHub from './BookingHub';
import JobDetailView from '../washer/JobDetailView';

// Destructure availableWashers and onAssignWasher from the main dashboard context
export default function AdminBookingManager({ mockBookings, availableWashers = [], onAssignWasher }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Extract the specific active order configuration
  const activeBooking = mockBookings.find(b => b.id === selectedBookingId);

  if (activeBooking) {
    return (
      <JobDetailView 
        job={activeBooking}
        isAdmin={true}
        availableWashers={availableWashers}
        onAssignWasher={onAssignWasher}
        onBack={() => setSelectedBookingId(null)}
      />
    );
  }

  return (
    <BookingHub 
      mockBookings={mockBookings}
      onSelectBooking={(id) => setSelectedBookingId(id)}
    />
  );
}