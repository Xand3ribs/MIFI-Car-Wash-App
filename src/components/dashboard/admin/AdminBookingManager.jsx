import React, { useState } from 'react';
import BookingHub from './BookingHub';
import JobDetailView from '../washer/JobDetailView';

export default function AdminBookingManager({
  bookings,
  availableWashers = [],
  onAssignWasher,
}) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const activeBooking = bookings.find((b) => b.id === selectedBookingId);

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
      bookings={bookings}
      onSelectBooking={(id) => setSelectedBookingId(id)}
    />
  );
}
