import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  type: Yup.string().required("Transaction type is required"),
  comment: Yup.string()
    .required("Comment is required")
    .max(100, "Comment cannot exceed 100 characters"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive"),
  transactionDate: Yup.date()
    .typeError("Invalid date")
    .required("Transaction date is required"),
});
