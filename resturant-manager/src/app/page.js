"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getRestaurants } from "@/lib/storage";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = getRestaurants();
    setRestaurants(data);
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const term = searchTerm.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.type.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Manage Your Restaurants
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              A simple app to track venues, manage tables, and handle reservations.
            </p>
          </div>

          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants or cuisine"
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/restaurants">
                Explore
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-[1200px] mt-8 mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Venues</h2>
          <Button variant="outline" asChild>
            <Link href="/restaurants">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.slice(0, 3).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}