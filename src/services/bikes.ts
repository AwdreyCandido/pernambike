import { supabase } from "../lib/supabase";

export async function getAllBikes() {
  const { data, error } = await supabase.from("bikes").select("*");

  return {
    data,
    error,
  };
}
export async function getBike(id: string) {
  const { data, error } = await supabase
    .from("bikes")
    .select(`*, users(*)`)
    .eq("id", id);

  const [bike]: any = data;

  return {
    data: bike,
    error,
  };
}
