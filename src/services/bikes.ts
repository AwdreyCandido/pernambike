import { supabase } from "../lib/supabase";
import { RentedBike } from "../store/BikesContext";

export async function getAllBikes() {
  const { data, error } = await supabase.from("bikes").select(`*, users(*)`);

  return {
    data,
    error,
  };
}
export async function getBike(id: number) {
  const { data, error } = await supabase
    .from("bikes")
    .select(`*, users(*)`)
    .eq("id", id)
    .single();

  return {
    data: data,
    error,
  };
}

export async function addRentedBike(bike: RentedBike) {
  const {
    bikeId,
    brand,
    title,
    photoUrl,
    ownerId,
    renterId,
    endRent,
    rentValue,
    renterLocation,
    startRent,
  } = bike;

  const { data: rentedBikeData, error: insertError } = await supabase
    .from("rented-bikes")
    .insert([
      {
        bikeId,
        brand,
        title,
        photoUrl,
        ownerId,
        renterId,
        endRent,
        rentValue,
        renterLocation,
        startRent,
      },
    ]);

  if (insertError) {
    return {
      data: null,
      error: insertError,
    };
  }

  const { data: bikeData, error } = await supabase
    .from("bikes")
    .update({ isRented: true })
    .eq("id", bikeId);

  return {
    data: bikeData,
    error,
  };
}

export async function getRentedBike(renterId: string) {
  const { data, error } = await supabase
    .from("rented-bikes")
    .select(`*`)
    .eq("renterId", renterId);

  const [bike]: any = data;

  return {
    data: bike,
    error,
  };
}
