"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getBookings, saveBooking } from "@/lib/storage";

export default function BookingSystem({ restaurant }) {
  const [bookings, setBookings] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  
  const today = new Date().toISOString().split("T")[0];
  const [viewDate, setViewDate] = useState(today);
  
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    phone: "",
    time: ""
  });
  const [bookingDate, setBookingDate] = useState(today);

  useEffect(() => {
    setBookings(getBookings(restaurant.id));
  }, [restaurant.id]);

  const getBookedTimesForTable = (tableNumber) => {
    return bookings
      .filter((b) => b.tableNumber === tableNumber && b.date === viewDate)
      .map((b) => b.time)
      .sort();
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedTable) return;

    const isDoubleBooked = bookings.some(
      (b) => b.tableNumber === selectedTable && b.date === bookingDate && b.time === guestInfo.time
    );

    if (isDoubleBooked) {
      window.alert("This table is already booked for the selected date and time. Please choose another time.");
      return;
    }

    // console.log("booking saved:", guestInfo);
    // TODO: add form validation for phone number later

    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: selectedTable,
      name: guestInfo.name,
      mobile: guestInfo.phone,
      date: bookingDate,
      time: guestInfo.time,
    };
    
    saveBooking(restaurant.id, newBooking);
    setBookings([...bookings, newBooking]);
    
    setGuestInfo({ name: "", phone: "", time: "" });
    setSelectedTable(null);
    window.alert("Table booked successfully!");
  };

  const openBookingForm = (num) => {
    setSelectedTable(num);
    setBookingDate(viewDate);
    setGuestInfo({ ...guestInfo, time: "" });
  };

  const tablesArray = Array.from({ length: restaurant.tables }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md border">
        <label className="text-sm font-semibold whitespace-nowrap">Check Date:</label>
        <Input 
          type="date" 
          value={viewDate} 
          onChange={(e) => {
            setViewDate(e.target.value);
            if (selectedTable) setBookingDate(e.target.value);
          }}
          min={today}
          className="w-auto bg-white dark:bg-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tablesArray.map((num) => {
          const bookedTimes = getBookedTimesForTable(num);
          
          return (
            <div key={num} className="flex flex-col border-2 rounded-lg transition-all hover:border-blue-500 overflow-hidden">
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg">Table {num}</span>
                  {bookedTimes.length > 0 ? (
                    <Badge variant="secondary">Booked</Badge>
                  ) : (
                    <Badge variant="outline" className="text-green-600 border-green-200">Available</Badge>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                  Capacity: 4 People
                </div>

                {bookedTimes.length > 0 && (
                  <div className="pt-2 border-t mt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Times</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {bookedTimes.map((time, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 text-[11px] px-2 py-0.5 rounded">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t">
                <Button 
                  variant={selectedTable === num ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => openBookingForm(num)}
                >
                  {selectedTable === num ? "Selected" : "Book Table"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedTable !== null && (
        <form onSubmit={handleBooking} className="p-5 bg-white dark:bg-gray-950 rounded-lg border shadow-sm mt-4">
          <div className="mb-4 border-b pb-2">
            <h3 className="font-bold text-lg">Booking Form (Table {selectedTable})</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Guest Name</Label>
              <Input 
                required 
                placeholder="Full name" 
                value={guestInfo.name}
                onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Mobile Number</Label>
              <Input 
                required 
                type="tel"
                placeholder="10-digit number" 
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Input 
                type="date"
                required 
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Time</Label>
              <Input 
                type="time"
                required 
                value={guestInfo.time}
                onChange={(e) => setGuestInfo({...guestInfo, time: e.target.value})}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Confirm</Button>
        </form>
      )}
    </div>
  );
}