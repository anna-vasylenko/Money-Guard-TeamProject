import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import s from "./EditTransactionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../redux/transaction/operations";
import {
  selectCategories,
  selectCurrentTransaction,
} from "../../redux/transaction/selectors";
import { closeModal } from "../../redux/modal/slice";
import { useState } from "react";
import { editValidationSchema } from "../../helpers/editValidationSchema";
import { Icons } from "../Icons/Icons";

const validationSchema = editValidationSchema;

const EditTransactionForm = () => {
  const dispatch = useDispatch();
  const { transaction } = useSelector(selectCurrentTransaction);
  const categories = useSelector(selectCategories);
  const [startDate, setStartDate] = useState(
    new Date(transaction.transactionDate)
  );
  const [transactionType, setTransactionType] = useState(
    transaction.type || "Expense"
  );
  const [backendError, setBackendError] = useState(null);

  const initialValues = {
    amount: Math.abs(transaction.amount),
    comment: transaction.comment,
    categoryId: transaction.categoryId || "",
  };

  const handleSubmit = async (values, options) => {
    try {
      await dispatch(
        updateTransaction({
          transactionDate: startDate.toISOString(),
          comment: values.comment,
          amount: values.amount,
          type: transactionType,
          categoryId: values.categoryId,
          id: transaction.id,
        })
      ).unwrap();
      options.resetForm();
      dispatch(closeModal());
    } catch (error) {
      setBackendError(error);
    }
  };

  const handleClickButton = () => {
    dispatch(closeModal());
  };

  const handleTypeChange = (type, setFieldValue) => {
    setTransactionType(type);
    if (type === "Income") {
      setFieldValue("categoryId", ""); // Clear categoryId when switching to Income
    }
  };

  return (
    <div className={s.modal}>
      <h2>Edit transaction</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={s.form}>
            <div className={s.typeToggle}>
              <span
                className={transactionType === "Income" ? s.active : ""}
                onClick={() => handleTypeChange("Income", setFieldValue)}
              >
                Income
              </span>
              /
              <span
                className={transactionType === "Expense" ? s.active : ""}
                onClick={() => handleTypeChange("Expense", setFieldValue)}
              >
                Expense
              </span>
            </div>

            {transactionType === "Expense" && (
              <label className={s.label}>
                <Field
                  as="select"
                  name="categoryId"
                  className={s.input}
                  value={values.categoryId}
                  onChange={(e) => setFieldValue("categoryId", e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="categoryId"
                  component="span"
                  className={s.message}
                />
              </label>
            )}

            <label className={s.label}>
              <Field
                type="number"
                name="amount"
                min="1"
                placeholder="0.00"
                className={s.input}
              />
              <ErrorMessage
                name="amount"
                component="span"
                className={s.message}
              />
            </label>

            <div className={s.datePicker}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
              />
              <Icons name={"calendar"} />
            </div>

            <label className={s.label}>
              <Field
                type="text"
                name="comment"
                placeholder="comment"
                className={s.input}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={s.message}
              />
            </label>

            {backendError && <div className={s.error}>{backendError}</div>}

            <button type="submit" className={s.button} disabled={isSubmitting}>
              Save
            </button>
            <button
              type="button"
              className={s.button}
              onClick={handleClickButton}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTransactionForm;

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import DatePicker from "react-datepicker";
// import s from "./EditTransactionForm.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getTransactionsCategories,
//   updateTransaction,
// } from "../../redux/transaction/operations";
// import {
//   selectCategories,
//   selectCurrentTransaction,
// } from "../../redux/transaction/selectors";
// import { closeModal } from "../../redux/modal/slice";
// // import { setCurrentTransaction } from "../../redux/transaction/slice";
// import { useState } from "react";
// import { editValidationSchema } from "../../helpers/editValidationSchema";
// import { Icons } from "../Icons/Icons";

// const validationSchema = editValidationSchema;

// const EditTransactionForm = () => {
//   const dispatch = useDispatch();
//   const { transaction } = useSelector(selectCurrentTransaction);
//   const categories = useSelector(selectCategories);
//   const [startDate, setStartDate] = useState(
//     new Date(transaction.transactionDate)
//   );

//   const initialValues = {
//     amount: Math.abs(transaction.amount),
//     comment: transaction.comment,
//     categoryId: getTransactionsCategories(transaction.categoryId, categories),
//   };

//   const handleSubmit = (values, options) => {
//     dispatch(
//       updateTransaction({
//         transactionDate: startDate.toISOString(),
//         comment: values.comment,
//         amount: values.amount,
//         id: transaction.id,
//       })
//     );
//     options.resetForm();
//     dispatch(closeModal());
//   };

//   const handleClickButton = () => {
//     dispatch(closeModal());
//     // dispatch(setCurrentTransaction(null));
//   };

//   return (
//     <div>
//       <p> Edit transaction</p>
//       <p>
//         <span>Income</span>/ <span>Expense</span>
//       </p>

//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className={s.form}>
//           <label className={s.label}>
//             <Field
//               type="number"
//               name="amount"
//               min="1"
//               placeholder="0.00"
//               className={s.input}
//             />
//             <ErrorMessage
//               name="amount"
//               component="span"
//               className={s.message}
//             />
//           </label>
//           <div>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               calendarStartDay={1}
//               dateFormat="dd.MM.yyyy"
//               maxDate={new Date()}
//             />
//             <Icons name={"calendar"}></Icons>
//           </div>

//           <label className={s.label}>
//             <Field
//               type="text"
//               name="comment"
//               placeholder="comment"
//               className={s.input}
//             />
//             <ErrorMessage
//               name="comment"
//               component="span"
//               className={s.message}
//             />
//           </label>

//           <button type="submit" className={s.button}>
//             Save
//           </button>
//           <button
//             type="button"
//             className={s.button}
//             onClick={handleClickButton}
//           >
//             Cancel
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default EditTransactionForm;
