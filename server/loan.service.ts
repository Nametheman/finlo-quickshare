import { supabase } from "@/lib/supabase";

export const createLoanService = async (data: CreateLoan) => {
  const { data: loanData, error } = await supabase
    .from("loans")
    .insert({ ...data });
  if (error) throw error;
  return loanData;
};

export const getUserLoansService = async (user_id: string) => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getLoanByIdService = async (id: string) => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const deleteLoanService = async (id: string) => {
  const { data, error } = await supabase.from("loans").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const getUserOverviewService = async (user_id: string) => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;

  const approved = data.filter((loan) => loan.status === "approved");
  const pending = data.filter((loan) => loan.status === "pending");
  const totalBalance = approved.reduce((sum, loan) => sum + loan.amount, 0);
  const credit = pending.reduce((sum, loan) => sum + loan.amount, 0);
  const creditLimit = 20000; // or derive from credit_score later
  const totalDue = totalBalance; // Can subtract repayments if needed

  return [
    { label: "Total Balance", value: totalBalance },
    { label: "Credit", value: credit },
    { label: "Credit Limit", value: creditLimit },
    { label: "Total Due", value: totalDue },
  ];
};
