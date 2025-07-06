import * as yup from "yup";

export const createLoanSchema: yup.ObjectSchema<CreateLoan> = yup.object({
  amount: yup.number().required("Amount is required"),
  interest_rate: yup.number().required("Interest rate is required"),
  repayment_schedule: yup
    .string()
    .oneOf(["monthly", "weekly", "bi-weekly"], "Invalid repayment schedule")
    .required("Repayment schedule is required"),
  purpose: yup.string().required("Purpose is required"),
  collateral: yup.string().required("Collateral is required"),
});
