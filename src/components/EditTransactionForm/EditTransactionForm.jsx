import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../redux/transaction/operations";
import { useState } from "react";

import {
  selectCategories,
  selectCurrentTransaction,
} from "../../redux/transaction/selectors";
import { closeModal } from "../../redux/modal/slice";
import { editValidationSchema } from "../../helpers/editValidationSchema";
import Loader from "../Loader/Loader";
import CustomIconForCalendar from "../AddTransactionForm/CustomIconForCalendar";
import s from "./EditTransactionForm.module.css";

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
      setBackendError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickButton = () => {
    dispatch(closeModal());
  };

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
          <p className={s.toggleRow}>
            <span
              className={`${s.toggle} ${
                transaction.type === "INCOME"
                  ? s.activeToggle
                  : s.inactiveToggle
              }`}
            >
              Income
            </span>
            /
            <span
              className={`${s.toggle} ${
                transaction.type === "EXPENSE"
                  ? s.activeToggle
                  : s.inactiveToggle
              }`}
            >
              Expense
            </span>
          </p>
        </div>
        {transaction.type === "EXPENSE" && (
          <p
            className={currentCategory ? s.categoryLabel : s.categoryLabelEmpty}
          >
            {currentCategory}
          </p>
        )}
        {backendError && <div className={s.error}>{backendError}</div>}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editValidationSchema}
        >
          <Form className={s.form}>
            <div className={s.twoInput}>
              <div className={s.errorField}>
                <Field
                  type="number"
                  name="amount"
                  min="1"
                  step="0.01"
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
                name="transactionDate"
              />
            </div>
            <div className={s.errorField}>
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
            </div>
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
