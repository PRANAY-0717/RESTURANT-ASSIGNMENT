"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBookings } from "@/lib/storage";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";

export default function ReservationsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookings(getAllBookings());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-muted-foreground">Loading reservations...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Reservations Dashboard</h1>
        <p className="text-muted-foreground text-lg">View all current bookings made across your restaurants.</p>
      </div>

      {bookings.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pb-0">
            <div className="bg-muted p-4 rounded-full">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No reservations yet</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              When guests book tables at any of your restaurants, they will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-primary/5 border-b p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg leading-tight">{booking.restaurantName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
                    <MapPin className="w-3 h-3" /> Table {booking.tableNumber}
                  </div>
                </div>
                <Badge variant="outline" className="bg-background">
                  #{booking.id.slice(-6)}
                </Badge>
              </div>
              
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{booking.time}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Guest Name</span>
                      <span className="text-sm font-medium">{booking.name}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Contact</span>
                      <span className="text-sm">{booking.mobile}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}