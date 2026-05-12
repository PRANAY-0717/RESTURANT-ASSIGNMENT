"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getRestaurants } from "@/lib/storage";
import RestaurantCard from "@/components/RestaurantCard";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const term = appliedSearchTerm.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.type.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">All Restaurants</h1>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or cuisine..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No restaurants found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}