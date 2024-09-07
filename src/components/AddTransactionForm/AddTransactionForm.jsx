import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./AddTransactionForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTransaction } from "../../redux/transaction/operations";
import CustomInputForCalendar from "./CustomInputForCalendar";

const AddTransactionForm = ({ closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addTransaction());
  // }, [dispatch]);

  const initialValues = {
    transactionDate: "",
    type: "INCOME",
    categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
    comment: "",
    amount: "",
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Transaction type is required"),
    comment: Yup.string().required("Comment is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const handleSubmit = (values, options) => {
    // const isoDate = startDate.toISOString();
    // console.log(isoDate);
    console.log(values);

    const newTransaction = {
      ...values,
      transactionDate: startDate.toISOString(),
    };
    dispatch(addTransaction(newTransaction));
    options.resetForm();
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <div className={s.wrapper}>
      <h2>Add transaction</h2>
      <span>Income</span>
      <span>Expense</span>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.wrapper}>
          <div>
            <Field
              className={s.input}
              name="amount"
              type="number"
              placeholder="0.00"
              required
              // autoComplete="off"
            />
            <ErrorMessage name="amount" component="span" />
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                customInput={<CustomInputForCalendar />}
              />
              <Field
                type="text"
                name="comment"
                placeholder="Comment"
                className={s.commentInput}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={s.error}
              />
            </div>
          </div>
          <button className={s.btn} type="submit">
            Add
          </button>
          <button className={s.btn} type="submit" onClick={handleClickCancel}>
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTransactionForm;
