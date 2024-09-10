import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { addTransaction } from "../../redux/transaction/operations";
import { selectCategories } from "../../redux/transaction/selectors";
import { closeModal } from "../../redux/modal/slice";
import { validationSchema } from "../../helpers/addTransactionSchema";
import { getTransactionCategoryID } from "../../helpers/transactionCategory";
import ToggleModal from "../ToggleModal/ToggleModal";
import CustomIconForCalendar from "./CustomIconForCalendar";

import s from "./AddTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

const AddTransactionForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isIncome, setIsIncome] = useState(false);
  const categoriesData = useSelector(selectCategories);
  const [selectCategory, setSelectCategory] = useState(null);
  const dispatch = useDispatch();

  const categories = categoriesData
    .filter((category) => category.type !== "INCOME")
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  const handleCategoryName = (selectedCategory) => {
    setSelectCategory(selectedCategory.value);
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  const initialValues = {
    transactionDate: new Date(),
    comment: "",
    amount: "",
    categoryId: "",
    type: isIncome ? "INCOME" : "EXPENSE",
  };

  const handleSubmit = (values, options) => {
    const newTransaction = {
      type: isIncome ? "INCOME" : "EXPENSE",
      transactionDate: startDate.toISOString(),
      comment: values.comment,
      amount: isIncome ? parseFloat(values.amount) : -parseFloat(values.amount),
      categoryId: getTransactionCategoryID(isIncome, selectCategory),
    };
    dispatch(addTransaction(newTransaction))
      .unwrap()
      .then(() => {
        options.resetForm();
        handleClickCancel();
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.title}>Add transaction</h2>
      <ToggleModal onChange={setIsIncome} defaultActive={false} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.formWrapper}>
          {!isIncome && (
            <Select
              name="select"
              className={s.selectInput}
              placeholder="Select a category"
              options={categories}
              required
              // autoFocus
              onChange={handleCategoryName}
              classNamePrefix="react-select"
            />
          )}
          <div className={s.amountDateInputWrapper}>
            <div>
              <Field
                className={s.amountInput}
                name="amount"
                type="number"
                placeholder="0.00"
                required
                autoComplete="off"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className={s.errorForAmount}
              />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              calendarStartDay={1}
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
              customInput={<CustomIconForCalendar />}
            />
          </div>
          <div>
            <Field
              as="textarea"
              rows="2"
              name="comment"
              placeholder="Comment"
              className={s.commentInput}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={s.errorForComment}
            />
          </div>
          <div className={s.buttonsWrapper}>
            <button className={s.btnAdd} type="submit">
              Add
            </button>
            <button
              className={s.btnCancel}
              type="button"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTransactionForm;
