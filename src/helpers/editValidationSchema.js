import * as yup from "yup";

export const editValidationSchema = () => {
  return yup.object().shape({
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be a positive number")
      .required("Amount is required"),
    comment: yup
      .string()
      .max(100, "Comment cannot exceed 100 characters")
      .required("Comment is required")
  });
};
