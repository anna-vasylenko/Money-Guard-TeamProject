import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import s from "./EditTransactionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionsCategories,
  updateTransaction,
} from "../../redux/transaction/operations";
import {
  selectCategories,
  selectCurrentTransaction,
} from "../../redux/transaction/selectors";
import { closeModal } from "../../redux/modal/slice";
import { setCurrentTransaction } from "../../redux/transaction/slice";
import { useState } from "react";
import { editValidationSchema } from "../../helpers/editValidationSchema";
import { Icons } from "../Icons/Icons";

// const initialValues = {
//   transactionDate: "",
//   type: "INCOME",
//   categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
//   comment: "",
//   amount: "",
// };

const validationSchema = editValidationSchema;

const EditTransactionForm = () => {
  const dispatch = useDispatch();
  const { transaction } = useSelector(selectCurrentTransaction);
  const categories = useSelector(selectCategories);
  const [startDate, setStartDate] = useState(transaction.transactionDate);

  const initialValues = {
    amount: Math.abs(transaction.amount),
    comment: transaction.comment,
    category: getTransactionsCategories(transaction.categoryId, categories),
  };

  const handleSubmit = (values, options) => {
    dispatch(
      updateTransaction({
        transactionDate: startDate.toISOString(),
        type: "INCOME",
        categoryId: transaction.categoryId,
        comment: values.comment,
        amount: values.amount,
      })
    );
    options.resetForm();
  };

  const handleClickButton = () => {
    dispatch(closeModal());
    dispatch(setCurrentTransaction(null));
  };

  return (
    <div>
      <p> Edit transaction</p>
      <p>
        <span>Income</span>/ <span>Expense</span>
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <Field type="text" name="amount" className={s.input} />
            <ErrorMessage
              name="amount"
              component="span"
              className={s.message}
            />
          </label>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              calendarStartDay={1}
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
            />
            <Icons name={"calendar"}></Icons>
          </div>

          <label className={s.label}>
            <Field type="text" name="comment" className={s.input} />
            <ErrorMessage
              name="comment"
              component="span"
              className={s.message}
            />
          </label>

          <button type="submit" className={s.button} onClick={handleSubmit}>
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
      </Formik>
    </div>
  );
};

export default EditTransactionForm;
