"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveRestaurant } from "@/lib/storage";

export default function AddRestaurantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    mobile: "",
    type: "",
    addressLine1: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    image: "",
    description: "",
    tables: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    
    const newRestaurant = {
      ...formData,
      id: Date.now().toString(),
      slug: generateSlug(formData.name),
      tables: Number(formData.tables),
    };
    saveRestaurant(newRestaurant);
    router.push("/restaurants");
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add New Restaurant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Pranay's Pizza" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" name="ownerName" required value={formData.ownerName} onChange={handleChange} placeholder="Owner Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" name="mobile" required type="tel" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" />
              </div>
              <div className="space-y-2">
                <Label>Restaurant Type</Label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  required 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="" disabled>Select type</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Fine Dining">Fine Dining</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Cloud Kitchen">Cloud Kitchen</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Address Details</h3>
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" name="addressLine1" required value={formData.addressLine1} onChange={handleChange} placeholder="Street address, building name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="area">Area / Locality</Label>
                  <Input id="area" name="area" required value={formData.area} onChange={handleChange} placeholder="Area name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required value={formData.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required value={formData.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="Postal code" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  {/* TODO: integrate AWS S3 upload later instead of manual URL */}
                  <Input id="image" name="image" required type="url" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tables">Number of Tables</Label>
                  <Input id="tables" name="tables" required type="number" min="1" value={formData.tables} onChange={handleChange} placeholder="10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required value={formData.description} onChange={handleChange} placeholder="Brief description of the restaurant" rows={4} />
              </div>
            </div>
            <Button type="submit" className="w-full text-lg py-6">
              Add Restaurant
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}