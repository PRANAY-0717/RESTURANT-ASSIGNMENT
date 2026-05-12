import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-69 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <UtensilsCrossed className="h-6 w-6" />
          <span className="font-bold tracking-tight">RestoPranay</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/restaurants" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All Restaurants
          </Link>
          <Button asChild variant="default">
            <Link href="/manage/restaurant/add">Add Restaurant</Link>
          </Button>
          <Link href="/reservations" className="text-sm font-medium hover:text-primary transition-colors">
  My Bookings
</Link>
        </nav>
      </div>
    </header>
  );
}