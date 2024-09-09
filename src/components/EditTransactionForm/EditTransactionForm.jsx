import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker CSS
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
import Loader from "../Loader/Loader";
import CustomIconForCalendar from "../AddTransactionForm/CustomIconForCalendar";

const EditTransactionForm = () => {
  const dispatch = useDispatch();
  const { transaction } = useSelector(selectCurrentTransaction);
  const categories = useSelector(selectCategories);
  const [startDate, setStartDate] = useState(
    new Date(transaction.transactionDate)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);

  const initialValues = {
    amount: Math.abs(transaction.amount),
    comment: transaction.comment,
  };

  const handleSubmit = async (values, options) => {
    const fetchData = {
      transactionDate: startDate.toISOString(),
      comment: values.comment,
      amount:
        parseFloat(values.amount) * (transaction.type === "EXPENSE" ? -1 : 1),
      type: transaction.type,
      categoryId: transaction.categoryId,
      id: transaction.id,
    };

    try {
      setIsLoading(true);
      setBackendError(null);
      await dispatch(updateTransaction(fetchData)).unwrap();
      options.resetForm();
      dispatch(closeModal());
    } catch (error) {
      console.error("Error updating transaction:", error);
      setBackendError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickButton = () => {
    dispatch(closeModal());
  };

  // Get the current category name for display
  const currentCategory = categories.find(
    (category) => category.id === transaction.categoryId
  )?.name;

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className={s.backdrop} onClick={handleClickButton}></div>
      <div className={s.modal}>
        <div className={s.header}>
          <h2 className={s.title}>Edit transaction</h2>
          <p>
            <span
              className={s.toggle}
              style={{
                color:
                  transaction.type === "INCOME" ? "var(--yellow)" : "#E0E0E0",
              }}
            >
              Income
            </span>
            /
            <span
              className={s.toggle}
              style={{
                color:
                  transaction.type === "EXPENSE" ? "var(--yellow)" : "#E0E0E0",
              }}
            >
              Expense
            </span>
          </p>
        </div>
        <p className={s.categoryLabel}>
          {transaction.type === "EXPENSE" ? currentCategory : ""}
        </p>
        {backendError && <div className={s.error}>{backendError}</div>}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editValidationSchema}
        >
          <Form className={s.form}>
            <div className={s.twoInput}>
              <div>
                <Field
                  type="number"
                  name="amount"
                  min="1"
                  placeholder="0.00"
                  className={s.numInput}
                />
                <ErrorMessage
                  name="amount"
                  component="span"
                  className={s.message}
                />
              </div>

              <DatePicker
                selected={startDate}
                customInput={<CustomIconForCalendar />}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                className={s.dateInput}
                name="transactionDate"
              />
            </div>

            <label className={s.label}>
              <Field
                type="text"
                name="comment"
                placeholder="Comment"
                className={s.textInput}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={s.message}
              />
            </label>
            <div className={s.buttonsWrapper}>
              <button type="submit" className={`${s.button} ${s.saveButton}`}>
                Save
              </button>
              <button
                type="button"
                className={`${s.button} ${s.cancelButton}`}
                onClick={handleClickButton}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default EditTransactionForm;

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import DatePicker from "react-datepicker";
// import s from "./EditTransactionForm.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { updateTransaction } from "../../redux/transaction/operations";
// import {
//   selectCategories,
//   selectCurrentTransaction,
// } from "../../redux/transaction/selectors";
// import { closeModal } from "../../redux/modal/slice";
// import { useState } from "react";
// import { editValidationSchema } from "../../helpers/editValidationSchema";
// import { Icons } from "../Icons/Icons";
// import Loader from "../Loader/Loader";

// const validationSchema = editValidationSchema;

// const EditTransactionForm = () => {
//   const dispatch = useDispatch();
//   const { transaction } = useSelector(selectCurrentTransaction);
//   const categories = useSelector(selectCategories);
//   const [startDate, setStartDate] = useState(
//     new Date(transaction.transactionDate)
//   );
//   const [isIncome, setIsIncome] = useState(transaction.type === "INCOME");
//   const [selectedCategoryId, setSelectedCategoryId] = useState(
//     transaction.categoryId
//   );
//   console.log(selectedCategoryId);

//   const initialValues = {
//     type: transaction.type,
//     amount: Math.abs(transaction.amount),
//     comment: transaction.comment,
//     categoryId: selectedCategoryId,
//   };
//   const handleSubmit = (values, options) => {
//     const fetchData = {
//       transactionDate: startDate.toISOString(),
//       comment: values.comment,
//       amount: isIncome ? parseFloat(values.amount) : -parseFloat(values.amount),
//       type: isIncome ? "INCOME" : "EXPENSE",
//       categoryId: isIncome ? "" : selectedCategoryId,
//       id: transaction.id,
//     };

//     dispatch(updateTransaction(fetchData))
//       .then(() => {
//         options.resetForm();
//         dispatch(closeModal());
//       })
//       .catch((error) => {
//         console.error("Error updating transaction:", error);
//       });
//   };

//   // const handleSubmit = async (values, options) => {
//   //   const fetchData = {
//   //     transactionDate: startDate.toISOString(),
//   //     comment: values.comment,
//   //     amount: isIncome ? parseFloat(values.amount) : -parseFloat(values.amount),
//   //     type: isIncome ? "INCOME" : "EXPENSE",
//   //     categoryId: isIncome ? "" : selectedCategoryId, // Ensure the categoryId is sent
//   //     id: transaction.id,
//   //   };

//   //   try {
//   //     await dispatch(updateTransaction(fetchData)).unwrap();
//   //     options.resetForm();
//   //     dispatch(closeModal());
//   //   } catch (error) {
//   //     console.error("Error updating transaction:", error);
//   //   }
//   // };

//   const handleClickButton = () => {
//     dispatch(closeModal());
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategoryId(event.target.value);
//   };

//   return (
//     <Loader /> && (
//       <>
//         <div className={s.backdrop} onClick={handleClickButton}></div>
//         <div className={s.modal}>
//           <div className={s.header}>
//             <p>Edit transaction</p>
//           </div>

//           <p>
//             <span
//               style={{ color: isIncome ? "#f39c12" : "#000" }}
//               onClick={() => setIsIncome(true)}
//             >
//               Income
//             </span>{" "}
//             /{" "}
//             <span
//               style={{ color: !isIncome ? "#f39c12" : "#000" }}
//               onClick={() => setIsIncome(false)}
//             >
//               Expense
//             </span>
//           </p>
//           {isIncome ? (
//             <Formik
//               initialValues={initialValues}
//               onSubmit={handleSubmit}
//               validationSchema={validationSchema}
//             >
//               <Form className={s.form}>
//                 <label className={s.label}>
//                   <Field
//                     type="number"
//                     name="amount"
//                     min="1"
//                     placeholder="0.00"
//                     className={s.input}
//                   />
//                   <ErrorMessage
//                     name="amount"
//                     component="span"
//                     className={s.message}
//                   />
//                 </label>
//                 <div className={s.datePicker}>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     calendarStartDay={1}
//                     dateFormat="dd.MM.yyyy"
//                     maxDate={new Date()}
//                     className={s.input}
//                   />
//                   <Icons name={"calendar"} />
//                 </div>

//                 <label className={s.label}>
//                   <Field
//                     type="text"
//                     name="comment"
//                     placeholder="Comment"
//                     className={s.input}
//                   />
//                   <ErrorMessage
//                     name="comment"
//                     component="span"
//                     className={s.message}
//                   />
//                 </label>

//                 <button type="submit" className={`${s.button} ${s.saveButton}`}>
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className={`${s.button} ${s.cancelButton}`}
//                   onClick={handleClickButton}
//                 >
//                   Cancel
//                 </button>
//               </Form>
//             </Formik>
//           ) : (
//             <Formik
//               initialValues={initialValues}
//               onSubmit={handleSubmit}
//               validationSchema={validationSchema}
//             >
//               <Form className={s.form}>
//                 <label className={s.label}>
//                   <Field
//                     as="select"
//                     name="categoryId"
//                     className={s.input}
//                     value={selectedCategoryId}
//                     onChange={handleCategoryChange}
//                   >
//                     <option value="" disabled>
//                       Select Category
//                     </option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="categoryId"
//                     component="span"
//                     className={s.message}
//                   />
//                 </label>

//                 <label className={s.label}>
//                   <Field
//                     type="number"
//                     name="amount"
//                     min="1"
//                     placeholder="0.00"
//                     className={s.input}
//                   />
//                   <ErrorMessage
//                     name="amount"
//                     component="span"
//                     className={s.message}
//                   />
//                 </label>
//                 <div className={s.datePicker}>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     calendarStartDay={1}
//                     dateFormat="dd.MM.yyyy"
//                     maxDate={new Date()}
//                     className={s.input}
//                   />
//                   <Icons name={"calendar"} />
//                 </div>

//                 <label className={s.label}>
//                   <Field
//                     type="text"
//                     name="comment"
//                     placeholder="Comment"
//                     className={s.input}
//                   />
//                   <ErrorMessage
//                     name="comment"
//                     component="span"
//                     className={s.message}
//                   />
//                 </label>

//                 <button type="submit" className={`${s.button} ${s.saveButton}`}>
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className={`${s.button} ${s.cancelButton}`}
//                   onClick={handleClickButton}
//                 >
//                   Cancel
//                 </button>
//               </Form>
//             </Formik>
//           )}
//         </div>
//       </>
//     )
//   );
// };

// export default EditTransactionForm;
