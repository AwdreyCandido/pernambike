import { supabase } from "../lib/supabase";

interface IUpdateUser {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export async function getUser(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  const [user]: any = data;

  return {
    data: user,
    error,
  };
}

export async function updateUserProfile(id: string, user: IUpdateUser) {
  console.log("update fn")
  console.log(id, user)
  const { data, error } = await supabase
    .from("users")
    .update({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    })
    .eq("id", id);

  return { data, error };
}
