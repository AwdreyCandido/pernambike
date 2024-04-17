import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://nltkjxejzpfkopvniyzh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdGtqeGVqenBma29wdm5peXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNzY1MTYsImV4cCI6MjAyODk1MjUxNn0.FyHpSjnXVS8OGSb4CDdsISYicI2sZoO6kJ9JJkLcbwI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if ((state = "active")) {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
