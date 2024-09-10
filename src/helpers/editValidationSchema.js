// import * as yup from "yup";

// export const editValidationSchema = yup.object().shape({
//   amount: yup.string().required("Required"),
//   comment: yup.string().required("Required"),
// });
import * as yup from "yup";

export const editValidationSchema = (type) => {
  return yup.object().shape({
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be a positive number")
      .required("Amount is required"),
    comment: yup
      .string()
      .max(100, "Comment cannot exceed 100 characters")
      .required("Comment is required"),
    categoryId:
      type === "Expense"
        ? yup.string().required("Category is required")
        : yup.string().nullable(),
  });
};
