import { supabase } from "../lib/supabase";

export async function getUser(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
    

  return {
    data: data[0],
    error,
  };
}
