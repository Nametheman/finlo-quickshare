type LoanStatus = "pending" | "approved" | "rejected" | "flagged";

interface Loan {
  id: string;
  user_id: string; // foreign key to users table
  amount: number;
  interest_rate: number;
  term_months: number;
  repayment_schedule: "monthly" | "weekly" | "bi-weekly";
  status: LoanStatus;
  purpose: string;
  collateral?: string;
  credit_score?: number;
  date_applied: string; // ISO string
  date_approved?: string;
  due_date?: string;
  disbursed_amount?: number;
  total_repayment_amount?: number;
  created_at: string;
  updated_at?: string;
}

interface CreateLoan {
  amount: number;
  interest_rate: number;
  repayment_schedule: "monthly" | "weekly" | "bi-weekly";
  purpose: string;
  collateral?: string;
}
