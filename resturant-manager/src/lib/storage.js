export const INITIAL_RESTAURANTS = [
  {
    id: "1",
    name: "The Notesly Spoon",
    ownerName: "Pranay",
    mobile: "9876543210",
    type: "Fine Dining",
    addressLine1: "123 Main St",
    area: "Downtown",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80",
    description: "Good food and great vibes. Best pasta in town.",
    slug: "the-rustic-spoon",
    tables: 15,
  }
];

export function getRestaurants() {
  if (typeof window === "undefined") {
    return [];
  }
  // localStorage.clear(); // debug only
  const storedData = localStorage.getItem("restaurants");
  if (!storedData) {
    localStorage.setItem("restaurants", JSON.stringify(INITIAL_RESTAURANTS));
    return INITIAL_RESTAURANTS;
  }
  return JSON.parse(storedData);
}

export function saveRestaurant(newRestaurant) {
  if (typeof window === "undefined") return;
  const currentRestaurants = getRestaurants();
  currentRestaurants.push(newRestaurant);
  localStorage.setItem("restaurants", JSON.stringify(currentRestaurants));
}

export function getRestaurantBySlug(slug) {
  if (typeof window === "undefined") return null;
  const restaurants = getRestaurants();
  return restaurants.find((restaurant) => restaurant.slug === slug);
}

export function getBookings(restaurantId) {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(`bookings_${restaurantId}`);
  return stored ? JSON.parse(stored) : [];
}

export function saveBooking(restaurantId, booking) {
  if (typeof window === "undefined") return;
  const current = getBookings(restaurantId);
  current.push(booking);
  localStorage.setItem(`bookings_${restaurantId}`, JSON.stringify(current));
}

export function getAllBookings() {
  if (typeof window === "undefined") return [];
  const restaurants = getRestaurants();
  let allBookings = [];
  restaurants.forEach(res => {
    const stored = localStorage.getItem(`bookings_${res.id}`);
    if (stored) {
      const bookings = JSON.parse(stored);
      const enriched = bookings.map(b => ({ ...b, restaurantName: res.name }));
      allBookings = [...allBookings, ...enriched];
    }
  });
  return allBookings.sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.time.localeCompare(b.time);
  });
}