"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="h-full w-full mb-6 md:mb-0">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-2">
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="bg-white/90 text-black px-2 py-1">
              {restaurant.type}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {restaurant.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 p-2 rounded-md w-fit">
            <Users className="h-4 w-4" />
            <span>{restaurant.tables} Tables</span>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 mt-auto">
          <Button asChild className="w-full">
            <Link href={`/restaurant/${restaurant.slug}`}>Book a Table</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}