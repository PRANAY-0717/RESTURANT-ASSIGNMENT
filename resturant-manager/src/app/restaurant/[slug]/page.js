"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRestaurantBySlug } from "@/lib/storage";
import BookingSystem from "@/components/BookingSystem";
import { MapPin, Phone, User, ArrowLeft } from "lucide-react";

export default function RestaurantDetailsPage({ params }) {
  const resolvedParams = use(params);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getRestaurantBySlug(resolvedParams.slug);
    setRestaurant(data);
    setLoading(false);
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
        <Button asChild>
          <Link href="/restaurants">Back to Restaurants</Link>
        </Button>
      </div>
    );
  }

  const fullAddress = `${restaurant.addressLine1}, ${restaurant.area}, ${restaurant.city}, ${restaurant.state} - ${restaurant.pincode}`;

  return (
    <div className="pb-12">
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button variant="secondary" size="icon" asChild className="rounded-full bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-md">
            <Link href="/restaurants">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-6xl space-y-4">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur text-sm py-1">
              {restaurant.type}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {restaurant.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="font-semibold text-lg border-b pb-4 mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {restaurant.description}
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border space-y-6">
              <h2 className="font-semibold text-lg border-b pb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <User className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-medium text-foreground">Owner</span>
                    {restaurant.ownerName}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-medium text-foreground">Mobile</span>
                    {restaurant.mobile}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-medium text-foreground">Location</span>
                    {fullAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Book a Table</h2>
              <BookingSystem restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}