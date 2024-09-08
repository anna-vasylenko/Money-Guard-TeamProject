import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  type: Yup.string().required("Transaction type is required"),
  comment: Yup.string().required("Comment is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});
