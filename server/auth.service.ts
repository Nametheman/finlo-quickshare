import { supabase } from "@/lib/supabase";

export const loginService = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signupService = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const logoutService = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
